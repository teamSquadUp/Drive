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
import call from "./images/call.png";
import { Row, Col } from 'reactstrap';
import DoughnutExample from './doughnut'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { MailFolderListItems, OtherMailFolderListItems } from './tileData';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import yelp from "./images/yelp.png"
import squaduplogo from './images/squadlogowhite.png';


// Basic window for displaying app features
const loginStyles = {
    width: "90%",
    maxWidth: "500px",
    margin: "20px auto",
    borderRadius: "5px",
    padding: "20px",
    background: "white",
    color: "black",
  }

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
            left: false,
            key: apiConfig.key, // Google API call
            prefStats:{} ,
            MostVotedDict: []
        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
    
    // method to determine the top choice for restaurant
    getLargest() {
        const currentComponent= this
        const request = require('request');
        request({
          url: 'https://squad-up-gmaps.herokuapp.com/calcResults/?groupCode='+this.props.groupCode+"&username="+this.props.userInGroup
          }, function(err, res, body) {
          if(!err){ 
            var largest= JSON.parse(body)["Most Voted"]
            console.log(largest)
            currentComponent.setState({ 
                MostVotedDict: largest
            })
          }
        }) 
    } 

    typeToString(types){ 
        var toString= ""
        if(types){

        types.map((category)=> 
         toString= toString+ " "+category.title
        )}
        return toString
    }
    componentDidMount() { 
        let currentComponent = this;
        var root= firebase.database().ref(this.props.groupCode)
        root.child("MostVoted").on("value",function(snapshot){
            let mostVoted =  snapshot.val()
            console.log(snapshot.val())
            if(mostVoted){
            currentComponent.setState({
                MostVotedDict:mostVoted
                // mostVoted:mostVoted.name,
                // mostVotedPhotoRef:mostVoted.photoReference,
                // mostVotedType:mostVoted.categories,
                // mostVotedRating:mostVoted.rating
            })}
  })
  root.child("Preferences").on("value",function(snapshot){
      console.log(snapshot.val())
      currentComponent.setState({
          prefStats:snapshot.val()
      })
  })
  console.log("pref stats", this.state.prefStats)
    }
    // displaying results screen with logo, confetti, and cards with top results
    render(){ 
        const { classes } = this.props;
        const { open } = this.state;

        if(this.state.inital){
            this.getLargest()
    
        }
        if(this.state.MostVotedDict["coordinates"]){
        var coord= this.state.MostVotedDict["coordinates"]
        }
        else{
        coord= { 
            latitide: '0' ,
            longitude: '0'
        }} 
        var yelpUrl= this.state.MostVotedDict["url"]
        var phoneNO= this.state.MostVotedDict["phone"]
    
        //var longitude= currentComponent.state.MostVotedDict["coordinates"]["longitude"].toString()
        return (
            <div>
            <AppBar position="static" className="tab" style={{maxHeight:"75px"}}>
          <Toolbar className="tab">
          <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
            {/*<Typography variant="title" color="inherit">
              SquadUp
  </Typography>*/}
          </Toolbar>
        </AppBar>
            <div className="App-background">
                {/*<img src={logo} className="App-logo2" alt="logo" />*/}
                <div style={loginStyles} >
                    <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                        <h3> Results </h3>
                        <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                        {/* Displaying top results as cards */}
                        <Card>
                            <CardBody>
                            <CardTitle style={{color: "#406fa5"}}> Group Code: {this.props.groupCode} </CardTitle>

                                <img src={first} alt = "" className="firstplace" />
                            <CardTitle>{this.state.MostVotedDict["name"]}</CardTitle>
                            <CardText> Rating: {this.state.MostVotedDict["rating"]} </CardText> 
                            <CardText> Type: {this.typeToString(this.state.MostVotedDict["categories"])} </CardText> 

                            <CardImg top width="80%" style={{maxHeight:"250px", height:"50%"}} crossOrigin="Anonymous" src= {this.state.MostVotedDict["image_url"]} alt={hoch} />
                            <Row>
                                <br></br>
                            </Row>
                            <Row>
                            <Col>
                            {
                                <a href={'https://www.google.com/maps/search/?api=1&query='+coord["latitude"]+"%2C+"+coord["longitude"]}>
                               <img alt="" src={googlemaps} style={{width:"98%",maxWidth:"49px"}}/> 
                               </a>
                            }
                            </Col>
                            
                            <Col>
                                {
                                <a href= {yelpUrl}> 
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
                            <a href={'https://www.grubhub.com/search?latitude='+coord["latitude"]+"&longitude="+coord["longitude"]}>
                            <img alt="" src={grubhub} style={{width:"98%",maxWidth:"45px"}}/>
                            </a>}
                            </Col>
                            </Row>
                            </CardBody>
                        </Card>
                        <Card style={{borderColor:"white"}} >
                        <hr />
                        <CardTitle style={{color: "#406fa5"}}> Based on the Preferences of </CardTitle>
                        <CardBody style={{width:"80%", maxWidth:"300px", alignContent:"center", textAlign: "center", alignSelf: "center"}} className="pt-callout pt-icon-info-sign">
                                    <DoughnutExample prefStats={this.state.prefStats} />
                                </CardBody>
                        </Card>
                        <Card style={{borderColor:"white"}}>
                        <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout} alt=""/> Logout </button> 

                        </Card>
                    </div> 
                </div> 
            </div>  
            </div>
        ) 
    }  
}

DisplayResults.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(DisplayResults)
