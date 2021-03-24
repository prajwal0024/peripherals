import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import alertReducer from '../component/Alert/alertSlice';

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    alert: alertReducer,
  },
});
