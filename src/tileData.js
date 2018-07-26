import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import FaceIcon from '@material-ui/icons/Face';
import ReplyIcon from '@material-ui/icons/Reply';
import PersonIcon from '@material-ui/icons/Person';
import firebase from 'firebase';

// class that takes the users in groups from the database and resturns a side panel of the name of user, group code, and the group members
export class MailFolderListItems extends Component{
  constructor(props){
    super(props);
    this.state=({
      allUsers: this.props.allUsers
    })

}
// accessing users from Firebase
componentDidMount(){
  var currentComponent = this
    var root = firebase.database().ref(this.props.groupCode).child("users");
    root.on("value", function(snapshot){
    var userss=snapshot.val()
    var allusers = []
    for(var k in userss) allusers.push(k)
      console.log("allusers are",allusers)
      currentComponent.setState({allUsers:allusers})
})
}


  render() {
    return (
// returning current user group code, and group members with icons
    <div>
      <ListItem>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.userInGroup} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CodeIcon/>
        </ListItemIcon>
        <ListItemText primary="Group Code" />
        <ListItemText primary={this.props.groupCode}/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Group Members" />
        </ListItem>

        {/* insert member here */}
        {/* {this.parseData()}
        {this.state.output} */}
          {this.state.allUsers ?this.state.allUsers.map(item => 
                <ListItem>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText secondary={item} />
                </ListItem>
          ):null}

        {/* <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.allUsers[0]} />
      </ListItem>

        <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.allUsers[1]} />
      </ListItem>

        <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.allUsers[2]} />
      </ListItem> */}

 
    </div>)
  
    }
}
  
// adding logout button to the side panel
export class OtherMailFolderListItems extends Component{
  render(){
    return(
<div>
    <ListItem button>
      <ListItemIcon>
        <ReplyIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
  }
}
  