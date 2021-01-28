import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import How from './components/How';
import WordsNoImg from './components/WordsNoImg';
import Words from './components/Words';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/words">
          <Words />
        </Route>
        <Route path="/words2">
          <WordsNoImg />
        </Route>
        <Route path="/sentences">
          <WordsNoImg />
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
