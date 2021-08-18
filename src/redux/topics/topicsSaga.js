/* eslint-disable no-undef */
import { takeEvery, all, put, call } from 'redux-saga/effects'
import topicsType from './topicsType'
import httpTopics from '../../api/apiTopics'
import { Modal } from 'antd'

export default function * topicsSaga () {
  yield all([
    postTopics(),
    putTopics(),
    getTopics(),
    deleteTopics()
  ])
}

function * postTopics () {
  yield takeEvery(topicsType.POST_TOPIC, function * ({ payload }) {
    try {
      yield put({ type: topicsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpTopics.postTopics, payload)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have added new topic successfully'
        })
        yield put({ type: topicsType.POST_TOPIC_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * putTopics () {
  yield takeEvery(topicsType.PUT_TOPIC, function * ({ payload }) {
    try {
      yield put({ type: topicsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpTopics.putTopics, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have updated topic successfully'
        })
        yield put({ type: topicsType.PUT_TOPIC_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * getTopics () {
  yield takeEvery(topicsType.GET_TOPICS, function * ({ courseId, page, limit }) {
    try {
      yield put({ type: topicsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpTopics.getTopics, { courseId, page, limit })
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        yield put({ type: topicsType.GET_TOPICS_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    }
  })
}

function * deleteTopics () {
  yield takeEvery(topicsType.DELETE_TOPIC, function * ({ topicId }) {
    try {
      yield put({ type: topicsType.LOADING_SHOW, payload: {} })
      const res = yield call(httpTopics.deleteTopics, topicId)
      const { data, message } = res
      if (data !== null) {
        if (data.newToken !== undefined &&
          data.newToken !== null) {
          localStorage.setItem('token', data.newToken)
        }
        Modal.success({
          title: 'Success',
          content: 'You have deleted topic successfully'
        })
        yield put({ type: topicsType.DELETE_TOPIC_SUCCESS, payload: {} })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    } catch (e) {
      console.log(e)
      yield put({ type: topicsType.LOADING_HIDE, payload: {} })
    }
  })
}
