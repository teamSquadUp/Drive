import React, { Component } from 'react';
import firebase from 'firebase'
import SwiperNoSwiping from './SwiperNoSwiping'
import {Link} from 'react-router'


class SignUp extends Component {
   constructor(props) {
     super(props);
     this.state = {
         login:null
     }
  
     this.signup = this.signup.bind(this);
     this.goback = this.goback.bind(this);
   }

   signup(){
       var email = document.getElementById("email").value;
       var password = document.getElementById("password").value;
       this.state.login = true
       firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user){
            var user = firebase.auth().currentUser;
            this.setState({
                user
            })
            .catch(() => {
                console.log("invalid email")
            }
        );
        });
    
        // else if (document.getElementById("password") != document.getElementById("password2")){
        //     alert("Please put in the same password!")
        //     document.location.reload();
        // }
    }

    goback(){
        <Link to = "/">Back </Link>
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
    //if(this.state.user ===null){

    return (
    <form>
        <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Email" />
        <input style={{width: "98%"}} type="password" id= "password" name="password" placeholder="Password" />
        <input style={{width: "98%"}} type="password" id= "password2" name="password2" placeholder="Password" />
        <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" data-tip= "Enter a username and password to create an account!" data-for= "signup" onClick={this.signup} block> Create Account</button>
        {/* <button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" data-tip= "Enter a username and password to create an account!" data-for= "signup" onClick={this.goback} block> Back</button> */}
        <Link to = "/">Back </Link>

    </form>
    );
    if(this.state.login === true){
        return (<SwiperNoSwiping groupCode = {this.state.groupCodeInp} userInGroup = {this.state.userInGroup} loadAPI={false} logout={this.logout.bind(this)} />)
    
    }
  }
}

   export default SignUp;
  