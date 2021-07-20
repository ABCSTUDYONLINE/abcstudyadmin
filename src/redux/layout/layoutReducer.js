import layoutType from './layoutType';


const initialState = {
  loading: 0,
  error: null
};

export default function userReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case layoutType.ERROR_SUCCESS:
      newState = Object.assign({}, state, { error: payload });
      break;
    case layoutType.LOADING_SHOW_SUCCESS:
      let newLoading1 = state.loading + 1
      newState = Object.assign({}, state, { loading: newLoading1 < 0 ? 0 : newLoading1 });
      break;
    case layoutType.LOADING_HIDE_SUCCESS:
      let newLoading2 = state.loading - 1
      newState = Object.assign({}, state, { loading: newLoading2 < 0 ? 0 : newLoading2  });
      break;
    default:
      newState = state;
  }
  return newState;
}