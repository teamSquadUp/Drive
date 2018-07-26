// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import * as firebase from 'firebase';
import gps from './images/gps.png';
import apiConfig from './apiKeys';
import logout from './images/logout.png';
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

// Basic window for displaying app features
const loginStyles = {
  width: "90%",
  maxWidth: "400px",
  margin: "20px auto",
  borderRadius: "5px",
  padding: "20px",
  background: "white",
  color: "black",
  boxshadow: "10px 10px gray",
}

export class API extends React.Component {
  constructor(props) { 
    super(props) 
    this.state= {
        value: "",   // Stores the input from the Location 
        latitude: 0, // Stores the latitude of the use after the use device location button is pressed.
        longitude:0, // Stores the longitude of the use after the use device location button is pressed.
        userRadius:0 , 
        results:[], // A list storing the results of the Google Nearby Places API call 
        key: apiConfig.key, // Google API call 
        visibility: "visible", // Handles the visibility of the cards (may not be used depending on version)
        RestaurantPref: null,
        bakeryPref: null,
        cafePref: null,
        pricePref: null,
        RadiusPref: null,
        openPref: null,
        left: false,
    bottom: false,
    right: false,
        ratingPref: null}
        // this.getPreference=this.getPreference.bind(this)
    }
    
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

   // -------------------------------------  Get Location functions ---------------------------------------------------
   

    getDeviceLocation()
    {
      // this.getPreference()
      // Get the user location if the browerser supports it and saves the device locaiton in the states if available. 
      if (navigator.geolocation) {  //Checking if browser supports Geolocation or not
        console.log('Geolocation is supported!');
        navigator.geolocation.getCurrentPosition(this.getLocationSuccess.bind(this), this.getLocationError.bind(this))
        }
      else {
        console.log('Geolocation is not supported for this Browser/OS.');
      }
      }
      
    getLocationSuccess(position){ 

      this.setState({ 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
        
      // STORE COORDINATES IN DB 
      const ResultsRef = firebase.database().ref(this.props.groupCode).child("location")
        const branch = {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }
        ResultsRef.set(branch)
        // STORE THE USER ENTRY IN DB 
      
          this.props.doneWithAPI()
    }

    getLocationError(){ 
      return ("NOPE")
    }
   // ------------------------------------------------------------------------------------------------------------

   // -------------------------------------  Button Handlers ---------------------------------------------------
   
    
    handleChangeSubmitLocation(event){ 
        this.setState({value: event.target.value});    
        //using 'enter' key
       if (event.keyCode === 13){
        this.setState({value: event.target.value});
      }
      }
    
    handleSubmitLocation(event) {
        // this.GMapsAPI(this.state.value)
        const ResultsRef = firebase.database().ref(this.props.groupCode).child("location")
        const branch = {
          place: this.state.value
        }
        ResultsRef.set(branch)
        // STORE THE USER ENTRY IN DB 
        event.preventDefault();
        this.props.doneWithAPI()

        if (this.state.value === '')
        {
          alert("Please enter a location!");
          event.preventDefault();
          document.location.reload();
          }
      }
    handleSubmitRadius(event){ 
      event.preventDefault();
      }
 
    handleChangeRadius(event){ 
      this.setState({userRadius: event.target.value});   
      }
   // ------------------------------------------------------------------------------------------------------------

   // -------------------------------------  Database connection ---------------------------------------------------
    
   stateSetter(RestaurantPrefStuff){ 
    this.setState({
      RestaurantPref:RestaurantPrefStuff
  })
   }

   componentDidMount(){
    let currentComponent = this;
    var root= firebase.database().ref(this.props.groupCode).child("users").child(this.props.userInGroup).child("Preferences")
    root.on("value", function(snapshot){
      if(snapshot.val()!==null){
    let RestaurantPref = snapshot.val().restaurant
    let bakeryPref = snapshot.val().bakery
      let cafePref = snapshot.val().cafe
      let pricePref = snapshot.val().price
      let RadiusPref = snapshot.val().radius
      let openPref = snapshot.val().opennow
      let ratingPref = snapshot.val().rating

    if(currentComponent.state.RestaurantPref == null){
      currentComponent.setState({
        RestaurantPref:RestaurantPref,
        bakeryPref:bakeryPref,
        cafePref:cafePref,
        pricePref:pricePref,
        RadiusPref:RadiusPref,
        openPref:openPref,
        ratingPref:ratingPref})
    } }

    }
    )

  }
   firebaseResult(){
      console.log("API's GC", this.props.groupCode)
      var randomCode = this.props.groupCode
      // Stores the results in the results state to the firebase database 
      const ResultsRef = firebase.database().ref(randomCode).child("Results")
      ResultsRef.set("null")
      this.state.results.forEach(i =>{
        var name= this.replaceAll("."," ",i.name)
        var rating= "N/A"
        if(!i.rating===false){
          rating= i.rating
        }
        var photoREF= null 
        if(!i.photoReference===false){
          photoREF= i.photoReference
        }
        const branches = {
            photoRef: photoREF,
            rating: rating,
            right: 0,
            left:0
        }
      ResultsRef.child(name).set(branches)
      }) 
      }
  
    replaceAll (search, replacement, s) {
      var target = s;
      return target.split(search).join(replacement);
  }

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

	return(
// -------------------------------------  Page Contents --------------------------------------------------- 
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
      
        <div className="App-background">
            {/*<img src={logo} className="App-logo2" alt="logo" />*/}
            <div style={loginStyles}>
              <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <h3> Restaurant Search</h3>
                <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                <p>
                  <label> 
                  <h5> Enter Location</h5>
                  {/* Displaying button for using device location and box to enter current location to search */ }
                    <input style={{width: "100%"}} className="location_input" type="text" placeholder="City, Country" value={this.state.value} onChange={this.handleChangeSubmitLocation.bind(this)} />
                    <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.handleSubmitLocation.bind(this)}>Submit</button>
                    <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={ this.getDeviceLocation.bind(this) } > <img src={gps} alt =""/>  Use Device Location </button> 
                    &nbsp;&nbsp;
                    <button style={{width: "100%", backgroundColor:"white", borderColor:"#0077B5", marginTop: "2%", color:"#0077B5"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <ReplyIcon style={{float:"left"}} /> Logout </button>
                  </label>
                </p> 
              </div>
            </div>  
        </div>  
        </div>   
)}}

API.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(API)