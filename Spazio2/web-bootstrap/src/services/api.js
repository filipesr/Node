import axios from "axios";
import { getToken } from "./auth";
import { URLSERVER } from '../constants';

const api = axios.create({
  baseURL: URLSERVER
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers["x-access-token"] = `${token}`;
    //    config.headers['Content-Type'] = 'multipart/form-data';
  } else console.log('sem token');
  

  return config;
});

export default api;
