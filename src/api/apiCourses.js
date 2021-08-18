/* eslint-disable no-undef */
import API from './api'

const postCourses = async (params) => {
  localStorage.setItem('contentType', 'multipart/form-data')
  const res = await API.post('/courses', params)
  return res.data
}

const putCourses = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/courses', params)
  return res.data
}

const putImageCourses = async (params) => {
  localStorage.setItem('contentType', 'multipart/form-data')
  const res = await API.put('/courses/background', params)
  return res.data
}

const getCourses = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { owner, page, limit } = params
  const res = await API.get(`/courses?owner=${owner}&page=${page}&limit=${limit}`)
  return res.data
}

const deleteCourses = async (courseID) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/courses?courseId=${courseID}`)
  return res.data
}

const publicCourse = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/courses/status', params)
  return res.data
}

const manageCourse = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/courses/operation', params)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postCourses,
  putCourses,
  putImageCourses,
  getCourses,
  deleteCourses,
  publicCourse,
  manageCourse
}
