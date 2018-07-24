// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import {API} from './api'
import {Cards} from './Cards'
import {DisplayResults} from './displayResults'
import logo from './images/logo.png';
import Preferences from "./preferences"

export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         pref: false,
         API: false,
         readyDisplayResults: false ,
         groupC: null,
         logout: false,
         results: null
    }
  }
  
doneWithAPI() { 
  this.setState({ 
    API : true
  })
}
doneWithPref(recieveResults) { 
  // this.componentDidMount() 
  this.setState({ 
    results: recieveResults, 
    pref: true
  })
  console.log(this.state.results)
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
    
     let currentComponent = this
    if(this.props.loadAPI && this.state.API===false){
    // As long as no results are loaded, it will keep displaying the location page
      return (<API doneWithAPI= {this.doneWithAPI.bind(this)}  groupCode={this.props.groupCode} logout= {this.props.logout} userInGroup={this.props.userInGroup}/> )
      
    }
    else if(this.state.pref===false){
      return (<Preferences allUsers={this.props.allUsers} doneWithPref= {this.doneWithPref.bind(this)} groupCode={this.props.groupCode} userInGroup={this.props.userInGroup}/> )
    }
    else{
        if(this.state.readyDisplayResults===false){
         return(<div>
          {/*<img src={logo} className="App-logo2" alt="logo"/> */}
          <Cards results={currentComponent.state.results} DisplayResults={currentComponent.display.bind(this)} userInGroup={this.props.userInGroup} groupCode= {currentComponent.props.groupCode} logout= {this.props.logout}/> 
          </div>)
          }
      
      else {
        return (<DisplayResults groupCode= {currentComponent.props.groupCode} userInGroup={this.props.userInGroup} logout= {this.props.logout}/>)
      }
    }}}
export default SwiperNoSwiping;