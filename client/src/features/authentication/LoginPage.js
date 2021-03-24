import axios from 'axios';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ComputerImage from '../../assests/images/computer.png';
import { activateAlert } from '../../component/Alert/alertSlice';
import PrimaryButton from '../../component/Buttons/PrimaryButton';
import InputField from '../../component/InputField/InputField';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import { setUser } from './authenticationSlice';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { userEmail: emailStore, userName } = useSelector(
    (state) => state.authentication
  );

  const userStore = useSelector((state) => state.authentication.user);

  const [toggleMessage, setToggleMessage] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [axoisLoading, setAxoisLoading] = useState(false);

  if (!emailStore) return <Redirect to='/authentication' />;

  if (
    userStore &&
    Object.keys(userStore).length > 0 &&
    userStore.constructor === Object
  )
    return <Redirect to='/home' />;

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordInput.length < 8) dispatch(activateAlert('Password too short'));

    try {
      setAxoisLoading(true);

      // 1. Send request
      const res = await axios.post('/api/v1/users/login', {
        email: emailStore,
        password: passwordInput,
      });

      // 2. Set header
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;

      // 3. Set user
      const { firstName, lastName, email } = res.data.data.user;
      dispatch(setUser(firstName, lastName, email));

      // 4. Redirect
      history.push('/home');
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
          <strong>Login</strong> to your account
        </h1>
        <form className='auth-form'>
          <InputField
            type='email'
            value={emailStore}
            disable
            onClick={() => {
              setToggleMessage(true);
            }}
          />
          <p className='auth-text'>
            {!toggleMessage ? (
              <>
                Hey <strong>{userName}</strong>, we are happy to see you back
                here, just enter the password to login!
              </>
            ) : (
              <>
                Do you want to change the email address <br />
                <span className='auth-span-active'>
                  <Link to='/authentication'>yes</Link>
                </span>{' '}
                /{' '}
                <span
                  className='auth-span-active'
                  onClick={() => setToggleMessage(false)}
                >
                  no
                </span>
              </>
            )}
          </p>
          <InputField
            label='password'
            type='password'
            placeholder='Enter your password'
            value={passwordInput}
            handleChange={(e) => setPasswordInput(e.target.value)}
          />
          <p className='auth-text'>
            Don’t remember password,{' '}
            <Link to='forgot-password'>click here to reset it.</Link>
          </p>
          <PrimaryButton
            classes='auth-button'
            text='login'
            onClick={handleClick}
            loading={axoisLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
