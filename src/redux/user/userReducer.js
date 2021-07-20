import userType from './userType';


const initialState = {
  loading: 0,
  token: '',
  userId: ''
};

export default function userReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case userType.SIGN_IN_SUCCESS:
      const { accessToken } = payload
      console.log("accessToken",accessToken)
      console.log("payload",payload)
      // localStorage.setItem('userId', userId);
      localStorage.setItem('token', accessToken);
      // localStorage.setItem('fullName', fullName);

      newState = Object.assign({}, state, { token: accessToken });
      break;
    case userType.SIGN_OUT_SUCCESS:
      // localStorage.removeItem("userId");
      localStorage.removeItem("token");
      // localStorage.removeItem("fullName");
      break;

    case userType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: state.loading++ });
      break;
    case userType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: state.loading-- });
      break;
    default:
      newState = state;
  }
  return newState;
}