/* eslint-disable no-undef */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import promotionsType from './promotionsType'
import httpPromotion from '../../api/apiPromotion'
import { Modal } from 'antd'

export default function * promotionsSaga () {
  yield all([
    postPromotion(),
    putPromotion(),
    getPromotions(),
    deletePromotion()
  ])
}

function * postPromotion () {
  yield takeEvery(promotionsType.POST_PROMOTION, function * ({ payload }) {
    try {
      yield put({ type: promotionsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpPromotion.postPromotion, payload)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have added promotion successfully'
        })
        yield put({ type: promotionsType.POST_PROMOTION_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * putPromotion () {
  yield takeEvery(promotionsType.PUT_PROMOTION, function * ({ payload }) {
    try {
      yield put({ type: promotionsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpPromotion.putPromotion, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have updated promotion successfully'
        })
        yield put({ type: promotionsType.PUT_PROMOTION_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * getPromotions () {
  yield takeEvery(promotionsType.GET_PROMOTIONS, function * ({ page, limit }) {
    try {
      yield put({ type: promotionsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpPromotion.getPromotions, { page, limit })
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        yield put({ type: promotionsType.GET_PROMOTIONS_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * deletePromotion () {
  yield takeEvery(promotionsType.DELETE_PROMOTION, function * ({ promotionId }) {
    try {
      yield put({ type: promotionsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpPromotion.deletePromotion, promotionId)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have deleted promotion successfully'
        })
        yield put({ type: promotionsType.DELETE_PROMOTION_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: promotionsType.LOADING_HIDE, payload: {} })
    }
  })
}
