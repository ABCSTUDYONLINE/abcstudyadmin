import layoutType from './layoutType'
import { all, takeEvery, put } from 'redux-saga/effects'

export default function * layoutSaga () {
  yield all([
    showLoading(),
    hideLoading(),
    handleError()
  ])
}

function * showLoading () {
  yield takeEvery(layoutType.LOADING_SHOW, function * () {
    try {
      yield put({ type: layoutType.LOADING_SHOW_SUCCESS })
    } catch (e) { console.log(e) }
  })
}

function * hideLoading () {
  yield takeEvery(layoutType.LOADING_HIDE, function * () {
    try {
      yield put({ type: layoutType.LOADING_HIDE_SUCCESS })
    } catch (e) { console.log(e) }
  })
}

function * handleError () {
  yield takeEvery(layoutType.ERROR, function * ({ payload }) {
    try {
      yield put({ type: layoutType.ERROR_SUCCESS, payload })
    } catch (e) { console.log(e) }
  })
}
