import lessonsType from './lessonsType'

const initialState = {
  loading: 0,
  lessons: [],
  total: 0,
  isChanged: 1
}

export default function topicsReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  const changed = new Date().getTime()

  switch (type) {
    case lessonsType.POST_LESSON_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case lessonsType.PUT_LESSON_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case lessonsType.GET_LESSONS_SUCCESS:
      newState = Object.assign({}, state, { lessons: payload.data, total: payload.total })
      break

    case lessonsType.DELETE_LESSON_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case lessonsType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: 1 })
      break

    case lessonsType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: 0 })
      break

    default:
      newState = state
  }
  return newState
}
