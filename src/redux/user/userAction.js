import userType from './userType';

export function signIn({ payload, history, dispatch }) {
  return {
    type: userType.SIGN_IN,
    payload,
    history,
    dispatch
  };
}

export function register({ payload, history, dispatch }) {
  return {
    type: userType.REGISTER,
    payload,
    history,
    dispatch
  };
}

export function signOut(history) {
  return {
    type: userType.SIGN_OUT,
    history: history,
  };
}