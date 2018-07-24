
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import FaceIcon from '@material-ui/icons/Face';
import ReplyIcon from '@material-ui/icons/Reply';
import ParseData from './parseUsersData'


export class MailFolderListItems extends Component{
  constructor(props){
    super(props);
    this.state=({
      output:[],
      users: this.props.allUsers
    })
    this.parseData.bind(this)
}
// parseData(){
//   var users = this.props.allUsers
//   let output = []
//   let outputlink 
//   console.log("all users are", this.props.allUsers)
//   for(var k in users){
//     output.push(
//       <ListItem button>
//       <ListItemIcon>
//         <FaceIcon />
//       </ListItemIcon>
//       <ListItemText primary={k} />
//     </ListItem>
 
//     )
//   }
// this.setState({output: output})
//   console.log("output is", output)
// }

  render() {
    return (<div>
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.userInGroup} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CodeIcon/>
        </ListItemIcon>
        <ListItemText primary="Group Code" />
        <ListItemText primary={this.props.groupCode}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Group Members" />
        </ListItem>

        {/* insert member here */}
        {/* {this.parseData()}
        {this.state.output} */}
          {this.props.allUsers.map(item => 
                <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary={item} />
    </ListItem>
          )}
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
  