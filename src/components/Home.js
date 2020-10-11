import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Intro from './Home/Intro'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: 80,
    minHeight: '100vh',
  },
});

function Home() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container} >
        <Typography variant="h3" component="h1" gutterBottom>
          Kashaya
        </Typography>
        <Intro />
      </Container>
    </div>
  );
}

export default Home;
