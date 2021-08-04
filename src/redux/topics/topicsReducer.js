import topicsType from './topicsType'

const initialState = {
  loading: 0,
  topics: [],
  total: 0,
  isChanged: 1
}

export default function topicsReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  const changed = new Date().getTime()

  switch (type) {
    case topicsType.POST_TOPIC_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case topicsType.PUT_TOPIC_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case topicsType.GET_TOPICS_SUCCESS:
      newState = Object.assign({}, state, { topics: payload.data, total: payload.total })
      break

    case topicsType.DELETE_TOPIC_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case topicsType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: 1 })
      break

    case topicsType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: 0 })
      break

    default:
      newState = state
  }
  return newState
}
