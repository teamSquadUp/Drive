import React, { Component } from 'react';
import firebase from 'firebase'
import {Link} from 'react-router'
import squaduplogo from './images/squadlogo.png';
import AlertDialogSlide from './message';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import  App  from './App.js';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

// page styling
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
  
class SignUp extends Component {
   constructor(props) {
     super(props);
     this.state = {
         login:null,
         accountCreated:false,
         goBack:false,
         passwordWrong:false,

     }
  
     this.signup = this.signup.bind(this);
   }
   handleCloseAccountCreated= () => {
       console.log("clicked??")
       this.setState({
           accountCreated:false,
           goBack:true})

   }
   signup(){
       var email = document.getElementById("email").value;
       var password = document.getElementById("password").value;
       var password2 = document.getElementById("password2").value;

       if(password===password2){
       firebase.auth().createUserWithEmailAndPassword(email, password)       
        .then(function(user){
            user = firebase.auth().currentUser;
            this.setState({
                user
            })
            .catch(() => {
                console.log("invalid email")
            }
        );
        });
       
        this.setState({accountCreated:true,
            });
        }
        else{
            // alert("Please ensure both passwords match.")
            this.setState({passwordWrong:true})

        }
    }

//   logout(){
//     firebase.auth().signOut()
//     .then(() => {
//       this.setState({
//         user:null
//       });
//     });
//   }

  render() {
      if(!this.state.goBack){
     return (
         
         <div>
      

        <div style={loginStyles}> 
            <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
                    {/*sign up form to create a new account*/}
            </div>   
        </div>

    <form>
        <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Enter Email" />
        <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Create Password" />
        <input style={{width: "98%"}} type="password" id= "password2" name="password2" placeholder="Verify Password" />
        <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.signup} block> Create Account</button>
        {/* <Link to = {"/App"} style={{color:"#0077B5", borderColor:"#0077B5", backgroundColor:"white", float:"left", margin:"3%"}}> Back </Link> */}
    </form>
     {/*open the dialog if account created successfully */}
      <div>
        <Dialog
        open={this.state.accountCreated}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseAccountCreated}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {"Account created successfully"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Go back to login
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCloseAccountCreated} color="primary">
                Okay
                </Button>
            </DialogActions>
        </Dialog>
        </div>

       {/*open the dialog if account create fail*/} 
        <div>
        <Dialog
        open={this.state.passwordWrong}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseAccountCreated}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {"Password doen't match"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                please enter your passwords again
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCloseAccountCreated} color="primary">
                Okay
                </Button>
            </DialogActions>
        </Dialog>
        </div>

    </div>
    );
  }else{
      return( <App/>)
}
  }
}

   export default SignUp;