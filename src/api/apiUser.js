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

const updateUser = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.patch('/auth/users', params)
  return res.data
}

const updateAvatar = async (params) => {
  localStorage.setItem('contentType', 'multipart/form-data')
  const res = await API.put('/auth/avatar', params)
  return res.data
}

const changePassword = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.patch('/auth/password', params)
  return res.data
}

const sendForgetPassword = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/otp/forget/send', params)
  return res.data
}

const confirmForgetPassword = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/otp/forget/confirm', params)
  return res.data
}

const forgetPassword = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.patch('/auth/forget/password', params)
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

const postAuthOtpConfirm = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/auth/otp/confirm', params)
  return res.data
}

const deleteAuthUser = async (userId) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/auth/users?userId=${userId}`)
  return res.data
}

const manageUser = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/auth/operation', params)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  getMe,
  getAuthUsers,
  postAuthOtpSend,
  deleteAuthUser,
  updateUser,
  updateAvatar,
  changePassword,
  postAuthOtpConfirm,
  sendForgetPassword,
  confirmForgetPassword,
  forgetPassword,
  manageUser
}
