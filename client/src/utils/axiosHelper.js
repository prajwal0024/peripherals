import axios from 'axios';
import { Redirect } from 'react-router-dom';

const axiosResponseInterceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('ERRORRR', { e: error });

    const {
      response: { data },
    } = error;

    if (data.message) {
    }
    if (data.message && data.message.includes('No refresh token found')) {
      return Promise.reject(error);
    }

    if (data.message && data.message.includes('Invalid refresh token')) {
      return Promise.reject(error);
    }

    if (data.message && data.message.includes('jwt expired')) {
      return axios
        .get('/api/v1/users/token')
        .then((res) => {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`;
          error.response.config.headers[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`;
          return axios(error.response.config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);
