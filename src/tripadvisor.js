import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import * as firebase from 'firebase';

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

export class tripAdvisor extends React.Component {
    constructor(props) { 
        super(props) 
        this.state= {
        }
    }
    render(){
        return(
    // -------------------------------------  Page Contents --------------------------------------------------- 
          <div className="App-background">
                <img src={logo} className="App-logo2" alt="logo" />
                <div style={loginStyles}>
                  <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                  </div>
                </div>
        </div>
        )
    }
}

export default tripAdvisor