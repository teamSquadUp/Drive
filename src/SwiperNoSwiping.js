// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import {API} from './api'
import {Cards} from './Cards'
import {DisplayResults} from './displayResults'
import logo from './logo.png';
import firebase from 'firebase'
export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         results: false,
         readyDisplayResults: false ,
         groupC: null
    }
  }
  
  componentDidMount() { 
    if(this.props.loadAPI==false){
    let currentComponent = this;
    var root= firebase.database().ref(this.props.groupCode).child("Results")
    var results = [] 
    var snapshotResults = {}
    var keys = []
    root.once('value',function(snapshot){
         snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
         Object.keys(snapshotResults).map(i=> { 
          var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[i].photoRef==false){
            ref= snapshotResults[i].photoRef
            // Currently only saves the first photo availalbe. 
          }
                results= results.concat({
                    'name': i, 
                    'rating':snapshotResults[i].rating,
                    'photoReference': ref
                })
         })
         
        })
        console.log(results)
        currentComponent.setState({
          results: results
        })
  }
}
doneWithAPI() { 
  this.setState({ 
    results: true
  })
}
  
  getData(recieveResults) { 
  // This function has to be passed to API to get back the results of the API call
      this.getDatafromFirebase()
  }

  display() {
    this.setState({
      readyDisplayResults: true
    })
  }


  render() {
    console.log("GROUP CODE:", this.props.groupCode)
    console.log("loadAPI:", this.props.loadAPI)
     let currentComponent= this
    if(this.props.loadAPI && this.state.results==false){
    // As long as no results are loaded, it will keep displaying the location page
      return (<API doneWithAPI= {this.doneWithAPI.bind(this)}  groupCode={this.props.groupCode}/> )
    }
    else {
      if(this.state.readyDisplayResults==false && (this.props.loadAPI)){
      // Once results are loaded, the cards are loaded
      return(<div>
      <img src={logo} className="App-logo2" alt="logo"/> 
      <Cards results={currentComponent.state.results} DisplayResults={currentComponent.display.bind(this)} groupCode= {currentComponent.props.groupCode}/> 
      </div>)
      }
      else if(this.state.readyDisplayResults==false){
         return(<div>
          <img src={logo} className="App-logo2" alt="logo"/> 
          <Cards results={currentComponent.state.results} DisplayResults={currentComponent.display.bind(this)} groupCode= {currentComponent.props.groupCode}/> 
          </div>)
          }
      
      else {
        return (<DisplayResults groupCode= {currentComponent.props.groupCode}/>)
      }
    }}}
export default SwiperNoSwiping;