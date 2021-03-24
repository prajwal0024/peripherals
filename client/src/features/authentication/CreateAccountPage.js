import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ComputerImage from '../../assests/images/computer.png';
import { activateAlert } from '../../component/Alert/alertSlice';
import PrimaryButton from '../../component/Buttons/PrimaryButton';
import InputField from '../../component/InputField/InputField';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import { setUser } from './authenticationSlice';

const CreateAccountPage = ({ history }) => {
  const dispatch = useDispatch();
  const emailStore = useSelector((state) => state.authentication.userEmail);
  const userStore = useSelector((state) => state.authentication.user);

  const [messageCode, setMessageCode] = useState('default');
  const [axoisLoading, setAxoisLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({});

  useEffect(() => {
    if (userInputs.firstName && userInputs.firstName.length > 2) {
      setMessageCode('firstName');
    } else {
      setMessageCode('default');
    }
  }, [userInputs.firstName]);

  if (!emailStore) return <Redirect to='/authentication' />;

  if (
    userStore &&
    Object.keys(userStore).length > 0 &&
    userStore.constructor === Object
  )
    return <Redirect to='/home' />;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ target: e.target, value });
    setUserInputs({ ...userInputs, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { firstName, lastName, password, passwordConfirm } = userInputs;

    if (!firstName || !lastName || !password || !passwordConfirm)
      return dispatch(activateAlert('Please enter all details'));

    try {
      setAxoisLoading(true);

      // 1. Send request
      const res = await axios.post('/api/v1/users/signup', {
        firstName,
        lastName,
        email: emailStore,
        password,
        passwordConfirm,
      });

      // 2. Set header
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;

      // 3. Set user
      const { user } = res.data.data;
      dispatch(
        setUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        })
      );

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
          <strong>Create</strong> a new account
        </h1>
        <form className='auth-form'>
          <InputField
            type='email'
            value={emailStore}
            disable
            onClick={() => {
              setMessageCode('email');
            }}
          />
          <p className='auth-text'>
            {messageCode === 'default' ? (
              <>
                Hey, welcome! it looks like you don’t have an account. Let’s
                create one!
              </>
            ) : messageCode === 'firstName' ? (
              <>
                Hello <strong>{userInputs.firstName}</strong>, welcome to
                Peripherals, just enter the details to create an account
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
                  onClick={() => setMessageCode('default')}
                >
                  no
                </span>
              </>
            )}
          </p>
          <div className='auth-dual-container'>
            <InputField
              label='First Name'
              type='text'
              placeholder='Steve'
              value={userInputs.firstName}
              handleChange={(e) => handleChange(e)}
              name='firstName'
            />
            <InputField
              label='Last Name'
              type='text'
              placeholder='Smith'
              value={userInputs.lastName}
              handleChange={(e) => handleChange(e)}
              name='lastName'
            />
          </div>
          <InputField
            label='password'
            type='password'
            placeholder='keep it at least 8 character long'
            value={userInputs.password}
            handleChange={(e) => handleChange(e)}
            name='password'
          />
          <InputField
            label='confirm password'
            type='password'
            placeholder='type the password again'
            value={userInputs.passwordConfirm}
            handleChange={(e) => handleChange(e)}
            name='passwordConfirm'
          />
          <PrimaryButton
            classes='auth-button'
            text='Create Account'
            onClick={handleClick}
            loading={axoisLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
