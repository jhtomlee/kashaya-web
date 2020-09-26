import React from 'react';
import { Typography } from '@material-ui/core';

function Intro() {
  return (
    <div>
      <Typography align="left" variant="body1" color="textPrimary">
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Kashaya_language">
          <u>Kashaya</u>
        </a>
            , also spelled Kashia by the tribe, is one of seven languages in the
            Pomoan family. It is the language of the{' '}
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="http://www.stewartspoint.org/wp2/">
          <u>Kashia Band of Pomo Indians of the Stewarts Point Rancheria</u>
        </a>.
          </Typography>
      <br></br>
      <Typography align="left" variant="body1" color="textPrimary">
        This page was prepared by{' '}
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="https://www.ling.upenn.edu/~gene/home.html">
          <u>Gene Buckley</u>
        </a>.
            I first starting learning about Kashaya as a graduate student at{' '}
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="https://lx.berkeley.edu/">
          <u>UC Berkeley</u>
        </a>
            , in a field methods class in 1989-1990. It was directed by Leanne Hinton, and
            our language consultant was Milton (Bun) Lucas. My dissertation, Theoretical
            Aspects of Kashaya Phonology and Morphology,was completed in 1992; a slightly
            revised version was{' '}
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="https://press.uchicago.edu/ucp/books/book/distributed/T/bo3624920.html">
          <u>published</u>
        </a>{' '}
            in 1994. Since then I have written about various topics in Kashaya, which can be seen
          on my{' '}
        <a style={{ color: '#19857b' }} target="_blank"
          rel="noopener noreferrer" href="https://www.ling.upenn.edu/~gene/cv.html">
          <u>curriculum vitae</u>
        </a>.
            I have been working for several years to convert and
          update Robert Oswalt's unpublished dictionary materials into a lexical database
          for publication, as well as developing digital resources for language learners.
          These are described below.
          </Typography>
    </div>
  );
}

export default Intro;
