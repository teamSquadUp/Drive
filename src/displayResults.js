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
import { Container, Row, Col } from 'reactstrap';
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
            prefStats:{} 

        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
    
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
  root.child("Preferences").on("value",function(snapshot){
      currentComponent.setState({
          prefStats:snapshot.val()
      })
  })
    }
    // displaying results screen with logo, confetti, and cards with top results
    render(){ 
        const { classes } = this.props;
        const { open } = this.state;

        const sideList = (
            <div className={classes.list}>
              <List>{MailFolderListItems}</List>
              <Divider />
              <List>{OtherMailFolderListItems}</List>
            </div>
          );
      
          const fullList = (
            <div className={classes.fullList}>
              <List>{MailFolderListItems}</List>
              <Divider />
              <List>{OtherMailFolderListItems}</List>
            </div>
          );

        if(this.state.inital){
            this.getLargest()
    
        }
        return (
            <div>
            <AppBar position="static" className="tab">
          <Toolbar className="tab">
          <IconButton
            aria-haspopup="true"
            onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              SquadUp
            </Typography>
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
                            <CardTitle>{this.state.mostVoted}</CardTitle>
                            <CardText> Rating: {this.state.mostVotedRating} </CardText> 
                            <CardText> Type: {this.state.mostVotedType} </CardText> 

                            <CardImg top width="80%" style={{maxHeight:"250px", height:"50%"}} crossOrigin="Anonymous" src= {this.state.mostVotedPhotoRef} alt={hoch} />
                            <Row>
                                <br></br>
                            </Row>
                            <Row>
                            <Col><img src={googlemaps} style={{width:"92%",maxWidth:"50px"}}/> </Col>
                            <Col><img src={opentable} style={{width:"96%",maxWidth:"50px"}}/></Col>
                            <Col><img src={call} style={{width:"95%",maxWidth:"50px"}}/></Col>
                            <Col><img src={grubhub} style={{width:"93%",maxWidth:"50px"}}/></Col>
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
