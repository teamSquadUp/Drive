import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, browserHistory, Route, Link } from 'react-router';
/*
const Page = ({ title }) => (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{title}</h1>
      </div>
      <p className="App-intro">
        This is the {title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/api">Start</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
);
const Home = (props) => (
  <Page title="SquadUp"/>
);
const Start = (props) => (
  <Page title = "Start"/>
);
const About = (props) => (
  <Page title="About"/>
);
const Settings = (props) => (
  <Page title="Settings"/>
);
*/
class App extends Component {
  constructor() { 
    super() 
    this.state={ 
      title: "HOME"
    }
  }

  render() { 
    return (
  <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{this.state.title}</h1>
      </div>
      <p className="App-intro">
        This is the {this.state.title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/api">Start</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
  )}}


export default App;