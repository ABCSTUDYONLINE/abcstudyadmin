/* eslint-disable no-undef */
import API from './api'

const postCategories = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/categories', params)
  return res.data
}

const putCategories = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/categories', params)
  return res.data
}

const getCategories = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { page, limit } = params
  const res = await API.get(`/categories?page=${page}&limit=${limit}`)
  return res.data
}

const deleteCategories = async (categoryID) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/categories?categoryId=${categoryID}`)
  return res.data
}

const getCategoriesDetailCategory = async (categoryID) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.get(`/categories/detailCategory?categoryId=${categoryID}`)
  return res.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postCategories,
  putCategories,
  getCategories,
  deleteCategories,
  getCategoriesDetailCategory
}
