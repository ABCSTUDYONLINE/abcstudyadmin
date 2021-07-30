const _prefix = '@user/'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  SIGN_IN: _prefix + 'SIGN_IN',
  SIGN_IN_SUCCESS: _prefix + 'SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: _prefix + 'SIGN_IN_ERROR',

  GET_ME: _prefix + 'GET_ME',
  GET_ME_SUCCESS: _prefix + 'GET_ME_SUCCESS',

  REGISTER: _prefix + 'REGISTER',
  REGISTER_SUCCESS: _prefix + 'REGISTER_SUCCESS',

  SIGN_OUT: _prefix + 'SIGN_OUT',
  SIGN_OUT_SUCCESS: _prefix + 'SIGN_OUT_SUCCESS',

  GET_AUTT_USERS: _prefix + 'GET_AUTT_USERS',
  GET_AUTT_USERS_SUCCESS: _prefix + 'GET_AUTT_USERS_SUCCESS',

  DELETE_AUTH_USERS: _prefix + 'DELETE_AUTH_USERS',
  DELETE_AUTH_USERS_SUCCESS: _prefix + 'DELETE_AUTH_USERS_SUCCESS',

  LOADING_SHOW: _prefix + 'LOADING_SHOW',
  LOADING_HIDE: _prefix + 'LOADING_HIDE'
}
