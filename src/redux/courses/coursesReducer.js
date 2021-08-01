/* eslint-disable no-undef */
import coursesType from './coursesType'

const initialState = {
  loading: 0,
  courses: [],
  total: 0,
  isChanged: 1,
  goto: 0,
  courseId: '',
  topicId: ''
}

export default function coursesReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  const changed = new Date().getTime()

  switch (type) {
    case coursesType.POST_COURSES_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case coursesType.PUT_COURSES_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case coursesType.GET_COURSES_SUCCESS:
      newState = Object.assign({}, state, { courses: payload.data, total: payload.total })
      break

    case coursesType.DELETE_COURSES_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case coursesType.PUT_IMAGE_COURSES_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case coursesType.GO_TO_TOPIC_SUCCESS:
      newState = Object.assign({}, state, { goto: 1, courseId: payload.courseId })
      break

    case coursesType.GO_BACK_TOPIC_SUCCESS:
      newState = Object.assign({}, state, { goto: 1 })
      break

    case coursesType.GO_TO_LESSON_SUCCESS:
      newState = Object.assign({}, state, { goto: 2, topicId: payload.topicId })
      break

    case coursesType.GO_BACK_COURSE_SUCCESS:
      newState = Object.assign({}, state, { goto: 0 })
      break

    case coursesType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: 1 })
      break

    case coursesType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: 0 })
      break

    case coursesType.TO_PUBLIC_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    default:
      newState = state
  }
  return newState
}
