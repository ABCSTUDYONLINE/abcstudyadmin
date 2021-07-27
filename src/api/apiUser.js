import API from './api';

const login = (params) => {
  return API.post("/auth/login", params).then(res => res.data);
};

const register = (params) => {
  console.log(params)
  return API.post("/auth/register", params).then(res => res.data);
};

const getAuthUsers = (params)=>{
  const { role, page, limit } = params;
  return API.get(`/auth/users?page=${page}&limit=${limit}&role=${role}`).then(res => res.data);
}

const postAuthOtpSend = (params) => {
  return API.post("/auth/otp/send", params).then(res => res.data);
};

const deleteAuthUser = (params) => {
  return API.delete("/auth/users", params).then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  getAuthUsers,
  postAuthOtpSend,
  deleteAuthUser
}