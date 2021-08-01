/* eslint-disable no-undef */
import layoutType from './layoutType'

const initialState = {
  loading: 0,
  error: null
}

export default function userReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  switch (type) {
    case layoutType.ERROR_SUCCESS:
      newState = Object.assign({}, state, { error: payload })
      break
    case layoutType.LOADING_SHOW_SUCCESS:
      newState = Object.assign({}, state, { loading: 1 })
      break
    case layoutType.LOADING_HIDE_SUCCESS:
      newState = Object.assign({}, state, { loading: 0 })
      break
    default:
      newState = state
  }
  return newState
}
