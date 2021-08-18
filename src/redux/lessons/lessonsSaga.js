/* eslint-disable no-undef */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import lessonsType from './lessonsType'
import httpLessons from '../../api/apiLessons'
import { Modal } from 'antd'

export default function * topicsSaga () {
  yield all([
    postTopic(),
    putTopic(),
    getLessons(),
    deleteLesson()
  ])
}

function * postTopic () {
  yield takeEvery(lessonsType.POST_LESSON, function * ({ payload }) {
    try {
      yield put({ type: lessonsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpLessons.postLesson, payload)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have added new lesson successfully'
        })
        yield put({ type: lessonsType.POST_LESSON_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * putTopic () {
  yield takeEvery(lessonsType.PUT_LESSON, function * ({ payload }) {
    try {
      yield put({ type: lessonsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpLessons.putLesson, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have updated lesson successfully'
        })
        yield put({ type: lessonsType.PUT_LESSON_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * getLessons () {
  yield takeEvery(lessonsType.GET_LESSONS, function * ({ topicId, page, limit }) {
    try {
      yield put({ type: lessonsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpLessons.getLessons, { topicId, page, limit })
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        yield put({ type: lessonsType.GET_LESSONS_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * deleteLesson () {
  yield takeEvery(lessonsType.DELETE_LESSON, function * ({ lessonId }) {
    try {
      yield put({ type: lessonsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpLessons.deleteLesson, lessonId)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have deleted lesson successfully'
        })
        yield put({ type: lessonsType.DELETE_LESSON_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: lessonsType.LOADING_HIDE, payload: {} })
    }
  })
}
