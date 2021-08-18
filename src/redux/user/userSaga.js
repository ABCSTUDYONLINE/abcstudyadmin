/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import userType from './userType'
import httpUser from '../../api/apiUser'
import { Modal } from 'antd'
import { confirmForgetPassword, forgetPassword, sendForgetPassword } from './userAction'

export default function * userSaga () {
  yield all([
    signIn(),
    getMe(),
    signOut(),
    register(),
    getAuthUsers(),
    deleteAuthUser(),
    updateUser(),
    showProfile(),
    hideProfile(),
    updateAvatar(),
    changePassword(),
    postAuthOtpSend(),
    postAuthOtpConfirm(),
    postOtpSendForgetPass(),
    postOtpConfirmForgetPass(),
    postForgetPass(),
    updateOperationUser()
  ])
}

function * signIn () {
  yield takeEvery(userType.SIGN_IN, function * ({ payload, history }) {
    try {
      yield put({ type: userType.SIGN_IN_ERROR, payload: { message: '' } })
      const res = yield call(httpUser.login, payload) // api call
      const { data, message } = res
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
      const { data, message } = res
      if (data !== null) {
        localStorage.setItem('profile', JSON.stringify(data))
        yield put({ type: userType.GET_ME_SUCCESS, payload: data })
      } else {
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
        Modal.success({
          title: 'Successfull',
          content: 'Register successful!'
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

function * updateUser () {
  yield takeEvery(userType.UPDATE, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.updateUser, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.setItem('profile', JSON.stringify(data))
        yield put({ type: userType.UPDATE_SUCCESS, payload: data })
        Modal.success({
          title: 'Successfull',
          content: 'Update successful!'
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

function * postAuthOtpSend () {
  yield takeEvery(userType.OTP_SEND, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.postAuthOtpSend, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.setItem('email', JSON.stringify(payload.email))
        yield put({ type: userType.OTP_SEND_SUCCESS, payload: data })
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

function * postAuthOtpConfirm () {
  yield takeEvery(userType.OTP_CONFIRM, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.postAuthOtpConfirm, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.removeItem('email')
        yield put({ type: userType.OTP_CONFIRM_SUCCESS, payload: data })
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

function * postOtpSendForgetPass () {
  yield takeEvery(userType.OTP_SEND_FORGET_PASS, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.sendForgetPassword, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.setItem('username', JSON.stringify(payload.username))
        yield put({ type: userType.OTP_SEND_FORGET_PASS_SUCCESS, payload: data })
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

function * postOtpConfirmForgetPass () {
  yield takeEvery(userType.OTP_CONFIRM_FORGET_PASS, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.confirmForgetPassword, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        yield put({ type: userType.OTP_CONFIRM_FORGET_PASS_SUCCESS, payload: data })
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

function * postForgetPass () {
  yield takeEvery(userType.FORGET_PASS, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.forgetPassword, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.removeItem('username')
        yield put({ type: userType.FORGET_PASS_SUCCESS, payload: data })
        Modal.success({
          title: 'Successfull',
          content: 'Update successful!'
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

function * updateAvatar () {
  yield takeEvery(userType.UPDATE_AVATAR, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.updateAvatar, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        localStorage.setItem('profile', JSON.stringify(data))
        yield put({ type: userType.UPDATE_AVATAR_SUCCESS, payload: data })
        Modal.success({
          title: 'Successfull',
          content: 'Update successful!'
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

function * changePassword () {
  yield takeEvery(userType.CHANGE_PASSWORD, function * ({ history, payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.changePassword, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        Modal.info({
          title: 'Successfull',
          content: 'Change password successful. Please login again!',
          onOk () {
            history.push('/login')
          }
        })
        yield put({ type: userType.SIGN_OUT_SUCCESS, payload: null })
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

function * getAuthUsers () {
  yield takeEvery(userType.GET_AUTT_USERS, function * ({ page, limit, role }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.getAuthUsers, { page, limit, role })
      const { data, message } = res
      if (data !== null) {
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
        Modal.success({
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

function * showProfile () {
  yield takeEvery(userType.SHOW_PROFILE, function * ({ isAvatar }) {
    try {
      yield put({ type: userType.SHOW_PROFILE_SUCCESS, payload: { isAvatar: isAvatar } })
    } catch (e) { console.log(e) }
  })
}

function * hideProfile () {
  yield takeEvery(userType.HIDE_PROFILE, function * () {
    try {
      yield put({ type: userType.HIDE_PROFILE_SUCCESS })
    } catch (e) { console.log(e) }
  })
}

function * updateOperationUser () {
  yield takeEvery(userType.UPDATE_OPERATION_USER, function * ({ payload }) {
    try {
      yield put({ type: userType.LOADING_SHOW, payload: {} })
      const res = yield call(httpUser.manageUser, payload) // api cal
      const { data, message } = res
      if (data !== null) {
        yield put({ type: userType.UPDATE_OPERATION_USER_SUCCESS, payload: data })
        Modal.success({
          title: 'Successfull',
          content: `You have ${payload.operation} this user successful!`
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
