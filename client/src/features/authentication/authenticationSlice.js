import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, logout } = authenticationSlice.actions;
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
