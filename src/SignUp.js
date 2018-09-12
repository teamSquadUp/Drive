import React, { Component } from 'react';
import firebase from 'firebase'
import {Link} from 'react-router'
import squaduplogo from './images/squadlogo.png';
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
    maxWidth: "500px",
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
  
class SignUp extends Component {
   constructor(props) {
     super(props);
     this.state = {
         login:null,
         succes: false,
         passwordNotMatch:false,
         goBack: false
     }
  
     this.signup = this.signup.bind(this);
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
        alert("Account created successfully. Go back to login!");
        this.setState({succes:true})    
    }
        else{
            this.setState({passwordNotMatch:true})
            alert("Please ensure both passwords match.")
        }
    }

  logout(){
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
  }

  handleCloseDialog = () => {

    // document.location.reload();
  };
  handleCloseDialogGoback = () => {
    this.setState({
        goBack: true
    })
  };
  render() {
     return (
        <div style={loginStyles}> 
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
    {/*sign up form to create a new account*/}
    <form>
        <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Enter Email" />
        <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Create Password" />
        <input style={{width: "98%"}} type="password" id= "password2" name="password2" placeholder="Verify Password" />
        <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.signup} block> Create Account</button>
        <Link to = {"/App"} style={{color:"#0077B5", borderColor:"#0077B5", backgroundColor:"white", float:"left", margin:"3%"}}> Back </Link>
    </form>
    </div>
              {/*open the dialog if account is created */}
              <div>
        <Dialog
          open={this.state.succes}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseUser}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Account created successfully."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
             Go back to login!
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleCloseDialog} color="primary">
              Go
            </Button>
          </DialogActions>
        </Dialog>
      </div> 

       {/*open the dialog if the password doesn't match */}
       <div>
        <Dialog
          open={this.state.passwordNotMatch}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseUser}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"An error occurs"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Please ensure both passwords match.
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleCloseDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div> 

    </div>
    
            );
  }
}

   export default SignUp;
  