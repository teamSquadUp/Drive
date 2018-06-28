import React, { Component } from 'react';
import './App.css';
import {auth, provider, facebookProvider} from './firebase.js';
import logo from './logo.png';
import facebook from './facebook.png';
import google from './google.png';
import {SwiperNoSwiping} from './SwiperNoSwiping';
import alternate from './alternate.png';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import home from './home.png';
import group from './group.png';

const loginStyles = {
  width: "90%",
  maxWidth: "400px",
  margin: "20px auto",
  borderRadius: "5px",
  padding: "20px",
  background: "white",
  color: "black",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null ,
      activeTab: '1',
      GroupCodeInp: null,
      GroupCode:null,
      submitGC: false 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fblogin = this.fblogin.bind(this);
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
  
  handleSubmitGC (e){
    console.log("Join Group Clicked")
    this.setState({
      submitGC: e.target.value
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
  -signInWithPopup will trigger a popup login option to sign in with a Google account
  */
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  fblogin(){
    auth.signInWithPopup(facebookProvider)
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
    for (var i = 0; i <= 5; i++)
    s += Math.round(Math.random()*10);
    console.log(s)
    return s
  }
  
  render() {
  if(!this.state.user && (this.state.submitGC==false)){
    return (
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
              <h1>{this.state.title}</h1>
    <div>
      <Nav className="center" tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            > <img src={home} onClick={this.home} responsive /></NavLink>
      </NavItem> 
      <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}> <img src={group} onClick={this.group} responsive />
  
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
          <h5>Welcome to SquadUp</h5>
              <p>You must be logged in to see the group events.</p>
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
                <input style={{width: "98%"}} type="text" name="username" placeholder="Username" />
                <input style={{width: "98%"}} type="text" name="currentItem" placeholder="Password" />
                
                <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4"}} type="submit" className="btn btn-primary" value="Log In" block> Login to SquadUp</button>
                <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" block> Create Account</button>
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
              <button style={{width: "100%", backgroundColor:"#dd4b39", borderColor:"#dd4b39", marginTop: "2%"}} className="btn btn-primary" onClick={this.login}> <img src={google} onClick={this.login} alt={google} responsive /> Login with Google</button>
               }              
                </form>
          </section>
      </div>

      </TabPane>
      <TabPane tabId="2">
      <form onSubmit={this.handleSubmit}>
      <div style={loginStyles}>  
      <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
      <h5>Welcome to SquadUp</h5>
      <p>Enter the shared group code to join the group</p>
      <input onChange={(e)=>this.handleChangeGC(e)} style={{width: "98%"}} type="text" name="GroupCode" placeholder="Group Code" />
      <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Group</button>
      </div>
      </div>
      </form>
       </TabPane>
      </TabContent>
      </div>
      </div>
    )} 
    else {
      if(this.state.submitGC==false){
      console.log("No Props", this.state.groupCode)
      return (<SwiperNoSwiping groupCode= {this.codeGenerator()} loadAPI= {true}/>)} 
      else { 
        console.log("with Props", this.state.GroupCodeInp)
        return (<SwiperNoSwiping groupCode= {this.state.GroupCodeInp} loadAPI= {false}/>)
      }
    }

  }
}
export default App;