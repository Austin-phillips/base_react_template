import axios from "axios";

export const setHeaders = (token) => {
  axios.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
};
