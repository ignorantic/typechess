/** @namespace axios.defaults.headers.common */
/** @namespace process.env.BASE_URL */
/** @namespace process.env.PORT */
import axios from 'axios';
import index from '../../config';

const { API_URL, API_VERSION } = index;

const Http = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const setAuthToken = token => {
  Http.defaults.headers.common['Authorization-Token'] = `Bearer ${token}`;
};

export default Http;
