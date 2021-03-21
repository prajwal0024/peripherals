import React from 'react';
import './authentication.css';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
  return (
    <div className='auth'>
      <h1 className='auth-heading'>Create Account</h1>
      <form className='auth-form'>
        <input type='email' className='auth-input' placeholder='Enter Email' />
        <input
          type='text'
          className='auth-input'
          placeholder='Enter Firstname'
        />
        <input
          type='text'
          className='auth-input'
          placeholder='Enter Lastname'
        />
        <input
          type='password'
          className='auth-input'
          placeholder='Enter Password'
        />
        <input
          type='password'
          className='auth-input'
          placeholder='Enter Confirm Password'
        />
        <button className='auth-button'>Create Account</button>
      </form>
      <Link to='/login' className='auth-link'>
        Go to Login
      </Link>
    </div>
  );
};

export default CreateAccountPage;
