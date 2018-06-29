// API is to be imported and called only by SwiperNoSwiping
import React from 'react'
import "./api.css"
import logo from './logo.png';
import * as firebase from 'firebase';
import logout from './logout.png';
import dining from './dining.png';
import travel from './travel.png';
import airbnb from './airbnb.png';
import billsplit from './billsplit.png';
import {Router,Route} from 'react-router';
import { Row, Col } from 'reactstrap';
import {API} from './api'
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
            loadAPI: false
        }
    }
    navigateToDining() {
        this.setState({
            loadAPI: true
        })
        
      };
    

	render(){
	
    if(this.state.loadAPI==false){
        return(
// -------------------------------------  Page Contents --------------------------------------------------- 
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStyles}>
              <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
              <Row>
                <Col xs="6">                    
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick={this.navigateToDining.bind(this)}>
                    <img src={dining}/>
                    <div className= "centered"> 
                    <p> Dining </p>
                    </div>
                    </button></Col>
                <Col xs="6"><button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                <div className= "centered"> 
                <img src={travel}/>
                    <p> Travel </p>
                    </div>
                    </button></Col>
            </Row>
            <span> &nbsp; </span>
            <Row>
            <Col xs="6">                    
                    <button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                    <div className= "centered"> 
                    <img src={airbnb}/>
                    <p> Airbnb </p>
                    </div>
                    </button></Col>
                <Col xs="6"><button style={{width: "100%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginTop: "2%"}} type="submit" className="btn btn-primary">
                <div className= "centered"> 
                <img src={billsplit}/>
                    <p> Bill Spliter </p>
                    </div>
                    </button></Col>                   

              </Row>
              <span> &nbsp; </span>

              <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.props.logout}> <img src={logout}/> Logout </button>

              </div>
            </div>
             
  </div>     
)}
else { 
return (<API doneWithAPI= {this.props.doneWithAPI}  groupCode={this.props.groupCode} logout= {this.props.logout}/> )
}
}}

export default Navigation