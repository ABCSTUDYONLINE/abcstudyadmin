/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import userType from './userType'
import httpUser from '../../api/apiUser'
import { Modal } from 'antd'

export default function * userSaga () {
  yield all([
    signIn(),
    getMe(),
    signOut(),
    register(),
    getAuthUsers(),
    deleteAuthUser()
  ])
}

function * signIn () {
  yield takeEvery(userType.SIGN_IN, function * ({ payload, history }) {
    try {
      yield put({ type: userType.SIGN_IN_ERROR, payload: { message: '' } })
      const res = yield call(httpUser.login, payload) // api call
      const { data } = res
      if (data !== null) {
        yield put({ type: userType.SIGN_IN_SUCCESS, payload: res })
      } else {
        yield put({ type: userType.SIGN_IN_ERROR, payload: res })
      }
    } catch (e) { console.log(e) }
  })
}

function * getMe () {
  yield takeEvery(userType.GET_ME, function * ({ payload, history }) {
    try {
      const res = yield call(httpUser.getMe) // api call
      const { data } = res
      if (data !== null) {
        localStorage.setItem('profile', JSON.stringify(data))
        yield put({ type: userType.GET_ME_SUCCESS, payload: data })
      } else {
        const { message } = res.data
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
    } catch (e) { console.log(e) }
  })
}

function * register () {
  yield takeEvery(userType.REGISTER, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.register, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        yield put({ type: userType.REGISTER_SUCCESS, payload: res })
        Modal.info({
          title: 'Successfull',
          content: 'Register successful! Please check email to login .'
        })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    }
  })
}

function * signOut () {
  yield takeEvery(userType.SIGN_OUT, function * ({ history }) {
    try {
      history.push('/login')
      yield put({ type: userType.SIGN_OUT_SUCCESS, payload: null })
    } catch (e) { console.log(e) }
  })
}

function * getAuthUsers () {
  yield takeEvery(userType.GET_AUTT_USERS, function * ({ page, limit, role }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.getAuthUsers, { page, limit, role })
      const { data, message } = res
      if (message === 'Success!') {
        yield put({ type: userType.GET_AUTT_USERS_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    }
  })
}

function * deleteAuthUser () {
  yield takeEvery(userType.DELETE_AUTH_USERS, function * ({ userId }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.deleteAuthUser, userId) // api cal
      const { data, message } = res
      if (data !== null) {
        yield put({ type: userType.DELETE_AUTH_USERS_SUCCESS, payload: res })
        Modal.info({
          title: 'Successfull',
          content: 'Delete user successfull ! .'
        })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: userType.LOADING_HIDE, payload: {} })
    }
  })
}
