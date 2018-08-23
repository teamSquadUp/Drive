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


  const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
  });
  
  const INITIAL_STATE = {
    email: '',
    error: null,
  };
  
class Reset extends Component {
   constructor(props) {
     super(props);
     this.state = {
         email: '',
         error: null,
     };
   

     const onSubmit = (event) => {
        const { email } = this.state;
    
        firebase.auth().doPasswordReset(email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });
    
        event.preventDefault();
      }

   }


  resetEmail(){
    var actionCodeSettings = {
        url: 'https://www.example.com/?email=user@example.com',
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        handleCodeInApp: true
      };

    firebase.auth().sendPasswordResetEmail(
        'user@example.com', actionCodeSettings)
        .then(function() {
          // Password reset email sent.
        })
        .catch(function(error) {
          // Error occurred. Inspect error.code.
        });
  }

  render() {
    const {
        email,
        error,
      } = this.state;

      const isInvalid = email === '';

     return (
        <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    //     <div style={loginStyles}> 
    //     <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
    //     <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
    // {/*sign up form to create a new account*/}
    // <form>
    //     Let's find your account. Please enter your email.
    //     <input style={{width: "98%"}} type="text" id= "email" name="email" placeholder="Email" />
    //     <button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.resetEmail} block> Find account </button>
    //     <Link to = {"/App"} style={{color:"#0077B5", borderColor:"#0077B5", backgroundColor:"white", float:"left", margin:"3%"}}> Back </Link>
    // </form>
    // </div>
    // </div>
            );
  }
}

   export default Reset;
  