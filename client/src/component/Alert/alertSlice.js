import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  activate: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    activateAlert: (state, action) => {
      state.message = action.payload;
      state.activate = !state.activate;
    },
  },
});

export const { activateAlert } = alertSlice.actions;
export default alertSlice.reducer;
