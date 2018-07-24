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
var items = []

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
            IMG: hoch,
            pictures:["","",""], 
            Type: null, 
            AllData: null
        });
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

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
        this.completeSwipe()
        this.setState({
        deltaPosition: {
            x: 0, y: 0
        },
      })}

      componentDidMount() {
        let currentComponent = this
        console.log(currentComponent.props.results)
        currentComponent.setState({
        results: currentComponent.props.results
        })
        }   
         
        

    completeSwipe(){
        // registers the direction in which the swipe took place. 
        // Updates the values in firebase (assuming firebase has a list of results with list of results)
        
        var x = this.state.deltaPosition.x
        //var left = this.state.countLeft
        if(Math.abs(this.state.deltaPosition.x)>100 ){ // Checks if swipe delta > 100
            var restaurantName= this.state.Header
            var restaurantRating = this.state.Rating
            var restaurantImage = this.state.IMG
            var restaurantType = this.state.Type
            var AllD= this.state.AllData
            const ResultsRef = firebase.database().ref(this.props.groupCode).child('Results')
            //check if restaurant exists
            ResultsRef.once("value",function(snapshot){
                if(!snapshot.hasChild(restaurantName)&&x>0){
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
                }else if(!snapshot.hasChild(restaurantName)&& x<0)
                 {ResultsRef.child(restaurantName).set({
                    rating: restaurantRating,
                    left:1,
                    right:0,
                    photoRef: restaurantImage,
                    categories: restaurantType,
                    allData: AllD
                })
            }else if(snapshot.hasChild(restaurantName)&& x>0)
            {            
                ResultsRef.child(restaurantName).once("value", function(snapshot){
                var count=snapshot.val().right
                const updates = {}
                updates['right']=count+1
                ResultsRef.child(restaurantName).update(updates)
                }
            )}else if(snapshot.hasChild(restaurantName)&& x<0)
            {
                ResultsRef.child(restaurantName).once("value",function(snapshot){
                var count=snapshot.val().left
                const updates = {}    
                updates['left']= count + 1
                ResultsRef.child(restaurantName).update(updates)})

            }

        })
            // Hide the card
            this.setState({
                visibility: "hidden",
            })
            // Reposition the cards and reset the deltas
            if(this.state.currentResult<this.state.results.length-1){
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
                this.props.DisplayResults()
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

    setData(){ 
        const currentComponent= this
        console.log(this.state.results[this.state.resultsCount].categories)
        var toString= this.typeToString(this.state.results[this.state.resultsCount].categories)

        if(!this.state.results[this.state.resultsCount].photos){ 
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

render() { 
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
    }
    else{ 
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
    //const deltaPosition = this.state.deltaPosition;
    return (
    // Loads the elements of a single card at a time. 
    <div className= "BOX">
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
           </CardBody>
          </Card>
          </div>
        </div>
      </Draggable>
    </div>
    )
}


}
export default Cards











