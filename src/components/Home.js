import React from 'react';
import { Container, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/subcomponents/AppBar'
import '../style/style.css'

const useStyles = makeStyles({
  container: {
    paddingTop: 120,
    minHeight: '100vh',

  },
});

function Home() {
  const classes = useStyles();

  return (
    <section id="hero">
      <AppBar version="/"/>
      <Container maxWidth="lg" className={classes.container} >
        <Hidden xsDown>
          <Typography variant="h3" component="h3" gutterBottom>
            Kashaya Vocabulary
        </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h4" component="h4" gutterBottom>
            Kashaya Vocabulary
        </Typography>
        </Hidden>
      </Container>
    </section>
  );
}

export default Home;
