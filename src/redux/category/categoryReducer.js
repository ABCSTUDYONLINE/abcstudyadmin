import categoryType from './categoryType';


const initialState = {
  loading: 0,
  categories: [],
  total: 0,
  isChanged: 1
};

export default function categoryReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;
  const changed = new Date().getTime()

  switch (type) {
    case categoryType.POST_CATEGORIES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case categoryType.PUT_CATEGORIES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case categoryType.GET_CATEGORIES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { categories: payload.data, total: payload.total });
      break;

    case categoryType.DELETE_CATEGORIES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { isChanged: changed });
      break;

    case categoryType.GET_CATEGORIES_DETAIL_CATEGORY_SUCCESS:
      const { } = payload
      break;

    default:
      newState = state;
  }
  return newState;
}