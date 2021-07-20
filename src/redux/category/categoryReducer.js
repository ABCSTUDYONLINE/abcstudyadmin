import categoryType from './categoryType';


const initialState = {
  loading: 0,
  categories: [],
  total: 0
};

export default function categoryReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case categoryType.POST_CATEGORIES_SUCCESS:
      // const { } = payload
      break;

    case categoryType.PUT_CATEGORIES_SUCCESS:
      const { } = payload
      break;

    case categoryType.GET_CATEGORIES_SUCCESS:
      const { } = payload
      newState = Object.assign({}, state, { categories: payload.data, total: payload.total });
      break;

    case categoryType.DELETE_CATEGORIES_SUCCESS:
      const { } = payload
      break;

    case categoryType.GET_CATEGORIES_DETAIL_CATEGORY_SUCCESS:
      const { } = payload
      break;

    default:
      newState = state;
  }
  return newState;
}