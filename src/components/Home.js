import React from 'react';
import { Container, Typography, Hidden, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../style/style.css';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 80,
    // flex:1,
    // display:"flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // height: "70vh"
  },
  title: {
    paddingBottom: theme.spacing(3),
  },
  description: {
    paddingBottom: theme.spacing(3),
  },
  text: {
    marginBottom: theme.spacing(1),
    color: '#C4C4C4',
    textShadow: '1px 1px #000000',
  },
  buttonsContainer: {
    marginTop: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <section id="hero">
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.title}>
          <Hidden xsDown>
            <Typography
              variant="h3"
              component="h3"
              color="textPrimary"
              gutterBottom
            >
              {' '}
              Kashaya Vocabulary{' '}
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography
              variant="h4"
              component="h4"
              color="textPrimary"
              gutterBottom
            >
              Kashaya Vocabulary
            </Typography>
          </Hidden>
        </div>
        <div className={classes.description}>
          <Typography className={classes.text} align="left" variant="body1">
            {`Kashaya, also spelled Kashia by the tribe, is one 
          of seven languages in the Pomoan family. It is the language 
          of the Kashia Band of Pomo Indians of the Stewarts Point Rancheria.`}
          </Typography>
          <Typography className={classes.text} align="left" variant="body1">
            {'This website was prepared by '}
            <a
              style={{ color: '#A8A8A8' }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ling.upenn.edu/~gene/home.html"
            >
              <u>Gene Buckley</u>
            </a>
            {' and developed by '}
            <a
              style={{ color: '#A8A8A8' }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jhtomlee/"
            >
              <u>Tom Lee</u>
            </a>
            . Click on one of the following to continue:
          </Typography>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          className={classes.buttonsContainer}
        >
          <Grid item>
            <Button variant="contained" color="primary" href="/words">
              Words (with images)
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/words2">
              Words (without images)
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          className={classes.buttonsContainer}
        >
          <Grid item>
            <Button variant="contained" color="secondary" href="/how">
              How to use this website
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" href="/about">
              About Kashaya
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
