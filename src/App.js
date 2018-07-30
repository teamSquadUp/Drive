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
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Google from './images/googlefront.jpg';
import squaduplogo from './images/squadlogo.png';
import AlertDialogSlide from './message';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

// page styling
const loginStyles = {
  width: "100%",
  maxWidth: "470px",
  margin: "20px auto",
  borderRadius: "5%",
  padding: "5%",
  background: "white",
  color: "black",
  boxshadow: "10px 10px gray",
  borderColor: "#0077B5",
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
// three tabs styling
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

// theme styling
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
      allUsers:[],
      participatelogin:false,
      groupCodeDoesnotExit: false,
      noGroupCode: false,
      noUser:false,
      userDuplicated: false,
      open: false
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

  handleCloseNoUser = () => {
    this.setState({ noUser: false });
    document.location.reload();
  };

  handleCloseNoGC = () => {
    this.setState({ noGroupCode: false });
    document.location.reload();
  };

  handleCloseUserDuplicated = () => {
    this.setState({ userDuplicated: false });
    document.location.reload();
  };

  handleCloseGCNotExist = () => {
    this.setState({ groupCodeDoesnotExit: false });
    document.location.reload();

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
    //check if the groupcode is valid
    var ref = firebase.database().ref()
    var groupcodehere = currentComponent.state.GroupCodeInp
    var userHere = currentComponent.state.userInGroup
    if(!groupcodehere){
      // alert("invalid entry")
      currentComponent.setState({noGroupCode:true})}
      else if(this.state.participatelogin===false && userHere==="admin"){
        // alert("invalid entry")
        currentComponent.setState({noUser:true})
      }
    else{
    console.log("groupcode hereh is ", groupcodehere)
    console.log("users here is", userHere)
    ref.once("value",function(snapshot){
      console.log("checking child", snapshot.val())
      if (snapshot.hasChild(groupcodehere)){
        console.log("groupcode hereh is ", groupcodehere)
        var output=snapshot.val()
        console.log("output are ",output)
        var userss = output[groupcodehere]["users"]
        var allusers = []
        for(var k in userss) allusers.push(k)
        console.log("allusers are",allusers)
        currentComponent.setState({allUsers:allusers})

        currentComponent.setState({
          submitGC: true
        })
        if(userss[userHere]){
          console.log("has same name",userHere)
          // alert("someone in the group already has this name, please enter another name");
          currentComponent.setState({userDuplicated:true})

        }
      }
      else{
        // alert("this group doesn't exist yet")
        currentComponent.setState({groupCodeDoesnotExit:true})
        // e.preventDefault();
        // document.location.reload();
      }
    })}
  }

  handleSubmitName(e){
    console.log("new user added")
    this.setState({
      submitName: e.target.value,
      participatelogin:true
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
    document.location.reload();
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

    // randomly generates number between 1 and 8 inclusive for the wheel to spin to
  wheelSpin(){
    this.setState({imageclass: 'wheelimage'+ ((Math.floor(Math.random() * (8))) + 1)});
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
        {/* rendering the first tab of the page with the admin  sign in user journey*/}
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
                    <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Email" />
                    <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Password" />
                    
                    <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5"}} type="submit" className="btn btn-primary" value="Log In" onClick={this.login} block> Sign in </button>
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
        {/* rendering the second tab of the page with the group code user journey*/}
        {value === 1 && <TabContainer className="tab">
          
        {/* {this.state.noUser || this.state.noGroupCode || this.state.? */}
           {/*open the dialog if no user name input */}
           <div>
        
           <Dialog
             open={this.state.noUser}
             TransitionComponent={Transition}
             keepMounted
             onClose={this.handleClose}
             aria-labelledby="alert-dialog-slide-title"
             aria-describedby="alert-dialog-slide-description"
           >
             <DialogTitle id="alert-dialog-slide-title">
               {"No name input detected"}
             </DialogTitle>
             <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                 Please enter a valid name to continue
               </DialogContentText>
             </DialogContent>
             <DialogActions>
   
               <Button onClick={this.handleCloseNoUser} color="primary">
                 Okay
               </Button>
             </DialogActions>
           </Dialog>
         </div>

         {/*open the dialog if no group code is detected */}
         <div>
        <Dialog
          open={this.state.noGroupCode}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"No group code detected"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please enter a valid group code to continue
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleCloseNoGC} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>

         {/*open the dialog if group code does not exist */}
       <div>
        <Dialog
          open={this.state.groupCodeDoesnotExit}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Group code does not exist"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please check the groupcode and come back again
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleCloseGCNotExist} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>

           {/*open the dialog if the user is duplicated */}
       <div>
        <Dialog
          open={this.state.userDuplicated}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseUserDuplicated}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Name already exist in group"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please enter another name to continue
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleClose3} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div> 

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
        {/* } */}

        </TabContainer>}

       
       {/* rendering the third tab of the page with the wheel*/}
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
                <button style={{width: "80%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop:"10px"}} className="btn btn-primary" onClick={this.wheelSpin.bind(this)}> Spin </button>
            </div>
        </Card>
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

// applying the styling to the app page
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
