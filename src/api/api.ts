import axios from 'axios';

const api = axios.create({
  baseURL: 'http://web-api/8080/', //'https://localhost:5001/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
