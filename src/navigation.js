// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import logout from './images/logout.png';
import dining from './images/dining.png';
import travel from './images/travel.png';
import airbnb from './images/airbnb.png';
import billsplit from './images/billsplit.png';
import { Row, Col } from 'reactstrap';
import {Preferences} from './preferences.js';

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

export class Navigation extends React.Component {
    constructor(props) { 
        super(props) 
        this.state= {
            loadPrefs: false,
            redirect:false
        }
    }
    navigateToDining() {
        this.setState({
            loadPrefs: true
        })
        
      };
	render(){
	
    if(this.state.loadPrefs===false){
        return(
// -------------------------------------  Page Contents --------------------------------------------------- 
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStyles}>
              <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
              <Row>
                <Col xs="6">                    
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.navigateToDining.bind(this)}>
                    <img src={dining} alt =""/>
                    <div className= "centered"> 
                    <p> Dining </p>
                    </div>
                    </button></Col>
                <Col xs="6"><button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                <div className= "centered"> 
                <img src={travel} alt =""/>
                    <p> Travel </p>
                    </div>
                    </button></Col>
            </Row>
            <span> &nbsp; </span>
            <Row>
            <Col xs="6">                    
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                    <div className= "centered"> 
                    <img src={airbnb} alt =""/>
                    <p> Airbnb </p>
                    </div>
                    </button></Col>
                <Col xs="6"> <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                <div className= "centered"> 
                <img src={billsplit} alt =""/>
                    <p> Bill Spliter</p>
                    </div>
                    </button> </Col>                   

              </Row>
              <span> &nbsp; </span>

              <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout} alt =""/> Logout </button>

              </div>
            </div>
             
        </div>     
)}
    else { 
        return (<Preferences doneWithPref= {this.props.doneWithPref} groupCode={this.props.groupCode} /> )
    }
}}

export default Navigation