// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import * as firebase from 'firebase';
import gps from './images/gps.png';
import apiConfig from './apiKeys';
import logout from './images/logout.png';


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
        ratingPref: null}
        // this.getPreference=this.getPreference.bind(this)
    }
    


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
	return(
// -------------------------------------  Page Contents --------------------------------------------------- 
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStyles}>
              <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <h3> Restaurant Search</h3>
                <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                <p>
                  <label> 
                  <h5> Enter Location</h5>
                  {/* Displaying button for using device location and box to enter current location to search */ }
                    <input style={{width: "100%"}} className="location_input" type="text" placeholder="City, Country" value={this.state.value} onChange={this.handleChangeSubmitLocation.bind(this)} />
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.handleSubmitLocation.bind(this)}>Submit</button>
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={ this.getDeviceLocation.bind(this) } > <img src={gps} alt =""/>  Use Device Location </button> 
                    &nbsp;&nbsp;
                    <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout} alt =""/> Logout </button>
                  </label>
                </p> 
              </div>
            </div>
             
  </div>     
)}}

export default API