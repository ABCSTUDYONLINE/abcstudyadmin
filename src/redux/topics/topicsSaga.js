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
      const res = yield call(httpTopics.postTopics, payload)
      const { data, message } = res
      if (data !== null) {
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
    } catch (e) { console.log(e) }
  })
}

function * putTopics () {
  yield takeEvery(topicsType.PUT_TOPIC, function * ({ payload }) {
    try {
      const res = yield call(httpTopics.putTopics, payload)
      const { data, message } = res
      console.log(res)
      if (data !== null) {
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
    } catch (e) { console.log(e) }
  })
}

function * getTopics () {
  yield takeEvery(topicsType.GET_TOPICS, function * ({ courseId, page, limit }) {
    try {
      const res = yield call(httpTopics.getTopics, { courseId, page, limit })
      const { data, message } = res
      if (data !== null) {
        yield put({ type: topicsType.GET_TOPICS_SUCCESS, payload: { data: res.data.list, total: res.data.total } })
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`
        })
      }
    } catch (e) { console.log(e) }
  })
}

function * deleteTopics () {
  yield takeEvery(topicsType.DELETE_TOPIC, function * ({ topicId }) {
    try {
      const res = yield call(httpTopics.deleteTopics, topicId)
      const { data, message } = res
      if (data !== null) {
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
    } catch (e) { console.log(e) }
  })
}
