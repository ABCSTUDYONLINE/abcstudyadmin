import userType from './userType'

export function signIn ({ payload, history, dispatch }) {
  return {
    type: userType.SIGN_IN,
    payload,
    history,
    dispatch
  }
}

export function getMe ({ payload, history }) {
  return {
    type: userType.GET_ME,
    payload,
    history
  }
}

export function register (payload) {
  return {
    type: userType.REGISTER,
    payload
  }
}

export function signOut (history) {
  return {
    type: userType.SIGN_OUT,
    history: history
  }
}
export function getAuthUsers (page, limit, role) {
  return {
    type: userType.GET_AUTT_USERS,
    page: page,
    limit: limit,
    role: role
  }
}

export function deleteAuthUser (userId) {
  return {
    type: userType.DELETE_AUTH_USERS,
    userId: userId
  }
}

export function updateUser (payload) {
  return {
    type: userType.UPDATE,
    payload
  }
}

export function postAuthOtpSend (payload) {
  return {
    type: userType.OTP_SEND,
    payload
  }
}

export function postAuthOtpConfirm (payload) {
  return {
    type: userType.OTP_CONFIRM,
    payload
  }
}

export function updateAvatar (payload) {
  return {
    type: userType.UPDATE_AVATAR,
    payload
  }
}

export function changePassword (history, payload) {
  return {
    type: userType.CHANGE_PASSWORD,
    history,
    payload
  }
}

export function sendForgetPassword (payload) {
  return {
    type: userType.OTP_SEND_FORGET_PASS,
    payload
  }
}

export function confirmForgetPassword (payload) {
  return {
    type: userType.OTP_CONFIRM_FORGET_PASS,
    payload
  }
}

export function forgetPassword (payload) {
  return {
    type: userType.FORGET_PASS,
    payload
  }
}

export function showProfile (isAvatar) {
  return {
    type: userType.SHOW_PROFILE,
    isAvatar
  }
}

export function hideProfile () {
  return {
    type: userType.HIDE_PROFILE
  }
}

export function updateOperationUser (payload) {
  return {
    type: userType.UPDATE_OPERATION_USER,
    payload: payload
  }
}
