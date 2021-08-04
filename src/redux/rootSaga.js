import { all } from 'redux-saga/effects'
import userSaga from './user/userSaga'
import categorySaga from './category/categorySaga'
import coursesSaga from './courses/coursesSaga'
import topicsSaga from './topics/topicsSaga'
import lessonsSaga from './lessons/lessonsSaga'
import layoutSaga from './layout/layoutSaga'
import promotionsSaga from './promotions/promotionsSaga'
// single entry point to start all Sagas at once
export default function * rootSaga () {
  yield all([
    userSaga(),
    categorySaga(),
    coursesSaga(),
    topicsSaga(),
    lessonsSaga(),
    layoutSaga(),
    promotionsSaga()
  ])
}
