import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {weatherapi} from './weatherapi'; 
import {SwiperNoSwiping} from './SwiperNoSwiping'
import { Router, browserHistory, Route} from 'react-router';
import Notfound from './404'
import 'bootstrap/dist/css/bootstrap.min.css';
render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
    <Route exact path="/login"/>
    <Route exact path="/weatherapi" component={weatherapi}/>
    <Route exact path="/SwiperNoSwiping" component= {SwiperNoSwiping} />
    <Route path="*" component={Notfound} />

  </Router>
), document.getElementById('root'))
