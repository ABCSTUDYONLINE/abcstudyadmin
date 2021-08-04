/* eslint-disable no-undef */
import API from './api'

const postTopics = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/topics', params)
  return res.data
}

const putTopics = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/topics', params)
  return res.data
}

const getTopics = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { courseId, page, limit } = params
  const res = await API.get(`/topics?courseId=${courseId}&page=${page}&limit=${limit}`)
  return res.data
}

const deleteTopics = async (topicId) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/topics?topicId=${topicId}`)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postTopics,
  putTopics,
  getTopics,
  deleteTopics
}
