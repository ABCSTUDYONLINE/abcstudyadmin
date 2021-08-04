/* eslint-disable no-undef */
import API from './api'

const postPromotion = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.post('/promotions', params)
  return res.data
}

const putPromotion = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.put('/promotions', params)
  return res.data
}

const getPromotions = async (params) => {
  localStorage.setItem('contentType', 'application/json')
  const { page, limit } = params
  const res = await API.get(`/promotions?page=${page}&limit=${limit}`)
  return res.data
}

const deletePromotion = async (promotionId) => {
  localStorage.setItem('contentType', 'application/json')
  const res = await API.delete(`/promotions?promotionId=${promotionId}`)
  return res.data
}

export default {
  postPromotion,
  putPromotion,
  getPromotions,
  deletePromotion
}
