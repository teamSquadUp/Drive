// Called by SwiperNoSwiping and Generates Cards with the results passed down to it through 
// props named results
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import Draggable from 'react-draggable'; // The default
import './css/Cards.css'
import firebase from 'firebase'
import apiConfig from './apiKeys'
import logout2 from './images/logout2.png';
import hoch from "./images/hoch.jpg"
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';

const items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
  ];

  
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
            IMG: null,
            Type: null
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
        var root= firebase.database().ref(this.props.groupCode+"/users/"+this.props.userInGroup+"/results")
        root.on("value",function(snapshot){
        })
        var results = [] 
        root.on('value',function(snapshot){
            if(snapshot.val()!=null){
    
             Object.keys(snapshot.val()).map(i=> {
              var ref= "https://www.hmc.edu/about-hmc/wp-content/uploads/sites/2/2014/08/H-S-diners-web1.jpg"
              if(!snapshot.val()[i].photoRef===false){
                ref= snapshot.val()[i].photoRef
                // Currently only saves the first photo availalbe. 
              }
                    results= results.concat({
                        'name': snapshot.val()[i].name,
                        'rating':snapshot.val()[i].rating,
                        'photoReference': ref,
                        "categories":snapshot.val()[i].categories
                    })     
             })
             currentComponent.setState({
                results: results
            })
        }
            
            
            })
            // if(this.state.results==null){ 
            //     this.setData({
            //         results: this.props.results
            //     })
            // }
          }

    completeSwipe(){
        // registers the direction in which the swipe took place. 
        // Updates the values in firebase (assuming firebase has a list of results with list of results)
        
        var x = this.state.deltaPosition.x
        var left = this.state.countLeft
        if(Math.abs(this.state.deltaPosition.x)>100 ){ // Checks if swipe delta > 100
            var restaurantName= this.replaceAll(".", " ",this.state.Header)
            var restaurantRating = this.state.Rating
            var restaurantImage = this.state.IMG
            var restaurantType = this.state.Type
            const ResultsRef = firebase.database().ref(this.props.groupCode).child('Results')
            //check if restaurant exists
            ResultsRef.once("value",function(snapshot){
                if(!snapshot.hasChild(restaurantName)&&x>0){
                    ResultsRef.child(restaurantName).set({
                        rating: restaurantRating,
                        left:0,
                        right:1,
                        photoRef: restaurantImage,
                       categories: restaurantType
                    })
                }else if(!snapshot.hasChild(restaurantName)&& x<0)
                 {ResultsRef.child(restaurantName).set({
                    rating: restaurantRating,
                    left:1,
                    right:0,
                    photoRef: restaurantImage,
                    categories: restaurantType
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
        }
    }

    replaceAll (search, replacement, s) {
        var target = s;
        return target.split(search).join(replacement);
    }

    setData(){ 
       
        // Updating the information on the card with the results on the next list of results 
        this.setState({ 
            Header: this.state.results[this.state.resultsCount].name,
            Rating: this.state.results[this.state.resultsCount].rating,
            IMG: this.state.results[this.state.resultsCount].photoReference,
            Type: this.state.results[this.state.resultsCount].categories,
            currentResult: this.state.resultsCount
        })
    }

render() { 
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
    const deltaPosition = this.state.deltaPosition;
    return (
    // Loads the elements of a single card at a time. 
    <div className= "BOX">
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
          <CardImg top width="100%" crossOrigin="Anonymous" src= {this.state.IMG} alt={hoch} />
          <CardBody>
          <CardTitle>{this.state.Header}</CardTitle>
          <CardSubtitle>Rating: {this.state.Rating}</CardSubtitle>
          <CardText>Type: {this.state.Type}</CardText>
          {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>          */}
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











