import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import { Row, Col, CustomInput, Collapse, Button, Form, FormGroup,CardBody, Card, Input} from 'reactstrap';

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
            price: "Price $",
            collapse: false,
            afghani: false,
            african: false,
            newamerican: false,
            caribbean: false,
            chinese: false,
            japanese: false,
            italian: false,
            indpak: false,
            korean: false,
            mexian: false,
            asianfusion: false,
            pizza: false,
            bbq: false,
            vegetarian: false,
            gluten_free: false,
            delis: false,
            diners: false,
            burgers: false,
            salad: false,
            wraps: false,
            noodles: false,
            hotpot: false,
        }
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    onSubmit(){ 
        
        this.firebasePref()
        const request = require('request');
        request({
          url: 'https://squad-up-gmaps.herokuapp.com/yelp/location/?groupCode='+this.props.groupCode+"&username="+this.props.userInGroup+'&location=Claremont&bakery='+this.state.bakery+'&restaurant='+this.state.restaurants+"&cafe="+this.state.cafe
          }, function(err, res, body) {
          if (err) {
            console.error(err);
          }})
          this.props.doneWithPref()

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

    afghanChecked(){
        this.setState({
            afghani: !this.state.afghani
        })
    }

    africanChecked(){
        this.setState({
            african: !this.state.african
        })
    }
    
    newamericanChecked(){
        this.setState({
            newamerican: !this.state.newamerican
        })
    }

    caribbeanChecked(){
        this.setState({
            caribbean: !this.state.caribbean
        })
    }

    chineseChecked(){
        this.setState({
            chinese: !this.state.chinese
        })
    }

    japaneseChecked(){
        this.setState({
            japanese: !this.state.japanese
        })
    }

    italianChecked(){
        this.setState({
            italian: !this.state.italian
        })
    }

    indpakChecked(){
        this.setState({
            indpak: !this.state.indpak
        })
    }

    koreanChecked(){
        this.setState({
            korean: !this.state.korean
        })
    }

    mexicanChecked(){
        this.setState({
            mexican: !this.state.mexican
        })
    }

    asianfusionChecked(){
        this.setState({
            asianfusion: !this.state.asianfusion
        })
    }

    pizzaChecked(){
        this.setState({
            pizza: !this.state.pizza
        })
    }

    bbqChecked(){
        this.setState({
            bbq: !this.state.bbq
        })
    }

    vegetarianChecked(){
        this.setState({
            vegetarian: !this.state.vegetarian
        })
    }

    glutenfreeChecked(){
        this.setState({
            gluten_free: !this.state.gluten_free
        })
    }

    delisChecked(){
        this.setState({
            delis: !this.state.delis
        })
    }

    dinersChecked(){
        this.setState({
            diners: !this.state.diners
        })
    }

    burgersChecked(){
        this.setState({
            burgers: !this.state.burgers
        })
    }

    saladChecked(){
        this.setState({
            salad: !this.state.salad
        })
    }

    wrapsChecked(){
        this.setState({
            wraps: !this.state.wraps
        })
    }

    noodlesChecked(){
        this.setState({
            noodles: !this.state.noodles
        })
    }

    hotpotChecked(){
        this.setState({
            hotpot: !this.state.hotpot
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
        const ResultsRef = firebase.database().ref(this.props.groupCode).child("users")
        const branch = {
            restaurant: this.state.restaurants,
            bakery : this.state.bakery,
            cafe: this.state.cafe,
            price: this.state.price,
            afghani: this.state.afghani,
            african: this.state.african,
            newamerican: this.state.newamerican,
            caribbean: this.state.caribbean,
            chinese: this.state.chinese,
            japanese: this.state.japanese,
            italian: this.state.italian,
            indpak: this.state.indpak,
            korean: this.state.korean,
            mexian: this.state.mexian,
            asianfusion: this.state.asianfusion,
            pizza: this.state.pizza,
            bbq: this.state.bbq,
            vegetarian: this.state.vegetarian,
            gluten_free: this.state.gluten_free,
            delis: this.state.delis,
            diners: this.state.diners,
            burgers: this.state.burgers,
            salad: this.state.salad,
            wraps: this.state.wraps,
            noodles: this.state.noodles,
            hotpot: this.state.hotpot,

        }
        ResultsRef.child(this.props.userInGroup).child("Preferences").set(branch)
        console.log("hello hello",this.props.groupCode)
    }
    render(){
        return (
            <div className="App-background">
                <img src={logo} className="App-logo2" alt="logo" />
                <div style={loginStyles}>
                    <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                    <h4> Select Preferences </h4>
                     <div>
                     <Form>
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
                        <Button color="primary" onClick={this.toggle} style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" >View All Filters</Button>
                        <Collapse isOpen={this.state.collapse}>
                        <Card style={{borderColor:"white"}} >
                            <CardBody>
                            <FormGroup>
                            <div>
                            <Row>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" onclick={this.afghanChecked.bind(this)} id="exampleCustomCheckbox" label="Afghan" />
                                <CustomInput type="checkbox" onclick={this.africanChecked.bind(this)} id="exampleCustomCheckbox2" label="African" />
                                <CustomInput type="checkbox" onclick={this.newamericanChecked.bind(this)} id="exampleCustomCheckbox3" label="American" />
                                <CustomInput type="checkbox" onclick={this.caribbeanChecked.bind(this)} id="exampleCustomCheckbox4" label="Caribbean" />
                                <CustomInput type="checkbox" onclick={this.chineseChecked.bind(this)} id="exampleCustomCheckbox5" label="Chinese" />
                                <CustomInput type="checkbox" onclick={this.japaneseChecked.bind(this)} id="exampleCustomCheckbox6" label="Japanese" />
                                <CustomInput type="checkbox" onclick={this.italianChecked.bind(this)} id="exampleCustomCheckbox7" label="Italian" />
                                <CustomInput type="checkbox" onclick={this.indpakChecked.bind(this)} id="exampleCustomCheckbox8" label="Indian" />
                                <CustomInput type="checkbox" onclick={this.koreanChecked.bind(this)} id="exampleCustomCheckbox9" label="Korean" />
                                <CustomInput type="checkbox" onclick={this.mexicanChecked.bind(this)} id="exampleCustomCheckbox10" label="Mexican" />
                                <CustomInput type="checkbox" onclick={this.asianfusionChecked.bind(this)} id="exampleCustomCheckbox11" label="Asian Fusion" />  </Col>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" onclick={this.pizzaChecked.bind(this)} id="exampleCustomCheckbox22" label="Pizza" />
                                <CustomInput type="checkbox" onclick={this.bbqChecked.bind(this)} id="exampleCustomCheckbox12" label="Barbeque" />
                                <CustomInput type="checkbox" onclick={this.vegetarianChecked.bind(this)} id="exampleCustomCheckbox13" label="Vegetarian" />
                                <CustomInput type="checkbox" onclick={this.glutenfreeChecked.bind(this)} id="exampleCustomCheckbox14" label="Gluten-Free" />
                                <CustomInput type="checkbox" onclick={this.delisChecked.bind(this)} id="exampleCustomCheckbox15" label="Delis" />
                                <CustomInput type="checkbox" onclick={this.dinersChecked.bind(this)} id="exampleCustomCheckbox16" label="Diners" />
                                <CustomInput type="checkbox" onclick={this.burgersChecked.bind(this)} id="exampleCustomCheckbox17" label="Burgers" />
                                <CustomInput type="checkbox" onclick={this.saladChecked.bind(this)} id="exampleCustomCheckbox18" label="Salad" />
                                <CustomInput type="checkbox" onclick={this.wrapsChecked.bind(this)} id="exampleCustomCheckbox19" label="Wraps" /> 
                                <CustomInput type="checkbox" onclick={this.noodlesChecked.bind(this)} id="exampleCustomCheckbox20" label="Noodles" />
                                <CustomInput type="checkbox" onclick={this.hotpotChecked.bind(this)} id="exampleCustomCheckbox21" label="Hot Pot" /></Col>
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