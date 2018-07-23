import React, { Component } from 'react';
import './css/App.css';
import {auth, provider, facebookProvider} from './firebase.js';
import logo from './images/logo.png';
import facebook from './images/facebook.png';
import google from './images/google.png';
import {SwiperNoSwiping} from './SwiperNoSwiping';
import alternate from './images/alternate.png';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card} from 'reactstrap';
import classnames from 'classnames';
import home from './images/home.png';
import group from './images/group.png';
import wheel from './images/wheel.png';
import time from './images/timer.png';
import triangle from './images/triangle.png';
import ReactTooltip from 'react-tooltip'
import firebase from 'firebase';
import {Link} from 'react-router'; 

const loginStyles = {
  width: "90%",
  maxWidth: "400px",
  margin: "20px auto",
  borderRadius: "5px",
  padding: "20px",
  background: "white",
  color: "black",
}

const tabStyle = {
  width: "80%",
  maxWidth: "40px",
  maxHeight: "45px",
  height: "80%",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null ,
      activeTab: '1',
      GroupCodeInp: null,
      GroupCode:null,
      submitGC: false,
      userInGroup: "admin",
      submitName:false,
      rotationState: 0,
      imageclass: "wheelimage",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gmailLogin = this.gmailLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.fblogin = this.fblogin.bind(this);
    this.login = this.login.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
  handleChangeGC (e){
    this.setState({
      GroupCodeInp: e.target.value
    })
  }
  handleChangeName(e){
    this.setState({
      userInGroup: e.target.value
    })
  }
  handleSubmitGC (e){
    this.setState({
      submitGC: e.target.value
    })
  }
  handleSubmitName(e){
    console.log("new user added")
    this.setState({
      submitName: e.target.value
    })
  }

  //receives inputs from our inputs and updates the corresponding piece of state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //when signout method is called, we remove the user from our app's state
  logout(){
    auth.signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
  }

  /*
  -signInWithPopup will trigger a popup gmail login option to sign in with a Google account
  */

  gmailLogin() {
    auth.signInWithRedirect(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }


  login(){
    const thisUser = this
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=> {
      var user = firebase.auth().user;
      thisUser.setState({
        user
      });
    });
  }


  fblogin(){
    auth.signInWithRedirect(facebookProvider)
    .then((result)=> {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  //event listener for our form
  handleSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
      this.setState({
      username: ''
    });
  }
  componentDidMount() {
    let currentComponent = this
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentComponent.setState({ user });
      } 
    });
  }    

  codeGenerator(){
    var s = "";
    //var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i<=5; i++) {
    s  += Math.round(Math.random()*10);
    }
    var root = firebase.database();
    root.ref("/").once("value", function(snapshot){
      if (snapshot.hasChild(s)){
        s += Math.round(Math.random()*10);
      }
    })
    return s
    }


  wheelSpin(){
    //this.setState({rotationState: (Math.floor(Math.random() * (8)) + 1)});
    //console.log(this.imageclass); 
    this.setState({imageclass: 'wheelimage'+ ((Math.floor(Math.random() * (8))) + 1)});
    //this.setState({this.imageclass += (Math.floor(Math.random() * (8)) + 1)});
    //console.log(this.imageclass); 
    
    
  }

  
  render() {
  if(!this.state.user && (this.state.submitGC===false)){
    return (
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
              <h1>{this.state.title}</h1>
    <div>
      <Nav className="center" tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            > <img style={tabStyle} src={home} alt ="" onClick={this.home} responsive /> </NavLink>
      </NavItem> 
      <ReactTooltip id = "tab2" />
      <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}> <img style={tabStyle} src={group} alt ="" onClick={this.group} responsive data-tip= "Enter your groupcode!" data-for= "tab2"  />
  
            </NavLink>
          </NavItem> 
      <ReactTooltip id = "tab3" />
      <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}> <img style={tabStyle} src={time} alt ="" onClick={this.timer} responsive data-tip= "Quick decision!" data-for= "tab3"/>
            </NavLink>
          </NavItem>
      </Nav> 
      <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {/*}
              {
                this.state.user?
                <button onClick={this.logout}>Log Out </button>
                :
                <button onClick={this.login}>Login In</button>
              }*/}
        <div style={loginStyles}>              
            
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} alt={alternate} />
            </div>
          </div>
          :
          <div className='text_input'>
          <h5>Welcome to SquadUp!</h5>
              <p>One user from the group has to login in order to receive a group code.</p>
          </div>
      }     
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                {/*this is where we need to modify to math current website
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                */}
                <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="email" />
                <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="password" />
                
                <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4"}} type="submit" className="btn btn-primary" value="Log In" onClick={this.login} block> Login to SquadUp</button>
                <ReactTooltip id = "signup"/>
                <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" data-tip= "Enter a username and password to create an account!" data-for= "signup" onClick={this.signup} block> Create Account</button>
                <hr style={{marginTop: "10px", marginBottom: "10px"}} />
                </div>
          </form>
          </section>

          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                {this.state.user?
               <button style={{width: "100%", backgroundColor:"#3b6698", borderColor:"#3b6698", marginTop: "2%"}} className="btn btn-primary" type="submit" onClick = {this.logout}> <img src={facebook} onClick = {this.logout} alt={facebook}/> Logout of Facebook </button>
               :
               <button style={{width: "100%", backgroundColor:"#3b6698", borderColor:"#3b6698", marginTop: "2%"}} className="btn btn-primary" type="submit" onClick = {this.fblogin}> <img src={facebook} onClick = {this.fblogin} alt={facebook} /> Login with Facebook </button>
                }
               {this.state.user?
              <button style={{width: "100%", backgroundColor:"#dd4b39", borderColor:"#dd4b39", marginTop: "2%"}} className="btn btn-primary" onClick = {this.logout}> <img src={google} onClick={this.logout} alt={google} responsive/> Logout of Google</button>
                :
              <button style={{width: "100%", backgroundColor:"#dd4b39", borderColor:"#dd4b39", marginTop: "2%"}} className="btn btn-primary" onClick={this.gmailLogin}> <img src={google} onClick={this.gmailLogin} alt={google} responsive /> Login with Google</button>
               }              
                </form>
              <p> 
                <Link to = "/SignUp">Create an account </Link>
             </p>

          </section>
      </div>

      </TabPane>
      
      <TabPane tabId="2" >
      <form onSubmit={this.handleSubmit}>
      <div style={loginStyles}>  
      <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
      <h5>Welcome to SquadUp</h5>
      <p>Enter the shared group code to join the group</p>
      <input onChange={(e)=>this.handleChangeName(e)} style={{width: "98%"}} type="text" name="Name" placeholder="Your Name" />
      <input onChange={(e)=>this.handleChangeGC(e)} style={{width: "98%"}} type="text" name="GroupCode" placeholder="Group Code" />
      <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Group</button>
      </div>
      </div>
      </form>
       </TabPane>
       <TabPane tabId="3">
       <div style={loginStyles}>  
       <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
      <h5>Welcome to SquadUp</h5>
      <p>No time? Just spin the wheel to decide!</p>      
       <Card style={{borderColor: "white"}} inverse>
       <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
          <img style={{width:"10%"}} src={triangle} alt = "" />
          <img class={this.state.imageclass} src={wheel} alt ="" />
          <button style={{width: "50%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} className="btn btn-primary" onClick={this.wheelSpin.bind(this)}>Spin</button>
          </div>
          &nbsp;
      </Card>
       </div>
       </div>
      </TabPane>
      </TabContent>
      </div>
      </div>
    )} 
    else {
      if(this.state.submitGC===false){
      return (<SwiperNoSwiping groupCode= {this.codeGenerator()} loadAPI= {true} logout={this.logout.bind(this)} userInGroup={this.state.userInGroup}/>)} 
      else { 
        return (<SwiperNoSwiping groupCode= {this.state.GroupCodeInp} userInGroup={this.state.userInGroup} loadAPI= {false} logout={this.logout.bind(this) }/>)
      }
    }

  }
}

export default App;
