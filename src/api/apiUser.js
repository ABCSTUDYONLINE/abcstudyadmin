import API from './api';

const login = (params) => {
  localStorage.setItem('contentType', 'application/json');
  return API.post("/auth/login", params).then(res => res.data);
};

const register = (params) => {
  localStorage.setItem('contentType', 'application/json');
  return API.post("/auth/register", params).then(res => res.data);
};

const getAuthUsers = (params)=>{
  localStorage.setItem('contentType', 'application/json');
  const { role, page, limit } = params;
  return API.get(`/auth/users?page=${page}&limit=${limit}&role=${role}`).then(res => res.data);
}

const getMe = ()=>{
  localStorage.setItem('contentType', 'application/json');
  return API.get('/users/me').then(res => res.data);
}

const postAuthOtpSend = (params) => {
  localStorage.setItem('contentType', 'application/json');
  return API.post("/auth/otp/send", params).then(res => res.data);
};

const deleteAuthUser = (params) => {
  localStorage.setItem('contentType', 'application/json');
  return API.delete("/auth/users", params).then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  getMe,
  getAuthUsers,
  postAuthOtpSend,
  deleteAuthUser
}