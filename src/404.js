import React, { Component } from 'react';
import notfound from "./404.gif"
// class Notfound extends React.Component{
//  render(){
//      return (
//     <div id="message">
//     <center>
//            <img src="./404.gif" alt="kitten.jpg" width="100%"  height="100%"/ >
//        </center>
//        </div>
//        )
//  }   
// }

const Notfound = () => (
    <div>
    <img src={notfound} style={{ display: 'block', margin: 'auto', position: 'relative' }} />
    </div>
    );
export default Notfound