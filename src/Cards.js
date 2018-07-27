// Called by SwiperNoSwiping and Generates Cards with the results passed down to it through 
// props named results
import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import Draggable from 'react-draggable'; // The default
import './css/Cards.css'
import firebase from 'firebase'
import apiConfig from './apiKeys'
import hoch from './images/hoch.jpg'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {MailFolderListItems, OtherMailFolderListItems } from './tileData';
import squaduplogo from './images/squadlogowhite.png';
import ReplyIcon from '@material-ui/icons/Reply';
import grubhub from "./images/grubhub.png";
import googlemaps from "./images/googlemaps.png";
import call from "./images/call.png";
import { Row, Col } from 'reactstrap';
import { UncontrolledCollapse, Button} from 'reactstrap';
import yelp from "./images/yelp.png"

var items = []


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export class Cards extends Component {
    constructor(props){
        super(props);
        this.state=({
            activeIndex: 0,
            results: null ,
            key: apiConfig.key,
            countRight: 0,
            countLeft: 0 ,
            deltaPosition: {
                x: 0, y: 0
            },
            visibility: "hidden",
            resultsCount: 0,
            currentResult:0,
            cardPosition: null,
            inital: true,
            Header: null,
            Rating: null, 
            resultNames:[],
            IMG: hoch,
            pictures:["","",""], 
            Type: null, 
            AllData: null,
            otherCards: false, 
        });
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
  
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    onExiting() {
        this.animating = true;
      }
    
    onExited() {
        this.animating = false;
    }
    
    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    handleD(e, ui) {
        // Handles the drag and collects the deltas of the cards being dragged around
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
       
      }

      handleSTOP(){ 
        // Handles the release of the card after being dragged. 
        this.completeSwipe(false)
        this.setState({
        deltaPosition: {
            x: 0, y: 0
        },
      })}

      componentDidMount() {
        if(this.state.otherCards==false){
        let currentComponent = this
        console.log(currentComponent.props.results)
        currentComponent.setState({
        results: currentComponent.props.results
        })
        //setting the result's name in a list
        var resultName=[]
        for(var k in this.state.results) resultName.push(this.state.results[k].name)
        console.log("listing restaurant name",resultName)
        currentComponent.setState({
            resultNames:resultName
        })}
    }   
         
        

    completeSwipe(veto){
        // registers the direction in which the swipe took place. 
        // Updates the values in firebase (assuming firebase has a list of results with list of results)
        console.log("completing swipe")
        var x = this.state.deltaPosition.x
        //var left = this.state.countLeft
        if(Math.abs(this.state.deltaPosition.x)>100 || veto){ // Checks if swipe delta > 100
            var restaurantName= this.state.Header
            var restaurantRating = this.state.Rating
            var restaurantImage = this.state.IMG
            var restaurantType = this.state.Type
            var AllD= this.state.AllData
            const ResultsRef = firebase.database().ref(this.props.groupCode).child('Results')
            //check if restaurant exists
            ResultsRef.once("value",function(snapshot){
                if(!snapshot.hasChild(restaurantName)&&x>0 && !veto){
                    console.log({
                        rating: restaurantRating,
                        left:0,
                        right:1,
                        photoRef: restaurantImage,
                       categories: restaurantType,
                       AllData: AllD
                    })
                    ResultsRef.child(restaurantName).set({
                        rating: restaurantRating,
                        left:0,
                        right:1,
                        photoRef: restaurantImage,
                       categories: restaurantType,
                       allData: AllD
                    })
                }else if(!snapshot.hasChild(restaurantName)&& x<0 || veto)
                 {  console.log("vetoed")
                     var left =1 
                    if(veto){ 
                        left=3
                    }
                     ResultsRef.child(restaurantName).set({
                    rating: restaurantRating,
                    left:left,
                    right:0,
                    photoRef: restaurantImage,
                    categories: restaurantType,
                    allData: AllD
                })
            }else if(snapshot.hasChild(restaurantName)&& x>0 && !veto)
            {            
                ResultsRef.child(restaurantName).once("value", function(snapshot){
                var count=snapshot.val().right
                const updates = {}
                updates['right']=count+1
                ResultsRef.child(restaurantName).update(updates)
                }
            )}else if(snapshot.hasChild(restaurantName)&& x<0 || veto)
            {
                console.log("vetoed")
                var left =1 
                if(veto){ 
                    left=3
                }
                ResultsRef.child(restaurantName).once("value",function(snapshot){
                var count=snapshot.val().left
                const updates = {}    
                updates['left']= count + left
                ResultsRef.child(restaurantName).update(updates)})

            }

        })
            // Hide the card
            this.setState({
                visibility: "hidden",
            })
            // Reposition the cards and reset the deltas
            if(this.state.currentResult<this.state.results.length-1){
                console.log("processing")
                this.setState({
                    resultsCount: this.state.resultsCount+1 ,
                    deltaPosition: {
                        x: 0, y: 0
                    },
                    cardPosition: {x: 0, y: 0}
                })
                this.setData() // Updating card info
                this.setState({
                    cardPosition: null,
                    visibility: "visible",
                    currentResult: this.state.resultsCount,       
                })
            }
            else {
                // LOAD RESULTS- all swipes are completed and the results page is ready to be loaded. 
                this.continueCards()
            }


        }
        else {
            // If the swipe position deltas is not greater than 100px than the position is reset
            this.setState({
                cardPosition: {x: 0, y: 0}
            })
            this.setState({
                cardPosition: null
            })
        }
    }

    replaceAll (search, replacement, s) {
        var target = s;
        return target.split(search).join(replacement);
    }

    typeToString(types){ 
        var toString= ""
         if(types){
            types.map((category)=> 
            toString= toString+ " "+category.title
        )}
        return toString
    }
    continueCards(){
        const currentComponent= this
        if(this.state.otherCards===false){
            if(!window.confirm("See other member's cards?")){
            this.props.DisplayResults()
            }else{
            this.setState({otherCards:true})
            let currentComponent = this
            console.log(currentComponent.props.results)
            var generatedResult=[]
            var otherResults = firebase.database().ref(this.props.groupCode).child('Results')
            otherResults.once("value",function(snapshot){
                var results = Object.assign(snapshot.val(),results)
                Object.keys(results).forEach(i=>{
                    console.log("result restaurant name is ",i,"; right is ",results[i].right,"; left is ",results[i].left,)
                    if(results[i].right-results[i].left>0){

                        console.log(i,!(currentComponent.state.resultNames.includes(i)))
                        if(!(currentComponent.state.resultNames.includes(i))){
                            console.log(i)
                            generatedResult.push(results[i].allData)}
                    }
                })
            })
            console.log("generated results",generatedResult)
            currentComponent.setState({
                results:generatedResult,
                resultsCount: -1,
                currentResult:-1, 
            })
            if(generatedResult.length==0){ 
                currentComponent.completeSwipe()
                alert("No restaurant from other member!!")
                this.props.DisplayResults()
            }
            if(!currentComponent.state.results){
            this.setData()
            this.setState({
                inital: false,
                cardPosition: {x: 0, y: 0}
            })
        }
    }
    }else{
        this.props.DisplayResults()
    }
}

    setData(){ 
        console.log("setting data")
        const currentComponent= this
        console.log(currentComponent.state.results[currentComponent.state.resultsCount])
        var toString= this.typeToString(this.state.results[this.state.resultsCount].categories)

        if(!this.state.results[this.state.resultsCount].photos && this.state.otherCards==false){ 
            firebase.database().ref(this.props.groupCode+"/users/"+this.props.userInGroup+"/results").on("value",function(snapshot){
            console.log(snapshot.val())
            currentComponent.setState({ 
                results:snapshot.val()
            })
        })
        }
        console.log("results are,", this.state.results)
        // Updating the information on the card with the results on the next list of results 
        this.setState({ 
            Header: this.state.results[this.state.resultsCount].name,
            Rating: this.state.results[this.state.resultsCount].rating,
            IMG: this.state.results[this.state.resultsCount].image_url,
            Type: toString,
            pictures: this.state.results[this.state.resultsCount].photos,
            currentResult: this.state.resultsCount,
            AllData: this.state.results[this.state.resultsCount]
        })
    }
    componentWillMount(){ 
        if(!this.state.results){
            console.log("results updating", this.props.results)
            this.setState({ 
                results: this.props.results
            })
            console.log("results updated", this.state.results)
        }
    }
    handleVeto(bool){ 
        this.completeSwipe(bool)
        if(!bool){ 
            this.handleVeto(!bool)
        }
    }
render() { 
    const currentComponent= this
    const  classes  = this.props;

        // side panel from tileData.js
        const sideList = (
            <div className={classes.list}>
              <List>
              <MailFolderListItems groupCode={this.props.groupCode} userInGroup={this.props.userInGroup} allUsers = {this.props.allUsers}/>
              </List>
              <Divider />
              <List>
                  <OtherMailFolderListItems logout={this.props.logout}/>
                  </List>
            </div>
          );
      
          const fullList = (
            <div className={classes.fullList}>
              <List>
                  <MailFolderListItems groupCode={this.props.groupCode} userInGroup={this.props.userInGroup} allUsers = {this.props.allUsers}/>
            </List>
              <Divider />
              <List>
                  <OtherMailFolderListItems logout={this.props.logout}/>
                  </List>
            </div>
          );

    
    const Loading = require('react-loading-animation');
    if(this.state.pictures){
        items = [
        {
          src: this.state.pictures[0],
          altText: '',
          caption: ''
        },
        {
          src: this.state.pictures[1],
          altText: '',
          caption: ''
        },
        {
          src: this.state.pictures[2],
          altText: '',
          caption: ''
        }
      ];
        } else{ 
            items = [
                {
                    src: this.state.IMG,
                    altText: '',
                    caption: ''
                }]
            } 


    const { activeIndex } = this.state;
    const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
      });
      
    if(this.state.results!=null){

    if(this.state.results.length!==0 && this.state.visibility==="hidden")
    { // If the results are finally generated by API, start displaying the cards
        this.setState({
            visibility: "visible"
        })
        if(this.state.inital){
            // If this is the first call for the cards, load the data into them.
            this.setData() 
            this.setState({
                inital: false
            })
        }
    }
}
    var coord= []
    var yelpUrl= ""
    var phoneNO= 0
    if(this.state.results[this.state.resultsCount]){ 
        if(this.state.results[this.state.resultsCount]["coordinates"]){
             coord= this.state.results[this.state.resultsCount]["coordinates"]
            }
            else{
            coord= { 
                latitide: '0' ,
                longitude: '0'
            }} 
             yelpUrl= this.state.results[this.state.resultsCount]["url"]
             phoneNO= this.state.results[this.state.resultsCount]["phone"]
    }
    //const deltaPosition = this.state.deltaPosition;
    return (
        // displaying page with app bar, preference selection, and side panel
        <div>
        <AppBar position="static" className="tab" style={{maxHeight:"80px"}}>
            <Toolbar className="tab">
            <IconButton
                aria-haspopup="true"
                onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", margin:"5%", float:"center"}} />
            </Toolbar>
        </AppBar>
    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        <div
        tabIndex={0}
        role="button"
        onClick={this.toggleDrawer('left', false)}
        onKeyDown={this.toggleDrawer('left', false)}
        >
        {sideList}
      </div>
      </Drawer>
    <div className= "BOX" id="scroll-container">
      <Loading isLoading = {this.state.visibility === "hidden"}/>

      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={this.state.cardPosition}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleD.bind(this)}
        onStop={this.handleSTOP.bind(this)}>
        <div className="BOX2">
          <div className="handle">
          <Card className={"Card-"+this.state.visibility}>
          <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
          {/* <CardImg top width="100%" crossOrigin="Anonymous" src= {this.state.IMG} alt={hoch} /> */}
          <CardBody>
          <CardTitle>{this.state.Header}</CardTitle>
          <CardSubtitle>Rating: {this.state.Rating}</CardSubtitle>
          <CardText>Type: {this.state.Type}</CardText>
          {this.state.results[this.state.resultsCount]?
          <div>
          <Button style={{width: "50%", backgroundColor:"white", borderColor:"white", margin:"5%", color:"#0077B5", marginTop: "2%"}} id="toggler">
                            More Info    v
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                                <Col>
                                {
                                    <a href={'https://www.google.com/maps/search/?api=1&query='+coord["latitude"]+"%2C+"+coord["longitude"] } target="_blank">
                                <img alt="" src={googlemaps} style={{width:"98%",maxWidth:"49px"}}/> 
                                </a>
                                }
                                </Col>
                                
                                <Col>
                                    {
                                    <a href= {yelpUrl} target="_blank"> 
                                    <img alt="" src={yelp} style={{width:"98%",maxWidth:"49px"}}/>
                                    </a> 
                                    }
                                </Col>
                                <Col>
                                {<a href= {"tel:"+phoneNO} >
                                <img alt="" src={call} style={{width:"100%",maxWidth:"50px"}}/>
                                </a>}
                                </Col>
                                <Col>{
                                <a href={'https://www.grubhub.com/search?latitude='+coord["latitude"]+"&longitude="+coord["longitude"]} target="_blank">
                                <img alt="" src={grubhub} style={{width:"98%",maxWidth:"45px"}}/>
                                </a>}
                                </Col>
                            </UncontrolledCollapse></div> : <div/>
          }
           </CardBody>
          </Card>
          </div>
        </div>
      </Draggable>
      <button style={{width: "50%", maxWidth:"100px", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop:"5%"}} className="btn btn-primary"onClick={()=>currentComponent.handleVeto(false)}>Veto</button>
    </div>
    </div>
    )
}


}

Cards.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Cards)











