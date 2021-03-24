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
import Modal from '../../component/Modal/Modal';

const ResetPasswordPage = ({ history }) => {
  const dispatch = useDispatch();
  const timeLeftStore = useSelector(
    (state) => state.authentication.passwordResetTimestamp
  );
  const emailStore = useSelector((state) => state.authentication.userEmail);
  const resetTokenStore = useSelector(
    (state) => state.authentication.passwordResetToken
  );

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [activateModal, setActivateModal] = useState(false);

  const [duration, setDuration] = useState((timeLeftStore - Date.now()) / 1000);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    countdownTimer(duration, setDuration, setCountdown);
    if (duration === 1) {
      dispatch(setPasswordResetTimestamp(undefined));
      history.push('/authentication');
    }
  }, [history, dispatch, countdown, duration]);

  // if (!timeLeftStore) {
  //   return <Redirect to='/authentication' />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordInput || !passwordConfirmInput)
      return dispatch(activateAlert('Please fill all fields'));

    if (passwordInput.length < 8)
      return dispatch(activateAlert('Password too short'));

    if (passwordInput !== passwordConfirmInput)
      return dispatch(activateAlert('Passwords do not match'));

    try {
      setAxiosLoading(true);

      // 1. Send req
      const res = await axios.post('/api/v1/users/reset-password', {
        email: emailStore,
        resetToken: resetTokenStore,
        password: passwordInput,
        passwordConfirm: passwordConfirmInput,
      });

      // 2. Reset timestamp and passwordtoken
      dispatch(setPasswordResetTimestamp(undefined));
      dispatch(setPasswordResetToken(undefined));

      // 3. Activate Modal
      setActivateModal(true);

      setAxiosLoading(false);
    } catch (error) {
      axiosErrorHandler(error, dispatch);
      setAxiosLoading(false);
    }
  };

  return (
    <>
      <Modal
        activate={activateModal}
        setActivate={setActivateModal}
        heading='Password Reset Successful'
        message="You've successfully changed your password, now you can login with your brand new password"
        onPrimaryClick={() => {
          setActivateModal(false);
          history.push('/authentication');
        }}
        primaryText='Alright!'
      />
      <div className='auth container'>
        <div className='auth-left'>
          <img
            src={ComputerImage}
            alt='computer'
            className='auth-computer-image'
          />
          <p className='auth-computer-message'>
            Don’t let your <strong>computer</strong> feel{' '}
            <strong>lonely</strong> anymore!
          </p>
        </div>
        <div className='auth-right'>
          <h1 className='auth-heading'>
            <strong>Reset</strong> your password
          </h1>
          <form className='auth-form'>
            <InputField
              label='password'
              type='password'
              placeholder='keep it at least 8 character long'
              value={passwordInput}
              handleChange={(e) => setPasswordInput(e.target.value)}
            />
            <InputField
              label='confirm password'
              type='password'
              placeholder='type the password again'
              name='passwordConfirm'
              value={passwordConfirmInput}
              handleChange={(e) => setPasswordConfirmInput(e.target.value)}
            />
            <p className='auth-text u-mt-small'>
              Verification code expires in
              <span>{countdown}</span> mins
            </p>
            <PrimaryButton
              classes='auth-button'
              text='Reset Password'
              onClick={handleSubmit}
              loading={axiosLoading}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
