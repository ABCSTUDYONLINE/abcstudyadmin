/* eslint-disable no-undef */
import API from './api'

const login = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/login', params)
  return res.data
}

const register = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/register', params)
  return res.data
}

const getAuthUsers = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { role, page, limit } = params
  const res = await API.get(`/auth/users?page=${page}&limit=${limit}&role=${role}`)
  return res.data
}

const getMe = async () => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.get('/users/me')
  return res.data
}

const postAuthOtpSend = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/otp/send', params)
  return res.data
}

const deleteAuthUser = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete('/auth/users', params)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  getMe,
  getAuthUsers,
  postAuthOtpSend,
  deleteAuthUser
}
