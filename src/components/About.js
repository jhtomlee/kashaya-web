import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './subcomponents/AppBar';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 80,
  },
}));
function About() {
  const classes = useStyles();
  return (
    <div>
      <AppBar version="/about" />
      <Container maxWidth="lg" className={classes.container}>
        <p>
          {' '}
          <a href="https://en.wikipedia.org/wiki/Kashaya_language">
            Kashaya
          </a>{' '}
          is a Native American language spoken in Sonoma County, along the
          Pacific coast in northern California; it is one of seven languages in
          the{' '}
          <a href="https://en.wikipedia.org/wiki/Pomoan_languages">Pomoan</a>{' '}
          family. It is the language of the 
          <a href="http://stewartspoint.org/">
            Kashia Band of Pomo Indians of the Stewarts Point Rancheria
          </a>
          .
        </p>
        <p>
          The sound files provided on this website are intended as a guide to
          the pronunciation of Kashaya sounds and vocabulary, for the use of
          tribal members and others interested in learning about the language.
          Its design was overseen by{' '}
          <a href="https://www.ling.upenn.edu/~gene/home.html">Gene Buckley</a>{' '}
          of the Department of Linguistics at the University of Pennsylvania;
          the programming work began in the fall of 2020 and was done by{' '}
          <a href="https://www.jhtomlee.com">Tom (Jonghyun) Lee</a>, at that
          time a student in the Master's in Computer Science program, who
          continues to help with the development and maintenance of the site.
        </p>
        <p>
          Buckley previously assembled resources about Kashaya in{' '}
          <a href="https://www.ling.upenn.edu/~gene/kashaya.html">
            another location,
          </a>{' '}
          including an earlier version of these sound files, but the eventual
          goal is to integrate them into this website.
        </p>
        <h4>The sound files</h4>
        <p>
          The recordings from which these audio clips have been extracted were
          collected over a period of six decades, with generous collaboration by
          many speakers of Kashaya. The recordings are from several phases. The
          first phase (1957-1958, plus 1964) began when Robert Oswalt was a
          graduate student in linguistics at UC Berkeley. Among the many
          important documents from Oswalt's long study of the language are a
          grammar (his 1961 dissertation), a large collection of texts
          (published 1964), and an extensive draft of a dictionary (2005) which
          forms the basis of an{' '}
          <a href="https://www.webonary.org/kashaya/">online dictionary</a>{' '}
          developed by Buckley.
        </p>
        <p>
          Much of the audio presented on this website comes from the Oswalt
          recordings, now housed at the{' '}
          <a href="https://cla.berkeley.edu">California Language Archive</a>{' '}
          (CLA) in Berkeley. They represent the voices and knowledge most
          notably of Essie Parrish, the Kashaya spiritual leader and Oswalt's
          main consultant. Nearly all the narratives among these recordings are
          spoken by Essie Parrish and Herman James, but also include material
          from Violet Chapelle (daughter of Essie) and Glady James (daughter of
          Herman). Narratives not published in the 1964 volume apparently
          include the voices of Ethel Lucas and Louise Smith, but they have not
          yet been examined for use on this website.
        </p>
        <p>
          Some words and phrases have been extracted from these narratives, but
          it can be difficult to do this in a way that is useful for the study
          of isolated words – they are more easily extracted from sessions in
          which the speaker pronounces them separately. The Oswalt recordings
          include such sessions with Essie Parrish, Violet Chapelle, and
          Isabelle Johnson (sister of Essie).
        </p>
        <p>
          The second phase of recordings comes from a field methods class at UC
          Berkeley in 1989-1990, and present the voice of Milton &quot;Bun&quot;
          Lucas (son of Ethel), who was the language consultant in a field
          methods course led by Leanne Hinton. This is where Buckley first
          became familiar with Kashaya, and it led to his 1992 dissertation
          about the language. A number of audio clips have been extracted from
          these recordings, which (like Oswalt's) are housed at the CLA.
        </p>
        <p>
          The third phase begins in 2009, with another field methods class at UC
          Berkeley, this time led by Pam Munro. It was part of the biannual
          Linguistic Institute of the{' '}
          <a href="https://www.linguisticsociety.org/content/lsas-linguistic-institutes">
            LSA
          </a>{' '}
          that occurs every two years at a different university; those
          recordings are also at the CLA. The consultant in this class was Anita
          Silva (daughter of Isabelle Johnson).
        </p>
        <p>
          A few years later, Buckley received a grant from the{' '}
          <a href="https://www.neh.gov/grants/preservation/documenting-endangered-languages">
            Documenting Endangered Languages
          </a>{' '}
          program, funded by the National Endowment for the Humanities, which
          made it possible for him to work with Anita Silva multiple times over
          the period 2012 to 2015. A few of the audio clips here come from these
          recordings, but many more remain to be extracted.
        </p>
        <p>
          Subsequently, Buckley was able to record the speech of several other
          speakers in 2017 and 2018: Otis Parrish (son of Essie), Inez Adam, and
          Freda Davis. These are relatively few in number but represent the most
          recent recordings to be found on this website. Some of that work was
          funded by the{' '}
          <a href="https://research.upenn.edu/funding/university-research-foundation/">
            University Research Foundation
          </a>
          .
        </p>
      </Container>
    </div>
  );
}

export default About;
