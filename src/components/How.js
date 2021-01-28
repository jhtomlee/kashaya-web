import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './subcomponents/AppBar';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 80,
  },
}));
function How() {
  const classes = useStyles();
  return (
    <div>
      <AppBar version="/how" />
      <Container maxWidth="lg" className={classes.container}>
        <h3>How to use this website</h3>
        <p>There are three basic vocabulary lists.</p>
        <ul>
          <li>
            {' '}
            <b>
              <i>Words with Images</i>
            </b>
            : words and short phrases that also have small images to illustrate
            the meaning.
          </li>
          <li>
            {' '}
            <b>
              <i>All Words</i>
            </b>
            : the same words and short phrases along with others that do not
            have images; all are presented here without images.
          </li>
          <li>
            <b>
              <i>Sentences</i>
            </b>
            : a variety of sentences drawn from recordings.
          </li>
        </ul>
        <p>
          All these lists have at least two columns: one containing the Kashaya
          and English forms, and to the right under <i>Listen</i> are buttons
          that will play a sound clip of a speaker pronouncing the word, phrase,
          or sentence. The individual speaker in each case is identified by
          initials, and where possible more than one speaker is provided. For
          the <i>Word and Images</i> list, the leftmost column shows an image
          for that word.
        </p>
        <h4>Alphabetical ordering</h4>
        <p>
          In each presentation, you can click the &quot;refresh&quot; symbol at
          the top of the column containing text; this will switch it between the{' '}
          <i>Kashaya Word</i> and <i>English Word</i> alphabetical ordering.
        </p>
        <h4>Searching</h4>
        <p>
          You can type letters into the search bar at the upper right. It will
          narrow the display so that only those entries containing that sequence
          (in either English or Kashaya) will be shown.{' '}
        </p>
        <p>
          If you omit the special symbols <b>ʰ · ’</b> you will still find words
          containing them; or you can substitute the more common symbols{' '}
          <b>h : '</b> to keep the search more restricted. Similarly,{' '}
          <b>? t s</b> will match <b>ʔ ṭ š</b> which may be difficult to input.
        </p>
        <h4>Filtering</h4>
        <p>
          Click on the <i>Filter</i> icon to the right of the search bar to
          access a list of categories. You can choose more than one of these to
          display only those that match. You will also find a list of speakers,
          so you can display just the words pronounced by that person. These
          work together if you choose items in both lists.{' '}
        </p>
        <p>
          {' '}
          The search function will only look among the displayed items. The{' '}
          <i>Filter</i> icon will display the number of restrictions currently
          in place to remind you of this; you can click again and choose{' '}
          <i>Clear All</i> to search in the entire list.
        </p>
        <h4>Navigating</h4>
        <p>
          At the upper left is an icon that will reveal a list of pages on the
          website, so you can use this to move among the lists, or among the
          explanatory pages.
        </p>
      </Container>
    </div>
  );
}

export default How;
