import { all } from 'redux-saga/effects';
import userSaga from './user/userSaga';
import categorySaga from './category/categorySaga';
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    userSaga(),
    categorySaga(),
  ]);
}
