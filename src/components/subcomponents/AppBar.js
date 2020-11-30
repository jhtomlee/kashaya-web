import React, { useState } from 'react';
import {
  AppBar, Toolbar,
  Typography, IconButton,
  List, ListItem,
  ListItemIcon, ListItemText,
  Divider, SwipeableDrawer, InputBase, Hidden, Badge
} from '@material-ui/core';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

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
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    flex: '1 1 100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);


export default function TopBar(props) {

  const { version, onChangeSearchInput, inputRef, handleOpenFilter, filtersCount } = props;

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
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleSideNav()}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton edge="start" color="inherit" aria-label="home" href="#/">
            <HomeIcon />
          </IconButton>

          <Hidden xsDown>
            <Typography variant="h6" className={classes.title}>
              Kashaya Vocabulary
          </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6" className={classes.title}>
              {' '}
          </Typography>
          </Hidden>
          {version === '/all' ?
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={onChangeSearchInput}
                  type="search"
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  ref={inputRef}
                />
              </div>
            </div>
            :
            <div></div>}
          {version === '/all' ?
            <IconButton style={{ padding: 0, marginLeft: 15 }} aria-label="filter list" onClick={() => handleOpenFilter()}>
              {filtersCount === 0 || !filtersCount ?
                <FilterListIcon />
                :
                <StyledBadge badgeContent={filtersCount} color="secondary">
                  <FilterListIcon />
                </StyledBadge>
              }
            </IconButton>
            :
            <div></div>}
          {version === '/all2' ?
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={onChangeSearchInput}
                  type="search"
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  ref={inputRef}
                />
              </div>
            </div>
            :
            <div></div>
          }
          {version === '/all2' ?
            <IconButton style={{ padding: 0, marginLeft: 15 }} aria-label="filter list" onClick={() => handleOpenFilter()}>
              {filtersCount === 0 || !filtersCount ?
                <FilterListIcon />
                :
                <StyledBadge badgeContent={filtersCount} color="secondary">
                  <FilterListIcon />
                </StyledBadge>
              }
            </IconButton>
            :
            <div></div>
          }
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
          <ListItem button component="a" href="#/all" onClick={() => toggleSideNav()}>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Vocab List 1'} />
          </ListItem>
          <ListItem button component="a" href="#/all2" onClick={() => toggleSideNav()}>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={'Vocab List 2'} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
}
