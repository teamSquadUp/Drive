// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./api.css"
import logo from './logo.png';
import * as firebase from 'firebase';
import logout from './logout.png';


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
                    &nbsp;&nbsp;
                    <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout}/> Logout </button>
                  </label>
                </p> 
              </div>
            </div>
             
  </div>     
)}}

export default API