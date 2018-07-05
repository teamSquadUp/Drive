import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import squad from './images/squad.png';
import {API} from './api'
import firebase from 'firebase'

const loginStyles = {
    width: "90%",
    maxWidth: "400px",
    margin: "20px auto",
    borderRadius: "5px",
    padding: "20px",
    background: "white",
    color: "black",
    boxshadow: "10px 10px gray",
}

export class Preferences extends React.Component {
    constructor(props) { 
        super(props) 
        this.state= { //parameters in the nearby search request
            restaurants: false,
            bakery : false,
            cafe: false,
            price: null,
            rating: 0,
            opennow: false,
            radius: null,

        }
    }
    
    onSubmit(){ 
        this.props.doneWithPref()
        this.firebasePref()
    }

    restaurantChecked(){
        this.setState({
            restaurants: true
        })
    }
    bakeryChecked(){
        this.setState({
            bakery: true
        }) 
    }   
    cafeChecked(){
        this.setState({
            cafe: true
        })
    }
    openChecked(){
        this.setState({
            opennow: true
        })
    }
    firebasePref(){
        const ResultsRef = firebase.database().ref(this.props.groupCode).child("Preferences")
        const branch = {
            restaurant: this.state.restaurants,
            bakery : this.state.bakery,
            cafe: this.state.cafe,
            price: this.state.price,
            rating: this.state.rating,
            opennow: this.state.opennow,
            radius: this.state.radius,

        }
        ResultsRef.set(branch)
        console.log("hello hello",this.props.groupCode)
    }
    render(){
        return (
            <div className="App-background">
                <img src={logo} className="App-logo2" alt="logo" />
                <div style={loginStyles}>
                    <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                    <h4> Select Preferences </h4>
                    &nbsp;
                    <div> <Button id="btn1" style={{marginRight: "2%", marginLeft:"2%", width: "39%"}} outline color="info" onClick={this.restaurantChecked.bind(this)} > Restaurants </Button>{' '}
                    <Button id="btn2" style={{marginRight: "2%", marginLeft:"2%", width: "25%"}} outline color="info" onClick={this.bakeryChecked.bind(this)} > Bakery </Button>{' '}
                    <Button id="btn3" style={{marginRight: "2%", marginLeft:"2%", width: "21%"}} outline color="info" onClick={this.cafeChecked.bind(this)}> Cafe  </Button>{' '}
                    </div> &nbsp;
                    <div> <Button id="btn4" style={{marginRight: "2%", marginLeft:"2%", width: "50%"}} outline color="info">Sort by Rating</Button>{' '}
                    <Button id="btn5" style={{marginRight: "2%", marginLeft:"2%",  width: "40%"}} outline color="info" onClick={this.openChecked.bind(this)}>Open Now</Button>{' '}
                    </div>&nbsp;

                    <Form>
                        <FormGroup>      
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Price $10 - $20</option>
                                    <option>Price $20 - $30</option>
                                    <option>Price $30 - $40</option>
                                    <option>Price $40 - $50</option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Distance 0 - 1 miles</option>
                                    <option>Distance 1 - 3 miles</option>
                                    <option>Distance 3 - 5 miles</option>
                                    <option>Distance 5 - 10 miles</option>
                                </Input>
                            </FormGroup>
                        </FormGroup> 
                    </Form>
                    <Button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.onSubmit.bind(this)}>Submit</Button>
                    &nbsp;
                    <h4> OR </h4>
                    <p> if you are neutral just go by </p>
                    <Button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary"> <img src={squad}/>   Squad Opinion </Button>
                    </div>
                </div>
        </div>
        )} 
}

export default Preferences