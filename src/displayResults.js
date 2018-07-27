import React, { Component } from 'react';
import * as firebase from 'firebase';
import ConfettiCanvas from 'react-confetti-canvas';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import first from './images/1.png';
import apiConfig from './apiKeys'
import logout from './images/logout.png';
import hoch from "./images/hoch.jpg"
import grubhub from "./images/grubhub.png";
import googlemaps from "./images/googlemaps.png";
import call from "./images/call.png";
import { Row, Col } from 'reactstrap';
import DoughnutExample from './doughnut'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import yelp from "./images/yelp.png"
import squaduplogo from './images/squadlogowhite.png';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {MailFolderListItems, OtherMailFolderListItems } from './tileData';
import { UncontrolledCollapse, Button} from 'reactstrap';

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
                MostVotedDict: largest,
                inital:false
            })
          }
        })
        this.setState({ 
            inital:false
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
        const  classes  = this.props;

        // side panel from tileData.js
        const sideList = (
            <div className={classes.list}>
              <List>
              <MailFolderListItems groupCode={this.props.groupCode} userInGroup={this.props.userInGroup} allUsers = {this.props.allUsers}/>
              </List>
              <Divider />
              <List>
                  <OtherMailFolderListItems/>
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
                  <OtherMailFolderListItems/>
                  </List>
            </div>
          );


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
             // displaying page with app bar, preference selection, and side panel
        <div>
        <AppBar position="absolute" className="tab" style={{maxHeight:"80px"}}>
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
            <div className="App-background">
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '80%' }}>
            {/* Adding confetti to the results page */}
            <ConfettiCanvas colors={[['#38abb4', '#3b5998'],['#7FB3D5', '#76D7C4'],['#d64717', '#e3a75b']]} duration={0.006} paperCount={100} ribbonCount={11}/>
            </div>
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
                                <a href={'https://www.google.com/maps/search/?api=1&query='+coord["latitude"]+"%2C+"+coord["longitude"]} target="_blank">
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
                            </Row>
                            </CardBody>
                        
                        <div>
                            <Button style={{width: "50%", backgroundColor:"white", borderColor:"white", margin:"5%", color:"#0077B5", marginTop: "2%"}} id="toggler">
                            More Info    v
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                            <Card style={{borderColor:"white"}}>
                                <CardTitle style={{color: "#406fa5"}}> Based on the Preferences of </CardTitle>
                                <CardBody style={{width:"80%", maxWidth:"300px", alignContent:"center", textAlign: "center", alignSelf: "center"}} className="pt-callout pt-icon-info-sign">
                                    <DoughnutExample prefStats={this.state.prefStats} />
                                </CardBody>
                        </Card>
                        </UncontrolledCollapse>
                        </div> 
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
