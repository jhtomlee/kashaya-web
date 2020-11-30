import React from 'react';
import { Container, Typography, Hidden, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/subcomponents/AppBar'
import '../style/style.css'

const useStyles = makeStyles(theme => ({
  container: {
    // paddingTop: theme.spacing(10),
    flex:1,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    height: "70vh"
  },
  text: {
    marginBottom: theme.spacing(1),
    textShadow: "1px 1px #00CC66"
  },
  buttonsContainer:{
    marginTop: theme.spacing(1)
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <section id="hero">
      <AppBar version="/" />
      <Container maxWidth="lg" className={classes.container} >
        <Hidden xsDown>
          <Typography variant="h3" component="h3" color="textPrimary" gutterBottom> Kashaya Vocabulary </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h4" component="h4" color="textPrimary" gutterBottom>Kashaya Vocabulary</Typography>
        </Hidden>
        <Typography className={classes.text} align="left" variant="body1" color="textPrimary">
          {`Kashaya, also spelled Kashia by the tribe, is one 
          of seven languages in the Pomoan family. It is the language 
          of the Kashia Band of Pomo Indians of the Stewarts Point Rancheria.`}
        </Typography>
        <Typography className={classes.text} align="left" variant="body1" color="textPrimary">
          {`This website was prepared by `}
          <a style={{ fontWeight: 500 }} target="_blank"
            rel="noopener noreferrer" href="https://www.ling.upenn.edu/~gene/home.html">
            <u>Gene Buckley</u>
          </a>
          {`. Click on one of the following to continue:`}
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.buttonsContainer}>
          <Grid item >
            <Button variant="contained" color="primary" href="#/all">
              Vocabulary (with images)
          </Button>
          </Grid>
          <Grid item >
            <Button variant="contained" color="primary" href="#/all2">
              Words and Phrases
          </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
