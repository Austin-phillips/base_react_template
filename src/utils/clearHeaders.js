import axios from "axios";

export const clearHeaders = () => {
  axios.interceptors.request.use((req) => {
    req.headers.Authorization.delete;
    return req;
  });
};
