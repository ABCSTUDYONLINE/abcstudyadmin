/* eslint-disable no-undef */
import API from './api'

const postLesson = async (params) => {
  localStorage.setItem('contentType', 'multipart/form-data')
  const res = await API.post('/lessons', params)
  return res.data
}

const putLesson = async (params) => {
  localStorage.setItem('contentType', 'multipart/form-data')
  const res = await API.put('/lessons', params)
  return res.data
}

const getLessons = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { topicId, page, limit } = params
  const res = await API.get(`/lessons?topicId=${topicId}&page=${page}&limit=${limit}`)
  return res.data
}

const deleteLesson = async (lessonId) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/lessons?lessonId=${lessonId}`)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postLesson,
  putLesson,
  getLessons,
  deleteLesson
}
