import { takeEvery, all, put, call } from 'redux-saga/effects';
import coursesType from './coursesType';
import httpCourses from '../../api/apiCourses';
import { Modal } from 'antd'

export default function* userSaga() {
  yield all([
    postCourses(),
    putCourses(),
    getCourses(),
    deleteCourses(),
  ]);
}

function* postCourses() {
  yield takeEvery(coursesType.POST_COURSES, function* ({ payload }) {
    try {
      const res = yield call(httpCourses.postCourses, payload);
      const { data, message } = res;
      if (message === 'Success!') {
        Modal.success({
          title: 'Success',
          content: 'You have added new courses successfully',
        });
        yield put({ type: coursesType.POST_COURSES_SUCCESS, payload: {} });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}

function* putCourses() {
  yield takeEvery(coursesType.PUT_COURSES, function* ({ payload }) {
    try {
      const res = yield call(httpCourses.putCourses, payload);
      const { data, message } = res;
      console.log(res)
      if (message === 'This courses has updated success!') {
        Modal.success({
          title: 'Success',
          content: 'You have updated courses successfully',
        });
        yield put({ type: coursesType.PUT_COURSES_SUCCESS, payload: {} });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}

function* getCourses() {
  yield takeEvery(coursesType.GET_COURSES, function* ({ owner, page, limit }) {
    try {
      const res = yield call(httpCourses.getCourses, { owner, page, limit });
      const { data, message } = res;
      if (message === 'Success!') {
        yield put({ type: coursesType.GET_COURSES_SUCCESS, payload: { data: res.data.list, total: res.data.total } });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}

function* deleteCourses() {
  yield takeEvery(coursesType.DELETE_COURSES, function* ({ coursesID }) {
    try {
      const res = yield call(httpCourses.deleteCourses, coursesID);
      const { data, message } = res;
      console.log(res)
      if (message === 'Delete success!') {
        Modal.success({
          title: 'Success',
          content: 'You have deleted courses successfully',
        });
        yield put({ type: coursesType.DELETE_COURSES_SUCCESS, payload: {} });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}
