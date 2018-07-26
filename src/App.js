import React, { Component } from 'react';
import './css/App.css';
import {auth, provider, facebookProvider} from './firebase.js';
import {SwiperNoSwiping} from './SwiperNoSwiping';
import alternate from './images/alternate.png';
import {Card} from 'reactstrap';
import wheel from './images/wheel.png';
import triangle from './images/triangle.png';
import ReactTooltip from 'react-tooltip'
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import TimeIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import MoodIcon from '@material-ui/icons/Mood'
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Google from './images/googlefront.jpg';
import squaduplogo from './images/squadlogo.png';

const loginStyles = {
  width: "100%",
  maxWidth: "500px",
  margin: "20px auto",
  borderRadius: "5%",
  padding: "5%",
  background: "white",
  color: "black",
  boxshadow: "10px 10px gray",
  borderColor: "#0077B5",
}


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 0.1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


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
      displayResult:false,
      rotationState: 0,
      imageclass: "wheelimage",
      value: 0,
      slideIndex: 0,
      allUsers:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gmailLogin = this.gmailLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.fblogin = this.fblogin.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value ,
      slideIndex: value,});
  };

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
    var currentComponent = this
    var root = firebase.database().ref(currentComponent.state.GroupCodeInp).child("users");
    console.log("users in group",currentComponent.state.userInGroup)
    var userHere = currentComponent.state.userInGroup
    root.once("value", function(snapshot){
    console.log("reading data",snapshot.val())
    var userss=snapshot.val()
    var allusers = []
    for(var k in userss) allusers.push(k)
      console.log("allusers are",allusers)
      currentComponent.setState({allUsers:allusers})
      if (snapshot.hasChild(userHere)){
        //e.preventDefault();
        console.log("has same name");
        alert("someone in the group already has this name, please enter another name");
        e.preventDefault();
        document.location.reload();
      }
    })
    // this.setState({allUsers:allusers})
    currentComponent.setState({
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
    console.log("logging out")
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
      user = firebase.auth().user;
      thisUser.setState({
        user
      })
    })
    .catch((error) => {
      alert("Incorrect email or login.")
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

    // otherUser(){
    //   //reads firebase to get other user in the group
    //   root = firebase.database().child(this.state.GroupCodeInp).child("users")
    //   root.on("value",function(snapshot){
    //     var userss=snapshot.val()
    //     console.log("usersss are", Object.keys(userss))
    //     this.setState({
    //       allUsers:userss
    //     })
    //   })
      
      
    // }
  wheelSpin(){
    //this.setState({rotationState: (Math.floor(Math.random() * (8)) + 1)});
    //console.log(this.imageclass); 
    this.setState({imageclass: 'wheelimage'+ (Math.floor(Math.random() * (8)) + 1)});
    //this.setState({this.imageclass += (Math.floor(Math.random() * (8)) + 1)});
    //console.log(this.imageclass); 
    
    
  }

  
  render() {
    
    const { classes } = this.props;
    const { value } = this.state;

  if(!this.state.user && (this.state.submitGC===false)){
    return (
      <div>
           <div className={classes.root}>
        <AppBar position="static" color="white">
          <Tabs
            onChange={this.handleChange}
            // scrollable
            //scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            value={this.state.slideIndex}
            centered
            boxShadow="none"
          >
            <Tab className="tab" label="Home" icon={<HomeIcon />} />
            <Tab className="tab"  label="Groups" icon={<GroupIcon />} />
            <Tab className="tab"  label="Speed" icon={<TimeIcon />} />

          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
        {value === 0 && <TabContainer className="tab">
             {/*}
              {
                this.state.user?
                <button onClick={this.logout}>Log Out </button>
                :
                <button onClick={this.login}>Login In</button>
              }*/}
        <div style={loginStyles}> 
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
            
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
                    <input style={{width: "98%"}} type="text" id= "username" name="username" placeholder="Email" />
                    <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Password" />
                    
                    <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5"}} type="submit" className="btn btn-primary" value="Log In" onClick={this.loginEmail} block> Sign in </button>
                    <ReactTooltip id = "signup"/>
                    
                    <hr style={{marginTop: "10px", marginBottom: "10px"}} />
                    </div>
              </form>
              </section>
    
              <section className='add-item'>
                    <form onSubmit={this.handleSubmit}>
                    <button style={{width: "100%", backgroundColor:"white", color:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={()=>window.location.href='/SignUp'} block> Join Now</button>
                   {this.state.user?
                  <button style={{width: "100%", backgroundColor:"white", borderColor:"#0077B5", marginTop: "2%"}} className="btn btn-primary" onClick = {this.logout}> Logout of Google</button>
                    :
                  <button style={{width: "100%", backgroundColor:"white", textAlign:"center", color:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} className="btn btn-primary" onClick={this.gmailLogin}> 
                  <img alt = "" src={Google} style={{width:"8%", float:"left", maxWidth:"25px"}} />
                   Join with Google</button>
                   }              
                    </form>
              </section>
          </div>
          </div>
        </TabContainer>}
        {value === 1 && <TabContainer className="tab">
          <div style={loginStyles}>
          <form onSubmit={this.handleSubmit}>
      <div style={loginStyles}>  
      <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
      <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
      <h5>Welcome to SquadUp!</h5>
      <p>Enter the shared group code to join the group</p>
      <input onChange={(e)=>this.handleChangeName(e)} style={{width: "98%"}} type="text" name="Name" placeholder="Your Name" />
      <input onChange={(e)=>this.handleChangeGC(e)} style={{width: "98%"}} type="text" name="GroupCode" placeholder="Group Code" />
      <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Group</button>
      </div>
      </div>
      </form>
      </div>
        </TabContainer>}

       
        {value === 2 && <TabContainer className="tab">
        <div style={loginStyles}>  
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
       <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
      <h5>Welcome to SquadUp!</h5>
      <p>No time? Just spin the wheel to decide!</p>      
       <Card style={{borderColor: "white"}} inverse>
            <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <img style={{width:"10%"}} src={triangle} alt = "" />
                <img class={this.state.imageclass} src={wheel} alt ="" />
            </div>
        </Card>
        <button style={{width: "80%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop:"5%"}} className="btn btn-primary" onClick={this.wheelSpin.bind(this)}> Spin </button>

            </div>
            </div>
            </div>
    </TabContainer> 
    }
            </SwipeableViews>
    </div>
    </div>
    )} 
    else {
      if(this.state.submitGC===false){
      return (<SwiperNoSwiping groupCode= {this.codeGenerator()} allUsers={this.state.allUsers} loadAPI= {true} logout={this.logout.bind(this)} userInGroup={this.state.userInGroup}/>)} 
      else { 
        return (<SwiperNoSwiping groupCode= {this.state.GroupCodeInp} allUsers={this.state.allUsers} userInGroup={this.state.userInGroup} loadAPI= {false} logout={this.logout.bind(this) }/>)
      }
    }
    }

  
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
