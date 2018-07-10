// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import {API} from './api'
import {Cards} from './Cards'
import {DisplayResults} from './displayResults'
import logo from './images/logo.png';
import firebase from 'firebase';
import {Navigation} from './navigation.js';

export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         pref: false,
         API: false,
         readyDisplayResults: false ,
         groupC: null,
         logout: false
    }
  }
  
  componentDidMount() { 
    if(this.props.loadAPI===false){
    let currentComponent = this;
    console.log("reading cards groupcode is", this.props.groupCode)
    console.log("user here is", this.props.userInGroup)
    var root= firebase.database().ref(this.props.groupCode).child("users").child(this.props.userInGroup).child("results")
    var results = [] 
    var snapshotResults = {}
    root.once('value',function(snapshot){
         snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
         Object.keys(snapshotResults).forEach(i=> { 
          var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[i].photoRef===false){
            ref= snapshotResults[i].photoRef
            // Currently only saves the first photo availalbe. 
          }
                results= results.concat({
                  'name': snapshotResults[i].name,
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
    API : true
  })
}
doneWithPref() { 
  this.componentDidMount() 
  this.setState({ 
    pref: true
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
    if(this.props.loadAPI && this.state.API==false){
    // As long as no results are loaded, it will keep displaying the location page
      return (<API doneWithAPI= {this.doneWithAPI.bind(this)}  groupCode={this.props.groupCode} logout= {this.props.logout} userInGroup={this.props.userInGroup}/> )
      
    }
    else if(this.state.pref===false){
      return (<Preferences doneWithPref= {this.doneWithPref.bind(this)} groupCode={this.props.groupCode} userInGroup={this.props.userInGroup}/> )
    }
    else{
        if(this.state.readyDisplayResults===false){
         return(<div>
          <img src={logo} className="App-logo2" alt="logo"/> 
          <Cards results={currentComponent.state.results} DisplayResults={currentComponent.display.bind(this)} userInGroup={this.props.userInGroup} groupCode= {currentComponent.props.groupCode} logout= {this.props.logout}/> 
          </div>)
          }
      
      else {
        return (<DisplayResults groupCode= {currentComponent.props.groupCode} logout= {this.props.logout}/>)
      }
    }}}
export default SwiperNoSwiping;