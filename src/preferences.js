import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import { Row, Col, CustomInput, Collapse, Button, Form, FormGroup, Label, CardBody, Card, Input, FormText } from 'reactstrap';
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
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state= { //parameters in the nearby search request
            restaurants: false,
            bakery : false,
            cafe: false,
            price: "Price $10 - $20",
            rating: false,
            opennow: false,
            radius: null,
            collapse: false,
        }
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    onSubmit(){ 
        this.props.doneWithPref()
        this.firebasePref()
    }

    restaurantChecked(){
        this.setState({
            restaurants: !this.state.restaurants
        })
    }
    bakeryChecked(){
        this.setState({
            bakery: !this.state.bakery
        }) 
    }   
    cafeChecked(){
        this.setState({
            cafe: !this.state.cafe
        })
    }
    openChecked(){
        this.setState({
            opennow: true
        })
    }
    ratingChecked(){
        this.setState({
            rating: true
        })
    }
    handleChangePrice(event){
        this.setState({price: event.target.value
    })
    }
    handleChangeRadius(event){
        this.setState({radius: event.target.value})
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
<<<<<<< HEAD
                        {this.state.restaurants?
                        <Button style={{width: "39%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginRight: "2%", marginLeft:"2%" }} > Restaurants </Button>
                        :
                        <Button style={{marginRight: "2%", marginLeft:"2%", width: "39%"}} outline color="info" onClick={this.restaurantChecked.bind(this)} > Restaurants </Button> 
                        }                    
                        {this.state.bakery?     
                        <Button style={{width: "39%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginRight: "2%", marginLeft:"2%" }} > Bakery </Button>
                        :
                        <Button id="btn2" style={{marginRight: "2%", marginLeft:"2%", width: "25%"}} outline color="info" onClick={this.bakeryChecked.bind(this)} > Bakery </Button>
                        }
                        {this.state.cafe?
                        <Button style={{width: "39%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginRight: "2%", marginLeft:"2%" }} > Cafe </Button>
                        :
                        <Button id="btn3" style={{marginRight: "2%", marginLeft:"2%", width: "21%"}} outline color="info" onClick={this.cafeChecked.bind(this)}> Cafe  </Button>
                        }
                        {this.state.rating?
                        <Button style={{width: "39%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginRight: "2%", marginLeft:"2%" }} > Sort by Rating </Button>
                        :
                        <Button id="btn4" style={{marginRight: "2%", marginLeft:"2%", width: "50%"}} outline color="info" onClick={this.ratingChecked.bind(this)}>Sort by Rating</Button>
                        }
                        {this.state.opennow?
                        <Button style={{width: "39%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginRight: "2%", marginLeft:"2%" }} > Open Now </Button>
                        :
                        <Button id="btn5" style={{marginRight: "2%", marginLeft:"2%",  width: "40%"}} outline color="info" onClick={this.openChecked.bind(this)}>Open Now</Button>
                        }
                    <Form>
=======

                     <div>
                     <Form>
>>>>>>> b5fdc0ffc5e99e4d050b60ca839a695abde9359e
                        <FormGroup>      
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect" price={this.state.value} onChange={this.handleChangePrice.bind(this)}>
                                    <option>Price $ </option>
                                    <option>Price $$ </option>
                                    <option>Price $$$ </option>
                                    <option>Price $$$$ </option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Input type="select" name="select" id="exampleSelect" radius={this.state.value} onChange={this.handleChangeRadius.bind(this)}>
                                    <option>Distance 0 - 1 miles</option>
                                    <option>Distance 1 - 3 miles</option>
                                    <option>Distance 3 - 5 miles</option>
                                    <option>Distance 5 - 10 miles</option>
                                </Input>
                            </FormGroup>
                        </FormGroup> 
                    </Form>
                        <Button color="primary" onClick={this.toggle} style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" >All Filters</Button>
                        <Collapse isOpen={this.state.collapse}>
                        <Card style={{borderColor:"white"}} >
                            <CardBody>
                            <FormGroup>
                            <div>
                            <Row>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Afghan" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="African" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="American" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Caribbean" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Chinese" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Japanese" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox7" label="Italian" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox8" label="Indian" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox9" label="Korean" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox10" label="Mexican" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox11" label="Asian Fusion" />  </Col>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Pizza" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox12" label="Barbeque" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox13" label="Vegetarian" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox14" label="Gluten-Free" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox15" label="Delis" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox16" label="Dinners" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox17" label="Burgers" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox18" label="Salad" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox19" label="Wraps" /> 
                                <CustomInput type="checkbox" id="exampleCustomCheckbox20" label="Noodles" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox21" label="Hot Pot" /></Col>
                            </Row>
                                





                            </div>
                            </FormGroup>
                            {this.state.restaurants?
                        <Button style={{width: "39%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginRight: "2%", marginLeft:"2%" }} > Restaurants </Button>
                        :
                        <Button style={{marginRight: "2%", marginLeft:"2%", width: "39%"}} outline color="info" onClick={this.restaurantChecked.bind(this)} > Restaurants </Button> 
                        }                    
                        {this.state.bakery?     
                        <Button style={{width: "25%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginRight: "2%", marginLeft:"2%" }} > Bakery </Button>
                        :
                        <Button id="btn2" style={{marginRight: "2%", marginLeft:"2%", width: "25%"}} outline color="info" onClick={this.bakeryChecked.bind(this)} > Bakery </Button>
                        }
                        {this.state.cafe?
                        <Button style={{width: "21%", backgroundColor:"#406fa5", borderColor:"#406fa5", marginRight: "2%", marginLeft:"2%" }} > Cafe </Button>
                        :
                        <Button id="btn3" style={{marginRight: "2%", marginLeft:"2%", width: "21%"}} outline color="info" onClick={this.cafeChecked.bind(this)}> Cafe  </Button>
                        }
                            </CardBody>
                        </Card>
                        </Collapse>
                    </div>
                

                
                        
                    <Button style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.onSubmit.bind(this)}>Submit</Button>
                    </div>
            </div>
        </div>
        )} 
}

export default Preferences