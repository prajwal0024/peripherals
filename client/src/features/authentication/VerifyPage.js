import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ComputerImage from '../../assests/images/computer.png';
import { activateAlert } from '../../component/Alert/alertSlice';
import PrimaryButton from '../../component/Buttons/PrimaryButton';
import InputField from '../../component/InputField/InputField';
import { countdownTimer } from '../../utils/countdown';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import {
  setPasswordResetTimestamp,
  setPasswordResetToken,
} from './authenticationSlice';

const VerifyPage = ({ history }) => {
  const dispatch = useDispatch();
  const timeLeftStore = useSelector(
    (state) => state.authentication.passwordResetTimestamp
  );
  const emailStore = useSelector((state) => state.authentication.userEmail);

  const [axiosLoading, setAxiosLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [duration, setDuration] = useState((timeLeftStore - Date.now()) / 1000);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    countdownTimer(duration, setDuration, setCountdown);
    if (duration === 1) {
      dispatch(setPasswordResetTimestamp(undefined));
      history.push('/authentication');
    }
  }, [history, dispatch, countdown, duration]);

  if (!timeLeftStore) {
    return <Redirect to='/authentication' />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeInput)
      return dispatch(activateAlert('Enter the verification code'));

    if (codeInput.length < 6)
      return dispatch(activateAlert('Invalid Verification Code'));

    try {
      setAxiosLoading(true);

      // 1. Send req
      const res = await axios.post('/api/v1/users/verify-otp', {
        email: emailStore,
        passwordOTP: codeInput,
      });

      // 2. Save reset token
      dispatch(setPasswordResetToken(res.data.resetToken));

      // 3. Redirect
      history.push('/reset-password');

      setAxiosLoading(false);
    } catch (error) {
      axiosErrorHandler(error, dispatch);
      setAxiosLoading(false);
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
          <strong>Verification Code Sent</strong>, Please check your email
        </h1>
        <form className='auth-form'>
          <InputField
            type='text'
            placeholder='enter the verification code'
            value={codeInput}
            handleChange={(e) =>
              e.target.value.length < 7 &&
              setCodeInput(e.target.value.replace(/\D/, ''))
            }
            classes='inputfield-input-verification'
          />
          <p className='auth-text'>
            We have send a verification code to email:{' '}
            <strong>{emailStore.substr(0, 5)}...</strong>, enter the code above
          </p>
          <p className='auth-text u-mt-small'>
            Verification code expires in
            <span>{countdown}</span> mins
          </p>
          <PrimaryButton
            classes='auth-button'
            text='Verify Code'
            onClick={handleSubmit}
            loading={axiosLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
