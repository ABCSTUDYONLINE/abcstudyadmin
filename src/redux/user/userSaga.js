import { takeEvery, all, put, call } from 'redux-saga/effects';
import userType from './userType';
import httpUser from '../../api/apiUser';
import { Modal } from 'antd'

export default function* userSaga() {
  yield all([
    signIn(),
    signOut(),
    register(),
    getAuthUsers()
  ]);
}

function* signIn() {
  yield takeEvery(userType.SIGN_IN, function* ({ payload, history }) {
    try {
      const res = yield call(httpUser.login, payload); // api call
      const { status } = res;
      // if (status === 'ok') {
      yield put({ type: userType.SIGN_IN_SUCCESS, payload: res });
      history.push('/dashboard/categories');
      // } else {
      //   const { message } = res.data;
      //   Modal.error({
      //     title: 'Error',
      //     content: `${message}!`,
      //   });
      // }
    } catch (e) { console.log(e) }
  });
}

function* register() {
  yield takeEvery(userType.REGISTER, function* ({ payload }) {
    try {
      const res = yield call(httpUser.register, payload); // api cal
      const { message } = res;
      if (!message) {
        yield put({ type: userType.REGISTER_SUCCESS, payload: res });

        const { email } = payload;
        yield call(httpUser.postAuthOtpSend, {email: email});

        Modal.info({
          title: 'Successfull',
          content: `Register successful! Please check email to login .`,
        })
      } else {
        const { message } = res.data;
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}


function* signOut() {
  yield takeEvery(userType.SIGN_OUT, function* ({ history }) {
    try {
      history.push('/login');
      yield put({ type: userType.SIGN_OUT_SUCCESS, payload: null });
    } catch (e) { console.log(e) }
  });
}

function* getAuthUsers() {
  yield takeEvery(userType.GET_AUTT_USERS, function* ({ page, limit, role }) {
    try {
      const res = yield call(httpUser.getAuthUsers, { page, limit, role });
      const { data, message } = res;
      if (message === 'Success!') {
        yield put({ type: userType.GET_AUTT_USERS_SUCCESS, payload: { data: res.data.list, total: res.data.total } });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}