import React, { useState } from 'react';
import './authentication.css';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import ComputerImage from '../../assests/images/computer.png';
import InputField from '../../component/InputField/InputField';
import { activateAlert } from '../../component/Alert/alertSlice';
import { isValidEmail } from '../../utils/email';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import { setUserInfo } from './authenticationSlice';
import PrimaryButton from '../../component/Buttons/PrimaryButton';

const AuthenticationPage = ({ history }) => {
  const dispatch = useDispatch();
  const emailStore = useSelector((state) => state.authentication.userEmail);

  const [emailInput, setEmailInput] = useState(emailStore);
  const [axoisLoading, setAxoisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailInput)
      return dispatch(activateAlert('Please enter email address'));

    if (!isValidEmail(emailInput))
      return dispatch(activateAlert('Please enter valid email'));

    try {
      setAxoisLoading(true);
      const res = await axios.post('/api/v1/users/email-exsists', {
        email: emailInput,
      });
      dispatch(
        setUserInfo({
          email: emailInput,
          firstName: res.data.firstName ? res.data.firstName : undefined,
        })
      );
      setAxoisLoading(false);
      if (res.data.message === 'email exsists') history.push('/login');
      if (res.data.message === 'email do not exsists')
        history.push('/create-account');
    } catch (error) {
      setAxoisLoading(false);
      axiosErrorHandler(error, dispatch);
    }
  };

  return (
    <div className='auth container'>
      <div className='auth-left'>
        <img
          src={ComputerImage}
          alt='computer'
          className='auth-computer-image'
        />
        <p className='auth-computer-message'>
          Don’t let your <strong>computer</strong> feel <strong>lonely</strong>{' '}
          anymore!
        </p>
      </div>
      <div className='auth-right'>
        <h1 className='auth-heading'>
          <strong>Login</strong> or <strong>Signup</strong> with your Email
          Address
        </h1>
        <form className='auth-form'>
          <InputField
            type='email'
            placeholder='enter your email'
            value={emailInput}
            handleChange={(e) => setEmailInput(e.target.value)}
          />
          <p className='auth-text'>
            <strong>Just type your email.</strong> If you have an account, you
            can login. If you don’t have an account yet, we will help you to
            create a new account!
          </p>
          <PrimaryButton
            classes='auth-button'
            text='Next'
            onClick={handleSubmit}
            loading={axoisLoading}
          />
          {/* <button className='auth-button' onClick={handleSubmit}>
            Next
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
