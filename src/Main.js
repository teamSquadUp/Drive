import { AutoRotatingCarousel} from 'material-auto-rotating-carousel';
import React, { Component } from 'react';
import {Slide} from 'material-auto-rotating-carousel';
import First from './main.png';

const { red, blue, green } = require('@material-ui/core/colors');
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
              <AutoRotatingCarousel autoplay={true} hideArrows = {false} open={true} mobile = {true} label = 'Get started' onStart = {()=>window.location.href='/App'}>
                <Slide
                  media={<img src={First} />}
                  mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                  //style={{ backgroundColor: red[600] }}
                  title='This is a very cool feature'
                  subtitle='Just using this will blow your mind.'
                />
                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                  mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                  style={{ backgroundColor: blue[600] }}
                  title='Ever wanted to be popular?'
                  subtitle='Well just mix two colors and your are good to go!'
                />
                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                  mediaBackgroundStyle={{ backgroundColor: green[400] }}
                  style={{ backgroundColor: green[600] }}
                  title='May the force be with you'
                  subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                />
              </AutoRotatingCarousel>
            </div>
        );
  }
}
export default Main;