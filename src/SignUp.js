import React, { Component } from 'react';
import firebase from 'firebase'
import {Link} from 'react-router'


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
    <form>
        <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Email" />
        <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Password" />
        <input style={{width: "98%"}} type="password" id= "password2" name="password2" placeholder="Verify Password" />
        <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.signup} block> Create Account</button>
        <Link to = "/">Back </Link>
    </form>
            );
  }
}

   export default SignUp;
  