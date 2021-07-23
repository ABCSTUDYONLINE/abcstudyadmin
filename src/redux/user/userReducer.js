import userType from './userType';


const initialState = {
  loading: 0,
  token: '',
  userId: '',
  users: [],
  total: 0
};

export default function userReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case userType.SIGN_IN_SUCCESS:
      const { accessToken } = payload
      localStorage.setItem('token', accessToken);
      newState = Object.assign({}, state, { token: accessToken });
      break;

    case userType.REGISTER_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, {});
      break;

    case userType.SIGN_OUT_SUCCESS:
      localStorage.removeItem("token");
      break;

    case userType.GET_AUTT_USERS_SUCCESS:
      newState = Object.assign({}, state, { users: payload.data, total: payload.total });
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