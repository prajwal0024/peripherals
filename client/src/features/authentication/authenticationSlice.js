import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userEmail: '',
  userName: '',
  user: {},
  passwordResetTimestamp: '',
  passwordResetToken: '',
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userEmail = action.payload.email;
      state.userName = action.payload.firstName;
    },
    logout: (state) => {
      state.user = {};
      state.userEmail = '';
      state.userName = '';
    },
    setPasswordResetTimestamp: (state, action) => {
      state.passwordResetTimestamp = action.payload;
    },
    setPasswordResetToken: (state, action) => {
      state.passwordResetToken = action.payload;
    },
  },
});

export const {
  setUser,
  setUserInfo,
  setPasswordResetTimestamp,
  setPasswordResetToken,
  logout,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;

export const fetchUser = (setLoading) => async (dispatch) => {
  try {
    // 1. Get token
    const tokenRes = await axios.get('/api/v1/users/token');
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${tokenRes.data.accessToken}`;

    // 2. Get User
    if (tokenRes.data.accessToken) {
      const userRes = await axios.get('/api/v1/users/me');
      const { user } = userRes.data.data;
      dispatch(
        setUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        })
      );
      setLoading(false);
    }
  } catch (error) {
    console.log({ error });
    setLoading(false);
  }
};
