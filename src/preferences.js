import React from 'react'
import "./css/api.css"
import logo from './images/logo.png';
import { Row, Col, CustomInput, Collapse, Button, Form, FormGroup,CardBody, Card, Input} from 'reactstrap';

import firebase from 'firebase'
import DoughnutExample from './doughnut'

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
        this.toggle2 = this.toggle2.bind(this);
        this.state= { //parameters in the nearby search request
            radius: "Distance 0 - 1 mile",
            restaurants: false,
            bakery : false,
            cafe: false,
            price: "Price $",
            collapse: false,
            collapse2: false,
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
            prefStats:{}
        }
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    toggle2() {
        this.setState({ collapse2: !this.state.collapse2 });
    }

    onSubmit(){ 
        
        this.firebasePref()
        const request = require('request');
        request({
          url: 'https://squad-up-gmaps.herokuapp.com/yelp/location/?groupCode='+this.props.groupCode+"&username="+this.props.userInGroup
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
        console.log(this.state.prefStats)
        this.setState({
            bakery: !this.state.bakery
        }) 
        if(this.state.prefStats.hasOwnProperty('bakery')){ 
            var count= this.state.prefStats.bakery
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.bakery){
            prefStats.bakery= 1+ count} 
            else {
                prefStats.bakery= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.bakery){
            prefStats.bakery= 1}
            this.setState({prefStats})
        }
        }
    
    cafeChecked(){
        this.setState({
            cafe: !this.state.cafe
        })
        if(this.state.prefStats.hasOwnProperty('cafe')){ 
            var count= this.state.prefStats.cafe
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.cafe){
            prefStats.cafe= 1+ count} 
            else {
                prefStats.cafe= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.cafe){
            prefStats.cafe= 1}
            this.setState({prefStats})
        }
    }

    afghanChecked(){
        this.setState({
            afghani: !this.state.afghani
        })
        if(this.state.prefStats.hasOwnProperty('afghani')){ 
            console.log("exists")
            var count= this.state.prefStats.afghani
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.afghani){
            prefStats.afghani= 1+ count} 
            else {
                console.log("subtract 1")

                prefStats.afghani= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            console.log("does not exists")

            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.afghani){
            prefStats.afghani= 1}
            this.setState({prefStats})
        }
        }
    

    africanChecked(){
        this.setState({
            african: !this.state.african
        })
        if(this.state.prefStats.hasOwnProperty('african')){ 
            var count= this.state.prefStats.african
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.african){
            prefStats.african= 1+ count} 
            else {
                prefStats.african= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.african){
            prefStats.african= 1}
            this.setState({prefStats})
        }
    }
    
    newamericanChecked(){
        this.setState({
            newamerican: !this.state.newamerican
        })
        if(this.state.prefStats.hasOwnProperty('newamerican')){ 
            var count= this.state.prefStats.newamerican
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.newamerican){
            prefStats.newamerican= 1+ count} 
            else {
                prefStats.newamerican= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.newamerican){
            prefStats.newamerican= 1}
            this.setState({prefStats})
        }
    }

    caribbeanChecked(){
        this.setState({
            caribbean: !this.state.caribbean
        })
        if(this.state.prefStats.hasOwnProperty('caribbean')){ 
            var count= this.state.prefStats.caribbean
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.caribbean){
            prefStats.caribbean= 1+ count} 
            else {
                prefStats.caribbean= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.caribbean){
            prefStats.caribbean= 1}
            this.setState({prefStats})
        }
    }

    chineseChecked(){
        this.setState({
            chinese: !this.state.chinese
        })
        if(this.state.prefStats.hasOwnProperty('chinese')){ 
            var count= this.state.prefStats.chinese
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.chinese){
            prefStats.chinese= 1+ count} 
            else {
                prefStats.chinese= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.chinese){
            prefStats.chinese= 1}
            this.setState({prefStats})
        }
    }

    japaneseChecked(){
        this.setState({
            japanese: !this.state.japanese
        })
        if(this.state.prefStats.hasOwnProperty('japanese')){ 
            var count= this.state.prefStats.japanese
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.japanese){
            prefStats.japanese= 1+ count} 
            else {
                prefStats.japanese= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.japanese){
            prefStats.japanese= 1}
            this.setState({prefStats})
        }
    }

    italianChecked(){
        this.setState({
            italian: !this.state.italian
        })
        if(this.state.prefStats.hasOwnProperty('italian')){ 
            var count= this.state.prefStats.italian
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.italian){
            prefStats.italian= 1+ count} 
            else {
                prefStats.italian= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.italian){
            prefStats.italian= 1}
            this.setState({prefStats})
        }
    }

    indpakChecked(){
        this.setState({
            indpak: !this.state.indpak
        })
        if(this.state.prefStats.hasOwnProperty('indpak')){ 
            var count= this.state.prefStats.indpak
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.indpak){
            prefStats.indpak= 1+ count} 
            else {
                prefStats.indpak= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.indpak){
            prefStats.indpak= 1}
            this.setState({prefStats})
        }
    }

    koreanChecked(){
        this.setState({
            korean: !this.state.korean
        })
        if(this.state.prefStats.hasOwnProperty('korean')){ 
            var count= this.state.prefStats.korean
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.korean){
            prefStats.korean= 1+ count} 
            else {
                prefStats.korean= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.korean){
            prefStats.korean= 1}
            this.setState({prefStats})
        }
    }

    mexicanChecked(){
        this.setState({
            mexican: !this.state.mexican
        })
        if(this.state.prefStats.hasOwnProperty('mexican')){ 
            var count= this.state.prefStats.mexican
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.mexican){
            prefStats.mexican= 1+ count} 
            else {
                prefStats.mexican= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.mexican){
            prefStats.mexican= 1}
            this.setState({prefStats})
        }
    }

    asianfusionChecked(){
        this.setState({
            asianfusion: !this.state.asianfusion
        })
        if(this.state.prefStats.hasOwnProperty('asianfusion')){ 
            var count= this.state.prefStats.asianfusion
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.asianfusion){
            prefStats.asianfusion= 1+ count} 
            else {
                prefStats.asianfusion= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.asianfusion){
            prefStats.asianfusion= 1}
            this.setState({prefStats})
        }
    }

    pizzaChecked(){
        this.setState({
            pizza: !this.state.pizza
        })
        if(this.state.prefStats.hasOwnProperty('pizza')){ 
            var count= this.state.prefStats.pizza
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.pizza){
            prefStats.pizza= 1+ count} 
            else {
                prefStats.pizza= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.pizza){
            prefStats.pizza= 1}
            this.setState({prefStats})
        }
    }

    bbqChecked(){
        this.setState({
            bbq: !this.state.bbq
        })
        if(this.state.prefStats.hasOwnProperty('bbq')){ 
            var count= this.state.prefStats.bbq
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.bbq){
            prefStats.bbq= 1+ count} 
            else {
                prefStats.bbq= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.bbq){
            prefStats.bbq= 1}
            this.setState({prefStats})
        }
    }

    vegetarianChecked(){
        this.setState({
            vegetarian: !this.state.vegetarian
        })
        if(this.state.prefStats.hasOwnProperty('vegetarian')){ 
            var count= this.state.prefStats.vegetarian
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.vegetarian){
            prefStats.vegetarian= 1+ count} 
            else {
                prefStats.vegetarian= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.vegetarian){
            prefStats.vegetarian= 1}
            this.setState({prefStats})
        }
    }

    glutenfreeChecked(){
        this.setState({
            gluten_free: !this.state.gluten_free
        })
        if(this.state.prefStats.hasOwnProperty('gluten_free')){ 
            var count= this.state.prefStats.gluten_free
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.gluten_free){
            prefStats.gluten_free= 1+ count} 
            else {
                prefStats.gluten_free= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.gluten_free){
            prefStats.gluten_free= 1}
            this.setState({prefStats})
        }
    }

    delisChecked(){
        this.setState({
            delis: !this.state.delis
        })
        if(this.state.prefStats.hasOwnProperty('delis')){ 
            var count= this.state.prefStats.delis
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.delis){
            prefStats.delis= 1+ count} 
            else {
                prefStats.delis= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.delis){
            prefStats.delis= 1}
            this.setState({prefStats})
        }
    }

    dinersChecked(){
        this.setState({
            diners: !this.state.diners
        })
        if(this.state.prefStats.hasOwnProperty('diners')){ 
            var count= this.state.prefStats.diners
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.diners){
            prefStats.diners= 1+ count} 
            else {
                prefStats.diners= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.diners){
            prefStats.diners= 1}
            this.setState({prefStats})
        }
    }

    burgersChecked(){
        this.setState({
            burgers: !this.state.burgers
        })
        if(this.state.prefStats.hasOwnProperty('burgers')){ 
            var count= this.state.prefStats.burgers
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.burgers){
            prefStats.burgers= 1+ count} 
            else {
                prefStats.burgers= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.burgers){
            prefStats.burgers= 1}
            this.setState({prefStats})
        }
    }

    saladChecked(){
        this.setState({
            salad: !this.state.salad
        })
        if(this.state.prefStats.hasOwnProperty('salad')){ 
            var count= this.state.prefStats.salad
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.salad){
            prefStats.salad= 1+ count} 
            else {
                prefStats.salad= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.salad){
            prefStats.salad= 1}
            this.setState({prefStats})
        }
    }

    wrapsChecked(){
        this.setState({
            wraps: !this.state.wraps
        })
        if(this.state.prefStats.hasOwnProperty('wraps')){ 
            var count= this.state.prefStats.wraps
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.wraps){
            prefStats.wraps= 1+ count} 
            else {
                prefStats.wraps= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.wraps){
            prefStats.wraps= 1}
            this.setState({prefStats})
        }
    }

    noodlesChecked(){
        this.setState({
            noodles: !this.state.noodles
        })
        if(this.state.prefStats.hasOwnProperty('noodles')){ 
            var count= this.state.prefStats.noodles
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.noodles){
            prefStats.noodles= 1+ count} 
            else {
                prefStats.noodles= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.noodles){
            prefStats.noodles= 1}
            this.setState({prefStats})
        }
    }

    hotpotChecked(){
        this.setState({
            hotpot: !this.state.hotpot
        })
        if(this.state.prefStats.hasOwnProperty('hotpot')){ 
            var count= this.state.prefStats.hotpot
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.hotpot){
            prefStats.hotpot= 1+ count} 
            else {
                prefStats.hotpot= count-1 
            }
            this.setState({prefStats})
        }
        else{   
            let prefStats= Object.assign({}, this.state.prefStats)
            if(!this.state.hotpot){
            prefStats.hotpot= 1}
            this.setState({prefStats})
        }
    }
    componentDidMount(){
        var currentComponent = this
        var ref=firebase.database().ref(this.props.groupCode)
        ref.on("value",function(snapshot){
            if(snapshot.hasChild("Preferences")){
                var resultStats=snapshot.val().Preferences
                currentComponent.setState({
                    prefStats: resultStats
                })
            }
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
            radius: this.state.radius

        }
        ResultsRef.child(this.props.userInGroup).child("Preferences").set(branch)
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
                                    <option>Distance 0 - 1 mile</option>
                                    <option>Distance 1 - 5 miles</option>
                                    <option>Distance 5 - 10 miles</option>
                                    <option>Distance  10 +  miles</option>
                                </Input>
                            </FormGroup>
                        </FormGroup> 
                    </Form>
                    <Button color="primary" onClick={this.toggle2} style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" >View Group Preferences</Button>
                        <Collapse isOpen={this.state.collapse2}>
                            <Card style={{borderColor:"white"}} >
                                <CardBody>
                                    <DoughnutExample prefStats={this.state.prefStats} />
                                </CardBody>
                            </Card>
                        </Collapse>
                        <Button color="primary" onClick={this.toggle} style={{width: "100%", backgroundColor:"#38abb4", borderColor:"#38abb4", marginTop: "2%"}} type="submit" className="btn btn-primary" >View All Filters</Button>
                        <Collapse isOpen={this.state.collapse}>
                        <Card style={{borderColor:"white"}} >
                            <CardBody>
                            <FormGroup>
                            <div>
                            <Row>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" onChange={this.afghanChecked.bind(this)} id="exampleCustomCheckbox" label="Afghan" />
                                <CustomInput type="checkbox" onChange={this.africanChecked.bind(this)} id="exampleCustomCheckbox2" label="African" />
                                <CustomInput type="checkbox" onChange={this.newamericanChecked.bind(this)} id="exampleCustomCheckbox3" label="American" />
                                <CustomInput type="checkbox" onChange={this.caribbeanChecked.bind(this)} id="exampleCustomCheckbox4" label="Caribbean" />
                                <CustomInput type="checkbox" onChange={this.chineseChecked.bind(this)} id="exampleCustomCheckbox5" label="Chinese" />
                                <CustomInput type="checkbox" onChange={this.japaneseChecked.bind(this)} id="exampleCustomCheckbox6" label="Japanese" />
                                <CustomInput type="checkbox" onChange={this.italianChecked.bind(this)} id="exampleCustomCheckbox7" label="Italian" />
                                <CustomInput type="checkbox" onChange={this.indpakChecked.bind(this)} id="exampleCustomCheckbox8" label="Indian" />
                                <CustomInput type="checkbox" onChange={this.koreanChecked.bind(this)} id="exampleCustomCheckbox9" label="Korean" />
                                <CustomInput type="checkbox" onChange={this.mexicanChecked.bind(this)} id="exampleCustomCheckbox10" label="Mexican" />
                                <CustomInput type="checkbox" onChange={this.asianfusionChecked.bind(this)} id="exampleCustomCheckbox11" label="Asian Fusion" />
                                <CustomInput type="checkbox" onChange={this.bakeryChecked.bind(this)} id="exampleCustomCheckbox23" label="Bakery" />  </Col>
                            <Col className="text-left" xs="6">
                                <CustomInput type="checkbox" onChange={this.pizzaChecked.bind(this)} id="exampleCustomCheckbox22" label="Pizza" />
                                <CustomInput type="checkbox" onChange={this.bbqChecked.bind(this)} id="exampleCustomCheckbox12" label="Barbeque" />
                                <CustomInput type="checkbox" onChange={this.vegetarianChecked.bind(this)} id="exampleCustomCheckbox13" label="Vegetarian" />
                                <CustomInput type="checkbox" onChange={this.glutenfreeChecked.bind(this)} id="exampleCustomCheckbox14" label="Gluten-Free" />
                                <CustomInput type="checkbox" onChange={this.delisChecked.bind(this)} id="exampleCustomCheckbox15" label="Delis" />
                                <CustomInput type="checkbox" onChange={this.dinersChecked.bind(this)} id="exampleCustomCheckbox16" label="Diners" />
                                <CustomInput type="checkbox" onChange={this.burgersChecked.bind(this)} id="exampleCustomCheckbox17" label="Burgers" />
                                <CustomInput type="checkbox" onChange={this.saladChecked.bind(this)} id="exampleCustomCheckbox18" label="Salad" />
                                <CustomInput type="checkbox" onChange={this.wrapsChecked.bind(this)} id="exampleCustomCheckbox19" label="Wraps" /> 
                                <CustomInput type="checkbox" onChange={this.noodlesChecked.bind(this)} id="exampleCustomCheckbox20" label="Noodles" />
                                <CustomInput type="checkbox" onChange={this.hotpotChecked.bind(this)} id="exampleCustomCheckbox21" label="Hot Pot" />
                                <CustomInput type="checkbox" onChange={this.cafeChecked.bind(this)} id="exampleCustomCheckbox24" label="Cafe"/></Col>
                            </Row>
                            </div>
                            </FormGroup>
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