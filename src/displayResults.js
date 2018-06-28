import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.png';
import ConfettiCanvas from 'react-confetti-canvas';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';
import first from './1.png';
import apiConfig from './apiKeys'

// Basic window for displaying app features
const loginStyles = {
    width: "90%",
    maxWidth: "400px",
    margin: "20px auto",
    borderRadius: "5px",
    padding: "20px",
    background: "white",
    color: "black",
  }

// configuring for API call

export class DisplayResults extends Component{ 
    constructor(props){
        super(props) 
        this.state= { 
            resultsRef: firebase.database().ref('Results'),
            inital: true,
            mostVoted:"hoch",
            mostVotedPhotoRef: null ,
            mostVotedRating: null, 
            key: apiConfig.key, // Google API call 

        }
    }
    
    // method to determine the top choice for restaurant
    getLargest() { 
        this.setState({ 
            inital:false
        })
        var largestLikeIndex= null
        var largerstLikeNum= 0 
        var root= firebase.database().ref(this.props.groupCode)
        var largest = [] 
        var snapshotResults = {}
        var keys = []
        root.child("Results").once('value',function(snapshot){
             snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
             console.log(snapshotResults)
             Object.keys(snapshotResults).map(i=> { 
                if(snapshotResults[i].right>largerstLikeNum){ 
                    largestLikeIndex= i
                    largerstLikeNum= snapshotResults[i].right
                }
             })
             var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[largestLikeIndex].photoRef==false){
            ref= snapshotResults[largestLikeIndex].photoRef
            // Currently only saves the first photo availalbe. 
          }
                largest= {
                    'name': largestLikeIndex, 
                    'rating':snapshotResults[largestLikeIndex].rating,
                    'photoReference': ref
                }
                console.log(largest.name)
                root.child("Most Voted").set(largest.name)   
                
         })     
    } 
    componentDidMount() { 
        console.log("HERE")
        let currentComponent = this;
        var root= firebase.database().ref(this.props.groupCode)
        var out = null
        root.child("Most Voted").once("value",function(snapshot){
            let mostVoted =  snapshot.val()
            console.log(mostVoted)
            currentComponent.setState({
                mostVoted:mostVoted
            })
        if(currentComponent.state.mostVoted!= null) { 
        root.child("Results").child(currentComponent.state.mostVoted).once("value", function(snapshot){
            let mostVotedPhotoRef = snapshot.val().photoRef
            let mostVotedRating = snapshot.val().rating 
            currentComponent.setState({
                mostVotedRating:mostVotedRating,
                mostVotedPhotoRef:mostVotedPhotoRef
            })
        })}

            // console.log(this.state.mostVoted)
  })
    }
    // displaying results screen with logo, confetti, and cards with top results
    render(){ 
        if(this.state.inital){
            this.getLargest()
    
        }
        return (
            <div className="App-background">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {/* Adding confetti to the results page */}
            <ConfettiCanvas colors={[['#38abb4', '#3b5998'],['#7FB3D5', '#76D7C4'],['#d64717', '#e3a75b']]} duration={0.006} paperCount={100} ribbonCount={11}/>
            </div>
                <img src={logo} className="App-logo2" alt="logo" />
                <div style={loginStyles} >
                    <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                        <h3> Results </h3>
                        <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                        {/* Displaying top results as cards */}
                        <Card>
                            <CardBody>
                            <CardTitle style={{color: "#38abb4"}}> Group Code: {this.props.groupCode} </CardTitle>

                                <img src={first} className="firstplace" />
                            <CardTitle>{this.state.mostVoted}</CardTitle>
                            <CardText> Rating: {this.state.mostVotedRating} </CardText> 

                            <CardImg top width="80%" crossOrigin="Anonymous" src= {'http://localhost:8080/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + this.state.mostVotedPhotoRef+ "&key="+this.state.key } alt="Card image cap" />
                            </CardBody>
                        </Card>
                    </div> 
                </div> 
            </div>  
        ) 
    }  
}
export default DisplayResults
