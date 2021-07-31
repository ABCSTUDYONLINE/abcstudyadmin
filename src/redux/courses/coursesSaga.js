/* eslint-disable no-undef */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import coursesType from './coursesType'
import httpCourses from '../../api/apiCourses'
import { Modal } from 'antd'

export default function * userSaga () {
  yield all([
    postCourses(),
    putCourses(),
    putImageCourses(),
    getCourses(),
    gotoTopic(),
    deleteCourses(),
    gobackTopic(),
    gotoLesson(),
    gobackCourse()
  ])
}

function * postCourses () {
  yield takeEvery(coursesType.POST_COURSES, function * ({ payload }) {
    try {
      yield put({ type: coursesType.LOADING_SHOW, payload: {} })
      const res = yield call(httpCourses.postCourses, payload)
      const { data, message } = res
      if (data !== null) {
        Modal.success({
          title: 'Success',
          content: 'You have added new courses successfully'
        })
        yield put({ type: coursesType.POST_COURSES_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    }
  })
}

function * putCourses () {
  yield takeEvery(coursesType.PUT_COURSES, function * ({ payload }) {
    try {
      yield put({ type: coursesType.LOADING_SHOW, payload: {} })
      const res = yield call(httpCourses.putCourses, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
        Modal.success({
          title: 'Success',
          content: 'You have updated courses successfully'
        })
        yield put({ type: coursesType.PUT_COURSES_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    }
  })
}

function * putImageCourses () {
  yield takeEvery(coursesType.PUT_IMAGE_COURSES, function * ({ payload }) {
    try {
      yield put({ type: coursesType.LOADING_SHOW, payload: {} })
      const res = yield call(httpCourses.putImageCourses, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
        Modal.success({
          title: 'Success',
          content: 'You have updated image courses successfully'
        })
        yield put({ type: coursesType.PUT_IMAGE_COURSES_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    }
  })
}

function * getCourses () {
  yield takeEvery(coursesType.GET_COURSES, function * ({ owner, page, limit }) {
    try {
      yield put({ type: coursesType.LOADING_SHOW, payload: {} })
      const res = yield call(httpCourses.getCourses, { owner, page, limit })
      const { data, message } = res
      if (data !== null) {
        yield put({ type: coursesType.GET_COURSES_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    }
  })
}

function * deleteCourses () {
  yield takeEvery(coursesType.DELETE_COURSES, function * ({ courseId }) {
    try {
      yield put({ type: coursesType.LOADING_SHOW, payload: {} })
      const res = yield call(httpCourses.deleteCourses, courseId)
      const { data, message } = res
      if (data !== null) {
        Modal.success({
          title: 'Success',
          content: 'You have deleted courses successfully'
        })
        yield put({ type: coursesType.DELETE_COURSES_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: coursesType.LOADING_HIDE, payload: {} })
    }
  })
}

function * gotoTopic () {
  yield takeEvery(coursesType.GO_TO_TOPIC, function * ({ courseId }) {
    if (courseId !== '') {
      yield put({ type: coursesType.GO_TO_TOPIC_SUCCESS, payload: { courseId: courseId } })
    }
  })
}

function * gobackTopic () {
  yield takeEvery(coursesType.GO_BACK_TOPIC, function * () {
    try {
      yield put({ type: coursesType.GO_BACK_TOPIC_SUCCESS, payload: {} })
    } catch (e) { console.log(e) }
  })
}

function * gotoLesson () {
  yield takeEvery(coursesType.GO_TO_LESSON, function * ({ topicId }) {
    try {
      if (topicId !== '') {
        yield put({ type: coursesType.GO_TO_LESSON_SUCCESS, payload: { topicId: topicId } })
      }
    } catch (e) { console.log(e) }
  })
}

function * gobackCourse () {
  yield takeEvery(coursesType.GO_BACK_COURSE, function * () {
    try {
      yield put({ type: coursesType.GO_BACK_COURSE_SUCCESS, payload: {} })
    } catch (e) { console.log(e) }
  })
}
