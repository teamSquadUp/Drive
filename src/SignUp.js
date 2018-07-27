import React, { Component } from 'react';
import firebase from 'firebase'
import {Link} from 'react-router'
import squaduplogo from './images/squadlogo.png';

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
         login:null
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
        }
        else{
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

  render() {
     return (
        <div style={loginStyles}> 
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>

    <form>
        <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Enter Email" />
        <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Create Password" />
        <input style={{width: "98%"}} type="password" id= "password2" name="password2" placeholder="Verify Password" />
        <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.signup} block> Create Account</button>
        <Link to = {"/App"} style={{color:"#0077B5", borderColor:"#0077B5", backgroundColor:"white", float:"left", margin:"3%"}}> Back </Link>
    </form>
    </div>
    </div>
            );
  }
}

   export default SignUp;
  