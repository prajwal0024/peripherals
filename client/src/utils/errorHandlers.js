import { activateAlert } from '../component/Alert/alertSlice';

export const axiosErrorHandler = (error, dispatch) => {
  console.log({ error });
  const errStr =
    error.response && error.message === 'Request failed with status code 500'
      ? 'Server Error, try again later'
      : error.response.data.message
      ? error.response.data.message
      : error.message;
  /*
  error.response && error.response.data.message
    ? error.response.data.message
    : error.message === 'Request failed with status code 500'
    ? 'Server Error, try again later'
    : error.message;
  */

  dispatch(activateAlert(errStr));
};
