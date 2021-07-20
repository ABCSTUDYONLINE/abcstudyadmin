import API from './api';

const login = (params) => {
  return API.post("/auth/login", params).then(res => res.data);
};

const register = (params) => {
  return API.post("/auth/register", params).then(res => res.data);
};

const verifyEmail = (params) => {
  return API.post(`/authen/verify-email`, params);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  verifyEmail
}