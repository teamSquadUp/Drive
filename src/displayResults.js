import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './images/logo.png';
import ConfettiCanvas from 'react-confetti-canvas';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import first from './images/1.png';
import apiConfig from './apiKeys'
import logout from './images/logout.png';
import hoch from "./images/hoch.jpg"
import grubhub from "./images/grubhub.png";
import opentable from "./images/opentable.png";
import googlemaps from "./images/googlemaps.png";
import dining from "./images/dining.svg";
import call from "./images/call.png";
import { Container, Row, Col } from 'reactstrap';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

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
            mostVotedType: null,
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
        var snapshotResults = {}
        root.child("Results").once('value',function(snapshot){
             snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
             Object.keys(snapshotResults).forEach(i=> { 
                if(snapshotResults[i].right*(snapshotResults[i].right+snapshotResults[i].left)>largerstLikeNum){ 
                    largestLikeIndex= i
                    largerstLikeNum= snapshotResults[i].right*(snapshotResults[i].right+snapshotResults[i].left)
                }
             })
             var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[largestLikeIndex].photoRef===false){
            ref= snapshotResults[largestLikeIndex].photoRef
            // Currently only saves the first photo availalbe. 
          }
          var largest = [] 

                largest= {
                    'name': largestLikeIndex, 
                    'rating':snapshotResults[largestLikeIndex].rating,
                    'photoReference': ref
                }
                root.child("MostVoted").set({
                    'name': largestLikeIndex, 
                    'rating':snapshotResults[largestLikeIndex].rating,
                    'photoReference': ref,
                "categories":snapshotResults[largestLikeIndex].categories})             
         })     
    } 
    componentDidMount() { 
        let currentComponent = this;
        var root= firebase.database().ref(this.props.groupCode)
        root.child("MostVoted").on("value",function(snapshot){
            let mostVoted =  snapshot.val()
            currentComponent.setState({
                mostVoted:mostVoted.name,
                mostVotedPhotoRef:mostVoted.photoReference,
                mostVotedType:mostVoted.categories,
                mostVotedRating:mostVoted.rating
            })
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
                            <CardTitle style={{color: "#406fa5"}}> Group Code: {this.props.groupCode} </CardTitle>

                                <img src={first} alt = "" className="firstplace" />
                            <CardTitle>{this.state.mostVoted}</CardTitle>
                            <CardText> Rating: {this.state.mostVotedRating} </CardText> 
                            <CardText> Type: {this.state.mostVotedType} </CardText> 

                            <CardImg top width="80%" style={{maxHeight:"250px", height:"50%"}} crossOrigin="Anonymous" src= {this.state.mostVotedPhotoRef} alt={hoch} />
                            <Row>
                                <br></br>
                            </Row>
                            <Row>
                            <Col><img src={googlemaps} style={{width:"98%",maxWidth:"45px"}}/> </Col>
                            <Col><img src={opentable} style={{width:"100%",maxWidth:"50px"}}/></Col>
                            <Col><img src={call} style={{width:"100%",maxWidth:"50px"}}/></Col>
                            <Col><img src={grubhub} style={{width:"98%",maxWidth:"45px"}}/></Col>
                            </Row>
                            </CardBody>
                        </Card>
                        <Card style={{borderColor:"white"}} >
                        <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout} alt=""/> Logout </button> 

                        </Card>
                    </div> 
                </div> 
            </div>  
        ) 
    }  
}
export default DisplayResults
