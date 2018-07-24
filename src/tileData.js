
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import FaceIcon from '@material-ui/icons/Face';
import ReplyIcon from '@material-ui/icons/Reply';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary="Name" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CodeIcon/>
      </ListItemIcon>
      <ListItemText primary="Group Code" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Group Members" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ReplyIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);