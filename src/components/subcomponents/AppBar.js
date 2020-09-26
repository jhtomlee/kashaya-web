import React, { useState } from 'react';
import {
  AppBar, Toolbar,
  Typography, IconButton,
  List, ListItem,
  ListItemIcon, ListItemText,
  Divider, SwipeableDrawer
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  sidenav: {
    paddingTop: 65,
  }
}));

export default function ButtonAppBar() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleSideNav = () => {
    if (open) setOpen(false)
    else setOpen(true)
  };

  return (
    <div>
      {/* App Bar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleSideNav()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Kashaya Language
        </Typography>
          <IconButton edge="start" color="inherit" aria-label="home" href="#/">
            <HomeIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="profile"
            href="#/profile"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Side Nav */}
      <SwipeableDrawer classes={{ paper: classes.drawerPaper, }}
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => toggleSideNav()}
        onOpen={() => toggleSideNav()}>

        <List className={classes.sidenav}>
          <Divider />
          <ListItem button >
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Alphabet'} />
          </ListItem>
          <ListItem button >
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Vocabulary List'} />
          </ListItem>
          <ListItem button >
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Sounds'} />
          </ListItem>
          <ListItem button >
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Class Recordings'} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>

  );
}
