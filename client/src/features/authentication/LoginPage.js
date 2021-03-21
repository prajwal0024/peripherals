import React from 'react';
import './authentication.css';

import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='auth'>
      <h1 className='auth-heading'>Login</h1>
      <form className='auth-form'>
        <input type='email' className='auth-input' placeholder='Enter Email' />
        <input
          type='password'
          className='auth-input'
          placeholder='Enter Password'
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
