import React, { useState } from 'react';
import './authentication.css';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setUser } from './authenticationSlice';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (
    userStore &&
    Object.keys(userStore).length === 0 &&
    userStore.constructor === Object
  )
    return <Redirect to='/home' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/users/login', {
        email: emailInput,
        password: passwordInput,
      });
      console.log(res);

      // 1. Set Header
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;

      // 2. Set User
      const { firstName, lastName, email } = res.data.data.user;
      dispatch(setUser({ firstName, lastName, email }));

      // 3. Redirect
      history.push('/home');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className='auth'>
      <h1 className='auth-heading'>Login</h1>
      <form className='auth-form' onSubmit={handleSubmit}>
        <input
          type='email'
          className='auth-input'
          placeholder='Enter Email'
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          type='password'
          className='auth-input'
          placeholder='Enter Password'
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button className='auth-button'>Login</button>
      </form>
      <Link to='/create-account' className='auth-link'>
        Create Account
      </Link>
    </div>
  );
};

export default LoginPage;
