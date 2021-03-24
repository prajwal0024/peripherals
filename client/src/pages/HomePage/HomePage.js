import React, { useState } from 'react';
import './HomePage.css';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../features/authentication/authenticationSlice';
import { axiosErrorHandler } from '../../utils/errorHandlers';

const HomePage = ({ history }) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.authentication.user);

  const [user, setUser] = useState({});

  if (
    userStore &&
    Object.keys(userStore).length === 0 &&
    userStore.constructor === Object
  )
    return <Redirect to='/authentication' />;

  const getCurrentUser = async () => {
    try {
      const res = await axios.get('/api/v1/users/me');
      setUser({ ...res.data.data.user });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.delete('/api/v1/users/token');
      dispatch(logout());
      history.push('/authentication');
    } catch (error) {
      axiosErrorHandler(error, dispatch);
    }
  };

  return (
    <div className='home'>
      <h1 className='home-heading'>HOMEPAGE</h1>
      <p className='home-text'>{(user && user.firstName) || '...'}</p>
      <p className='home-text'>{(user && user.lastName) || '...'}</p>
      <p className='home-text'>{(user && user.email) || '...'}</p>
      <button className='home-button' onClick={getCurrentUser}>
        Get Me
      </button>
      <button className='home-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
