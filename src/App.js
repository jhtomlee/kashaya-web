import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import How from './components/How';
import AllList from './components/AllList';
import AllListNoImg from './components/AllListNoImg';

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/"> 
          <Home />
        </Route>
        <Route path="/all">
          <AllList />
        </Route>
        <Route path="/all2">
          <AllListNoImg />
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
