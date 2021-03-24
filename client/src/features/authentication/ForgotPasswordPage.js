import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ComputerImage from '../../assests/images/computer.png';
import { activateAlert } from '../../component/Alert/alertSlice';
import PrimaryButton from '../../component/Buttons/PrimaryButton';
import InputField from '../../component/InputField/InputField';
import { isValidEmail } from '../../utils/email';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import { setPasswordResetTimestamp, setUserInfo } from './authenticationSlice';

const ForgetPasswordPage = ({ history }) => {
  const dispatch = useDispatch();
  const emailStore = useSelector((state) => state.authentication.userEmail);

  const [emailInput, setEmailInput] = useState(emailStore);
  const [axoisLoading, setAxoisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailInput) return dispatch(activateAlert('Enter the email address'));

    if (!isValidEmail(emailInput))
      return dispatch(activateAlert('Enter valid email address'));

    try {
      setAxoisLoading(true);

      // 1. Send req
      const res = await axios.post('/api/v1/users/forgot-password', {
        email: emailInput,
      });

      // 2. Save time
      dispatch(setPasswordResetTimestamp(new Date(res.data.timeLeft)));
      dispatch(
        setUserInfo({
          email: emailInput,
          firstName: undefined,
        })
      );

      // 3. Redirect
      history.push('/verify-otp');

      setAxoisLoading(false);
    } catch (error) {
      axiosErrorHandler(error, dispatch);
      setAxoisLoading(false);
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
          Send <strong>Verification Code</strong> to your Email Address
        </h1>
        <form className='auth-form'>
          <InputField
            type='email'
            placeholder='enter your email'
            value={emailInput}
            handleChange={(e) => setEmailInput(e.target.value)}
          />
          <p className='auth-text'>
            We will send a <strong>verfication code</strong> on the email
            address, to reset the password
          </p>
          <PrimaryButton
            classes='auth-button'
            text='Send Code'
            onClick={handleSubmit}
            loading={axoisLoading}
          />
          <p className='auth-text u-mt-small'>
            <Link to='/authentication'>Go back to login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
