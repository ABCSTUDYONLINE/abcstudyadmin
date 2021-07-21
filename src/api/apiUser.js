import API from './api';

const login = (params) => {
  return API.post("/auth/login", params).then(res => res.data);
};

const register = (params) => {
  return API.post("/auth/register", params).then(res => res.data);
};

const getAuthUsers = (params)=>{
  const { role, page, limit } = params;
  return API.get(`https://abcstudyonline.herokuapp.com/auth/users?page=${page}&limit=${limit}&role=${role}`).then(res => res.data);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  getAuthUsers
}