// import axios from 'axios';
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { logout } from './authenticationSlice';

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const userStore = useSelector((state) => state.authentication.user);

//   const [user, setUser] = useState({});

//   if (
//     userStore &&
//     Object.keys(userStore).length === 0 &&
//     userStore.constructor === Object
//   )
//     return <Redirect to='/login' />;

//   const getCurrentUser = async () => {
//     try {
//       const res = await axios.get('/api/v1/users/me');
//       setUser({ ...res.data.data.user });
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   return (
//     <div className='home'>
//       <h1 className='auth-heading'>HOMEPAGE</h1>
//       <p className='auth-link'>{(user && user.firstName) || '...'}</p>
//       <p className='auth-link'>{(user && user.lastName) || '...'}</p>
//       <p className='auth-link'>{(user && user.email) || '...'}</p>
//       <button className='auth-button' onClick={getCurrentUser}>
//         Get Me
//       </button>
//       <button
//         className='auth-button'
//         onClick={() => {
//           dispatch(logout());
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default HomePage;
