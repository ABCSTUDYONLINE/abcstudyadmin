/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
import userType from './userType'

const initialState = {
  loading: 0,
  token: '',
  message: '',
  userId: '',
  users: [],
  total: 0,
  isChanged: 1,
  profile: null,
  showProfile: 0,
  isAvatar: false,
  sendSuccess: false,
  confirmSuccess: false,
  forgetPassValue: 0
}

export default function userReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  const changed = new Date().getTime()
  switch (type) {
    case userType.SIGN_IN_SUCCESS:
      const { data } = payload
      newState = Object.assign({}, state, { token: data.accessToken })
      break

    case userType.SIGN_IN_ERROR:
      const { message } = payload
      newState = Object.assign({}, state, { message: message })
      break

    case userType.GET_ME_SUCCESS:
      newState = Object.assign({}, state, { profile: payload })
      break

    case userType.REGISTER_SUCCESS:
      newState = Object.assign({}, state, {})
      break

    case userType.UPDATE_SUCCESS:
      newState = Object.assign({}, state, { profile: payload })
      break

    case userType.OTP_SEND_SUCCESS:
      newState = Object.assign({}, state, { sendSuccess: !state.sendSuccess })
      break

    case userType.OTP_CONFIRM_SUCCESS:
      newState = Object.assign({}, state, { confirmSuccess: !state.confirmSuccess })
      break

    case userType.UPDATE_AVATAR_SUCCESS:
      newState = Object.assign({}, state, { profile: payload })
      break

    case userType.SIGN_OUT_SUCCESS:
      localStorage.removeItem('token')
      localStorage.removeItem('profile')
      break

    case userType.GET_AUTT_USERS_SUCCESS:
      newState = Object.assign({}, state, { users: payload.data, total: payload.total })
      break

    case userType.DELETE_AUTH_USERS_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case userType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: 1 })
      break

    case userType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: 0 })
      break

    case userType.SHOW_PROFILE_SUCCESS:
      newState = Object.assign({}, state, { showProfile: 1, isAvatar: payload.isAvatar })
      break

    case userType.HIDE_PROFILE_SUCCESS:
      newState = Object.assign({}, state, { showProfile: 0 })
      break

    case userType.OTP_SEND_FORGET_PASS_SUCCESS:
      newState = Object.assign({}, state, { forgetPassValue: 1 })
      break

    case userType.OTP_CONFIRM_FORGET_PASS_SUCCESS:
      newState = Object.assign({}, state, { forgetPassValue: 2 })
      break

    case userType.FORGET_PASS_SUCCESS:
      newState = Object.assign({}, state, { })
      break

    default:
      newState = state
  }
  return newState
}
