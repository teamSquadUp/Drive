import { AutoRotatingCarousel} from 'material-auto-rotating-carousel';
import React, { Component } from 'react';
import {Slide} from 'material-auto-rotating-carousel';
import First from './first.png';
import Login from './login.gif';
import Swipe from './Swipe.png';
import Result from './results.png';
import './css/Main.css';


const { indigo, lightBlue, blue} = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;

export class Main extends Component {
    constructor() {
      super();
      this.state = {
              }
    }
    render(){
        return(
            <div>
              <AutoRotatingCarousel autoplay={true} interval = {8000} hideArrows = {false} open={true} mobile = {true} label = 'Get started' onStart = {()=>window.location.href='/App'}>
                <Slide
                  media={<img src={First} class="responsive" />}
                  mediaBackgroundStyle={{ backgroundColor: indigo[800] }}
                  style={{ backgroundColor: indigo[800] }}
                  title='Where will we take you?'
                  subtitle= 'The food adventures are limitless.'
                />
                <Slide
                  media={<img src={Login} class="responsive"/>}
                  mediaBackgroundStyle={{ backgroundColor: blue[900] }}
                  style={{ backgroundColor:  blue[900] }}
                  title="Three different options."
                  subtitle="Sign up to be the admin to create a shareable code. Have a group code? Just enter your name. Short on time? Spin your wheel."
                />
                <Slide
                  media={<img src={Swipe} class="responsive"/>}
                  mediaBackgroundStyle={{ backgroundColor: blue[500] }}
                  style={{ backgroundColor:  blue[500] }}
                  title='Generated options.'
                  subtitle='Select your preferences. See those options automatically generated. Swipe away.'
                />
                <Slide
                  media={<img src={Result} class="responsive" />}
                  mediaBackgroundStyle={{ backgroundColor: lightBlue[500] }}
                  style={{ backgroundColor: lightBlue[500] }}
                  title='Boom.'
                  subtitle='A splash of confetti to celebrate.'
                />
              </AutoRotatingCarousel>
            </div>
        );
  }
}
export default Main;