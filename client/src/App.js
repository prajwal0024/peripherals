import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import LoginPage from './features/authentication/LoginPage';
import CreateAccountPage from './features/authentication/CreateAccountPage';
import HomePage from './features/authentication/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <div className='app'>
          <Route path='/login' component={LoginPage} exact />
          <Route path='/create-account' component={CreateAccountPage} exact />
          <Route path='/home' component={HomePage} exact />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
