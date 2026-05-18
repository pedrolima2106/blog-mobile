import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.7.7:5230/api',
});

export default api;