import React from 'react'
import "./css/api.css"
import { Row, Col, CustomInput, Collapse, Button, Form, FormGroup,CardBody, Card, Input} from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';
import DoughnutExample from './doughnut';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {MailFolderListItems, OtherMailFolderListItems } from './tileData';
import squaduplogo from './images/squadlogowhite.png';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

const loginStyles = {
    width: "100%",
    maxWidth: "500px",
    margin: "20px auto",
    borderRadius: "5%",
    padding: "5%",
    background: "white",
    color: "black",
    boxshadow: "10px 10px gray",
}
var prefString= "restaurants"
export class Preferences extends React.Component {
    constructor(props) { 
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state= { //parameters in the nearby search request
            radius: "Distance 0 - 5 mile",
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
            top: false,
            left: false,
            bottom: false,
            right: false,
            prefStats:{}
        }
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
      
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    toggle2() {
        this.setState({ collapse2: !this.state.collapse2 });
    }
    donotcare= event => {
        if(this.props.userInGroup!=="admin"){
        this.props.DisplayResults()
        this.props.doneWithPref()
        this.onSubmit()}
        
    };
    onSubmit(){ 
        const currentComponent= this
        var results= []
        this.firebasePref()
        const request = require('request');
        request({
          url: 'https://squad-up-gmaps.herokuapp.com/yelp/location/?groupCode='+this.props.groupCode+"&username="+this.props.userInGroup
          }, function(err, res, body) {
          if (err) {
            console.error(err);
          }else{ 
            results= JSON.parse(body)
            console.log(results)
            currentComponent.props.doneWithPref(results)
          }
        })
          console.log("result is: ",results)
          

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
        if(!this.state.bakery){ 
            prefString= prefString+", bakery" 
        }
        else{ 
            prefString= prefString.replace(", bakery", "")
        }
        console.log(prefString)
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
        if(!this.state.cafe){ 
            prefString= prefString+", cafe" 
        }
        else{ 
            prefString= prefString.replace(", cafe", "")
        }
        console.log(prefString)

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
        if(!this.state.afghani){ 
            prefString= prefString+", afghani" 
        }
        else{ 
            prefString= prefString.replace(", afghani", "")
        }
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

        if(!this.state.african){ 
            prefString= prefString+", african" 
        }
        else{ 
            prefString= prefString.replace(", african", "")
        }

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

        if(!this.state.newamerican){ 
            prefString= prefString+", newamerican" 
        }
        else{ 
            prefString= prefString.replace(", newamerican", "")
        }

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

        if(!this.state.caribbean){ 
            prefString= prefString+", caribbean" 
        }
        else{ 
            prefString= prefString.replace(", caribbean", "")
        }

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

        if(!this.state.chinese){ 
            prefString= prefString+", chinese" 
        }
        else{ 
            prefString= prefString.replace(", chinese", "")
        }

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

        if(!this.state.japanese){ 
            prefString= prefString+", japanese" 
        }
        else{ 
            prefString= prefString.replace(", japanese", "")
        }

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

        if(!this.state.italian){ 
            prefString= prefString+", italian" 
        }
        else{ 
            prefString= prefString.replace(", italian", "")
        }

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

        if(!this.state.indpak){ 
            prefString= prefString+", indpak" 
        }
        else{ 
            prefString= prefString.replace(", indpak", "")
        }

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

        if(!this.state.korean){ 
            prefString= prefString+", korean" 
        }
        else{ 
            prefString= prefString.replace(", korean", "")
        }

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

        if(!this.state.mexican){ 
            prefString= prefString+", mexican" 
        }
        else{ 
            prefString= prefString.replace(", mexican", "")
        }

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

        if(!this.state.asianfusion){ 
            prefString= prefString+", asianfusion" 
        }
        else{ 
            prefString= prefString.replace(", asianfusion", "")
        }
        
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

        if(!this.state.pizza){ 
            prefString= prefString+", pizza" 
        }
        else{ 
            prefString= prefString.replace(", pizza", "")
        }

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

        if(!this.state.bbq){ 
            prefString= prefString+", bbq" 
        }
        else{ 
            prefString= prefString.replace(", bbq", "")
        }

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

        if(!this.state.vegetarian){ 
            prefString= prefString+", vegetarian" 
        }
        else{ 
            prefString= prefString.replace(", vegetarian", "")
        }

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

        if(!this.state.gluten_free){ 
            prefString= prefString+", gluten_free" 
        }
        else{ 
            prefString= prefString.replace(", gluten_free", "")
        }

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

        if(!this.state.delis){ 
            prefString= prefString+", delis" 
        }
        else{ 
            prefString= prefString.replace(", delis", "")
        }

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

        if(!this.state.diners){ 
            prefString= prefString+", diners" 
        }
        else{ 
            prefString= prefString.replace(", diners", "")
        }

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

        if(!this.state.burgers){ 
            prefString= prefString+", burgers" 
        }
        else{ 
            prefString= prefString.replace(", burgers", "")
        }

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

        if(!this.state.salad){ 
            prefString= prefString+", salad" 
        }
        else{ 
            prefString= prefString.replace(", salad", "")
        }

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

        if(!this.state.wraps){ 
            prefString= prefString+", wraps" 
        }
        else{ 
            prefString= prefString.replace(", wraps", "")
        }

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


        if(!this.state.noodles){ 
            prefString= prefString+", noodles" 
        }
        else{ 
            prefString= prefString.replace(", noodles", "")
        }

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


        if(!this.state.hotpot){ 
            prefString= prefString+", hotpot" 
        }
        else{ 
            prefString= prefString.replace(", hotpot", "")
        }

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
        if(prefString!="restaurants"){ 
            prefString= prefString.replace("restaurants, ","")
        }
        console.log(prefString)
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
            radius: this.state.radius,
            prefString: prefString
        }
        ResultsRef.child(this.props.userInGroup).child("Preferences").set(branch)
        const request = require('request');
        request({
          url: 'https://squad-up-gmaps.herokuapp.com/updatePrefs/?groupCode='+this.props.groupCode+"&username="+this.props.userInGroup
          }, function(err, res, body) {
          if (err) {
            console.error(err);
          }})
    }
    render(){
        const { classes } = this.props;
        const { open } = this.state;

        const sideList = (
            <div className={classes.list}>
              <List>
              <MailFolderListItems groupCode={this.props.groupCode} userInGroup={this.props.userInGroup} allUsers = {this.props.allUsers} logout={this.props.logout}/>
              </List>
              <Divider />
              <List>
                  <OtherMailFolderListItems logout={this.props.logout} />
                  </List>
            </div>
          );
      
          const fullList = (
            <div className={classes.fullList}>
              <List>
                  <MailFolderListItems logout={this.props.logout} groupCode={this.props.groupCode} userInGroup={this.props.userInGroup} allUsers = {this.props.allUsers}/>
            </List>
              <Divider />
              <List>
                  <OtherMailFolderListItems logout={this.props.logout} />
                  </List>
            </div>
          );

        return (
            <div>
            <AppBar position="static" className="tab" style={{maxHeight:"80px"}}>
          <Toolbar className="tab">
          <IconButton
            aria-haspopup="true"
            onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <img src={squaduplogo} style={{width:"80%", maxWidth:"150px", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>

          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
                    <div className="App-background">

                {/*<img src={logo} className="App-logo2" alt="logo" />*/}
                <div style={loginStyles}>
                    <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                    <h4> Select Preferences </h4>
                    <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                    {/* <React.Fragment>

        <FormControlLabel
          control={
            <Switch
              checked={this.state.color === 'blue'}
              onChange={this.donotcare}
              color="primary"
              value="dynamic-class-name"
            />
          }
          label="Show me the group selection. I do not care."
        />

      </React.Fragment> */}
    
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
                                    <option>Distance 0 - 5 mile</option>
                                    <option>Distance 0 - 10 miles</option>
                                    <option>Distance 0 - 15 miles</option>
                                    <option>Distance  15 +  miles</option>
                                </Input>
                            </FormGroup>
                        </FormGroup> 
                    </Form>
                    <Button color="primary" onClick={this.toggle2} style={{width: "100%", backgroundColor:"white", borderColor:"#0077B5", marginTop: "2%", color:"#0077B5"}} type="submit" className="btn btn-primary" >View Group Preferences</Button>
                        <Collapse isOpen={this.state.collapse2}>
                            <Card style={{borderColor:"white"}} >
                                <CardBody>
                                    <DoughnutExample prefStats={this.state.prefStats} />
                                </CardBody>
                            </Card>
                        </Collapse>
                        <Button color="primary" onClick={this.toggle} style={{width: "100%", backgroundColor:"white", borderColor:"#0077B5", marginTop: "2%", color:"#0077B5"}} type="submit" className="btn btn-primary" >View All Filters</Button>
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
                

                
                    
                    <Button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.onSubmit.bind(this)}>Submit</Button>
                    {this.props.userInGroup==="admin"?<div/>:
                    <section className='add-item'>
                    <form>
                    <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} />
                    <h5> Or</h5>
                    {/* <hr style={{marginTop: "10px", marginBottom: "10px", color: "#38abb4"}} /> */}
                    <Button style={{width: "100%", backgroundColor:"#0077B5", borderColor:"#0077B5", marginTop: "2%"}} type="submit" className="btn btn-primary" onClick= {this.donotcare}>I'll go with the flow</Button>
                    </form>
                    </section>}
                    </div>

            </div>
        </div>
        </div>
        )} 
}

Preferences.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Preferences)