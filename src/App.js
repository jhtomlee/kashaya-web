import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import AllList from './components/AllList';
import AppBar from './components/subcomponents/AppBar'


function App() {
  return (
    <Router >
      <AppBar/>
      
      <Switch>
        <Route exact path="/"> 
          <Home />
        </Route>
        <Route path="/all">
          <AllList />
        </Route>
        <Route path="/profile">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
