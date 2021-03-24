import React, { useState, useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import LoginPage from './features/authentication/LoginPage';
import CreateAccountPage from './features/authentication/CreateAccountPage';
import HomePage from './pages/HomePage/HomePage';
import LoadingPage from './pages/Loading/LoadingPage';
import { fetchUser } from './features/authentication/authenticationSlice';
import { axiosResponseInterceptor } from './utils/axiosHelper';
import AuthenticationPage from './features/authentication/AuthenticationPage';
import Alert from './component/Alert/Alert';
import ForgotPasswordPage from './features/authentication/ForgotPasswordPage';
import VerifyPage from './features/authentication/VerifyPage';
import ResetPasswordPage from './features/authentication/ResetPasswordPage';

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
          <Alert />
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              <Route
                path='/authentication'
                component={AuthenticationPage}
                exact
              />
              <Route path='/login' component={LoginPage} exact />
              <Route
                path='/create-account'
                component={CreateAccountPage}
                exact
              />
              <Route
                path='/forgot-password'
                component={ForgotPasswordPage}
                exact
              />
              <Route path='/verify-otp' component={VerifyPage} exact />
              <Route
                path='/reset-password'
                component={ResetPasswordPage}
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
