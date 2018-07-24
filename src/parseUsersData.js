
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import FaceIcon from '@material-ui/icons/Face';
import ReplyIcon from '@material-ui/icons/Reply';

export default class ParseData extends Component{
  constructor(props){
    super(props)
    this.state=({
      output : []
    })
    this.parseData.bind(this)

}
parseData(){
  var users = this.props.allUsers
  let output = []
  let outputlink 
  console.log("all users are", this.props.allUsers)
  for(var k in users){
    output.push(
      <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary={k} />
    </ListItem>
 
    )
  }
this.setState({output: output})
  return (outputlink)
  console.log("output is", output)
}
render(){
  return(
    // this.parseData.bind(this)
    <div>
      {this.state.output}
      </div>
    
  )
  
}


}