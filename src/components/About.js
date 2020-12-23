import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from './subcomponents/AppBar'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 80,
  }
}))
function About() {
  const classes = useStyles();
  return (
    <div>
      <AppBar version="/about"/>
      <Container maxWidth="lg" className={classes.container}>
        <Typography>Under construnction</Typography>
      </Container>
    </div>

  );
}

export default About;