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

export class Cards extends Component {
    constructor(props){
        super(props)
        this.state=({
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
        })
        console.log(this.props)
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
            console.log(snapshot.val())
        })
        var results = [] 
        root.on('value',function(snapshot){
            if(snapshot.val()!=null){
                console.log("snapshot is not null!!!",snapshot.val())
    
             Object.keys(snapshot.val()).map(i=> {
              var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
              console.log("i is??", i)
              if(!snapshot.val()[i].photoRef===false){
                ref= snapshot.val()[i].photoRef
                // Currently only saves the first photo availalbe. 
              }
              console.log("bababa name is ", snapshot.val()[i].name,)
                    results= results.concat({
                        'name': snapshot.val()[i].name,
                        'rating':snapshot.val()[i].rating,
                        'photoReference': ref
                    })     
                    console.log("results areaaa", results)
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
            const ResultsRef = firebase.database().ref(this.props.groupCode).child('Results')
            //check if restaurant exists
            ResultsRef.once("value",function(snapshot){
                if(!snapshot.hasChild(restaurantName)&&x>0){
                    ResultsRef.child(restaurantName).set({
                        rating: restaurantRating,
                        left:0,
                        right:1,
                        photoRef: restaurantImage
                    })
                }else if(!snapshot.hasChild(restaurantName)&& x<0)
                 {ResultsRef.child(restaurantName).set({
                    rating: restaurantRating,
                    left:1,
                    right:0,
                    photoRef: restaurantImage
                })
            }else if(snapshot.hasChild(restaurantName)&& x>0)
            {            
                console.log("hhhheeeeerree")
                ResultsRef.child(restaurantName).once("value", function(snapshot){
                var count=snapshot.val().right
                console.log(count)
                const updates = {}
                updates['right']=count+1
                ResultsRef.child(restaurantName).update(updates)
                }
            )}else if(snapshot.hasChild(restaurantName)&& x<0)
            {
                ResultsRef.child(restaurantName).once("value",function(snapshot){
                console.log(snapshot.val())
                var count=snapshot.val().left
                const updates = {}    
                updates['left']= count + 1
                ResultsRef.child(restaurantName).update(updates)})

            }

        //     .then(
        //         function(swipeResponce){
        //             console.log(x)
            
        //     if(x>0){ // Swipe Right
        //         // this.setState({
        //         //     countRight: this.state.countRight+1 
        //         // })
        //     ResultsRef.child(restaurantName).once("value", function(snapshot){
        //         console.log(snapshot.val())
        //         var count=snapshot.val().right
        //         console.log(count)
        //         var updates = {}
        //         updates['right']=count+1
        //         ResultsRef.update(updates)
        //         }
        //     )
        // }
        //     else {  // Swipe Left
        //         console.log("left is", left)
        //         // this.setState({
        //         //     countLeft: left+1 
        //         // })
        //         ResultsRef.child(restaurantName).once("value",function(snapshot){
        //             console.log(snapshot.val())
        //             var count=snapshot.val().left
        //             const updates = {}    
        //             updates['left']= count + 1
        //             ResultsRef.update(updates)})
        //     }
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
            console.log("MADE IT")
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
        console.log("arera results ", this.state.results)
        this.setState({ 
            Header: this.state.results[this.state.resultsCount].name,
            Rating: this.state.results[this.state.resultsCount].rating,
            IMG: this.state.results[this.state.resultsCount].photoReference,
            currentResult: this.state.resultsCount
        })
    }

render() { 
    console.log("results are",this.state.results)
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
      X: {this.state.deltaPosition.x},  
      Y: {this.state.deltaPosition.y},  
      LeftCount: {this.state.countLeft},  
      RightCount: {this.state.countRight}
      <button style={{width: "8%", backgroundColor:"white", borderColor:"white", marginTop: "0%", marginBottom: "0%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout2}/> </button>
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 100, y: 100}}
        position={this.state.cardPosition}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleD.bind(this)}
        onStop={this.handleSTOP.bind(this)}>
        <div className="BOX2">
          <div className="handle">
          <Card className={"Card-"+this.state.visibility}>
          <CardImg top width="100%" crossOrigin="Anonymous" src= {this.state.IMG} alt="Card image cap" />
          <CardBody>
          <CardTitle>{this.state.Header}</CardTitle>
          <CardSubtitle>Rating: {this.state.Rating}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>          </CardBody>
          </Card>
          </div>
        </div>
      </Draggable>
    </div>
    )
}


}
export default Cards











