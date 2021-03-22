import React, { useState, useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import LoginPage from './features/authentication/LoginPage';
import CreateAccountPage from './features/authentication/CreateAccountPage';
import HomePage from './features/authentication/HomePage';
import LoadingPage from './pages/Loading/LoadingPage';
import { fetchUser } from './features/authentication/authenticationSlice';
import { axiosResponseInterceptor } from './utils/axiosHelper';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser(setLoading));
  }, []);

  return (
    <Router>
      <Switch>
        <div className='app'>
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              <Route path='/login' component={LoginPage} exact />
              <Route
                path='/create-account'
                component={CreateAccountPage}
                exact
              />
              <Route path='/home' component={HomePage} exact />
            </>
          )}
        </div>
      </Switch>
    </Router>
  );
}

export default App;
