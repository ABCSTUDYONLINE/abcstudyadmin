import coursesType from './coursesType';


const initialState = {
  loading: 0,
  courses: [],
  total: 0,
  isChanged: 1
};

export default function coursesReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;
  const changed = new Date().getTime()
  
  switch (type) {
    case coursesType.POST_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case coursesType.PUT_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case coursesType.GET_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { courses: payload.data, total: payload.total });
      break;

    case coursesType.DELETE_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case coursesType.PUT_IMAGE_COURSES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    default:
      newState = state;
  }
  return newState;
}