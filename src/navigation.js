// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./api.css"
import logo from './logo.png';
import * as firebase from 'firebase';
import logout from './logout.png';
import dining from './dining.jpg';
import travel from './travel.png';

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
              <Row>
                <Col xs="6">                    
                    <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.handleSubmitLocation.bind(this)}>
                    <img src={dining}/>
                    Dining
                    </button></Col>
                <Col xs="6"><button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.handleSubmitLocation.bind(this)}>
                    <img src={travel}/>
                    Travel
                    </button></Col>
              </Row>
              <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout}/> Logout </button>

              </div>
            </div>
             
  </div>     
)}}

export default API