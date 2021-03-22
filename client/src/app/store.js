import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';

export default configureStore({
  reducer: {
    // counter: counterReducer,
    authentication: authenticationReducer,
  },
});
