import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import How from './components/How';
import WordsAll from './components/WordsAll';
import WordsImg from './components/WordsImg';
import Sentences from './components/Sentences';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/imgwords">
          <WordsImg />
        </Route>
        <Route path="/allwords">
          <WordsAll />
        </Route>
        <Route path="/sentences">
          <Sentences />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/how">
          <How />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
