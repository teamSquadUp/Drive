// API is to be imported and called only by SwiperNoSwiping
import React, { Component } from 'react'
import "./api.css"
import logo from './logo.png';
import * as firebase from 'firebase';
import gps from './gps.png'
import apiConfig from './apiKeys';

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
        visibility: "visible" // Handles the visibility of the cards (may not be used depending on version)
    }
    }
    grabAPI(location){
      // Foursquare API doing a search with the location that is passed to the function. 
      // Current set up searches only for coffee spots in the specified location. 
      // The location passed must be in the form of lattitude and longitude. 
      const request = require('request');
      console.log(location)
      request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: apiConfig.client_id,
          client_secret: apiConfig.client_secret,
          ll: location,
          query: 'coffee',
          v: '20180323',
          limit: 5
        }
      }, function(err, res, body){
        if (err) {
          console.error(err);
        } else {
          console.log(body);
        }
      });
    }
   // ------------------------------------------------------------------------------------------------------------

    // -------------------------------------  GMaps API Stuff ---------------------------------------------------
   
    GMapsAPI(location){
      // Takes in the location specified by the user in the form of words
      // returns a place id of the location on google maps.
      // parses the place id and obtains the co-ordinates of the location passed and stores the
      // location in the location states
      const request = require('request');
      console.log(location)
      request({
        url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=' + this.state.key+ '&input='+ this.state.value+'&inputtype=textquery',
        }, function(err, res, body) {
          if (err) {
            console.error(err);
          } else {
            var obj = JSON.parse(body)
            var placeID= obj.candidates[0].place_id
            const quest = require('request');
          quest({
            url: "http://localhost:8080/https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=" + this.state.key+ ""
            }, function(err, res, body) {
              if (err) {
                console.error(err);}
              else {
                const loc = JSON.parse(body)
                this.setState({
                  latitude: loc.result.geometry.location.lat,
                  longitude: loc.result.geometry.location.lng,})
                this.GMapsNearby()    
              }
              }.bind(this)
            )
            }}.bind(this)
      )}


    GMapsNearby(){
      // Uses the Google Places Nearby API search to obtain a list of results of restraunts in the location that is set in the states 
      // Currently only searches for restraunts but can be expanded for many other searches. 
      const request = require('request');
      request({
        url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + this.state.key+ '&location='+this.state.latitude+","+ this.state.longitude+'&rankby=distance&type=restaurant'
        },function(err,res,body){
          if(!err){
            var output= []
            const resultsJSON = JSON.parse(body) // Stores the list of results in a JSON format 
            const results= resultsJSON.results  // Moving in the right part of the JSON 
            this.setState({
              results: []
            })
            Object.values(results).forEach(function(result){ // Iterates thorugh every result in the JSON and currently stores 3 attributes
              var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
              // Default image reference of the Shanahan-Hoch Dining hall is used if image is not availalbe 
              if(result.photos!=undefined){
                ref= result.photos[0].photo_reference
                // Currently only saves the first photo availalbe. 
              }
              this.setState({
                results: this.state.results.concat({"name":result.name, "rating":result.rating, "photoReference": ref }),
              })
            
            }.bind(this))
          console.log(this.state.results)
          this.firebaseResult() // Saves the result in firebase (for the list of results to obtain the )  
          this.props.doneWithAPI()
        }     
        }.bind(this))
      }
   // ------------------------------------------------------------------------------------------------------------

   // -------------------------------------  Get Location functions ---------------------------------------------------
   

    getDeviceLocation(){
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
      console.log(position)
      this.setState({ 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
  
      const request = require('request');
      request({
        url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitude+","+ this.state.longitude+"&key=" + this.state.key
        }, function(err, res, body) {
        if (err) {
          console.error(err);
        }})
      this.GMapsNearby()
    }

    getLocationError(){ 
      console.log("NOPE")
      return ("NOPE")
    }
   // ------------------------------------------------------------------------------------------------------------

   // -------------------------------------  Button Handlers ---------------------------------------------------
   
    
    handleChangeSubmitLocation(event){ 
        this.setState({value: event.target.value});    
        //using 'enter' key
       if (event.keyCode == 13){
        console.log('it works')
        this.setState({value: event.target.value});
      }
      }
    
    handleSubmitLocation(event) {
        this.GMapsAPI(this.state.value)
        event.preventDefault();
      }
    handleSubmitRadius(event){ 
      event.preventDefault();
      }
 
    handleChangeRadius(event){ 
      this.setState({userRadius: event.target.value});   
      }
   // ------------------------------------------------------------------------------------------------------------

   // -------------------------------------  Database connection ---------------------------------------------------
    
    firebaseResult(){
      console.log("API's GC", this.props.groupCode)
      var randomCode = this.props.groupCode
      // Stores the results in the results state to the firebase database 
      const ResultsRef = firebase.database().ref(randomCode).child("Results")
      ResultsRef.set("null")
      console.log(ResultsRef)
      this.state.results.map(i =>{
        var name= this.replaceAll("."," ",i.name)
        var rating= "N/A"
        if(!i.rating==false){
          rating= i.rating
        }
        var photoREF= null 
        if(!i.photoReference==false){
          photoREF= i.photoReference
          console.log(i.photoReference)
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
                  <h5> Enter Location </h5>
                  {/* Displaying button for using device location and box to enter current location to search */ }
                    <input style={{width: "100%"}} className="location_input" type="text" placeholder="City, Country" value={this.state.value} onChange={this.handleChangeSubmitLocation.bind(this)} />
                    <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.handleSubmitLocation.bind(this)}>Submit</button>
                    <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={ this.getDeviceLocation.bind(this) }> <img src={gps}/>  Use Device Location </button> 
                  </label>
                </p> 
              </div>
            </div>
  </div>     
)}}

export default API