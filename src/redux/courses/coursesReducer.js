import coursesType from './coursesType';


const initialState = {
  loading: 0,
  courses: [],
  total: 0
};

export default function coursesReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case coursesType.POST_COURSES_SUCCESS:
      // const { } = payload
      break;

    case coursesType.PUT_COURSES_SUCCESS:
      const { } = payload
      break;

    case coursesType.GET_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { courses: payload.data, total: payload.total });
      break;

    case coursesType.DELETE_COURSES_SUCCESS:
      const { } = payload
      break;

    default:
      newState = state;
  }
  return newState;
}