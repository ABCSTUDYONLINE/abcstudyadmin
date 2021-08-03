import promotionsType from './promotionsType'

const initialState = {
  loading: 0,
  promotions: [],
  total: 0,
  isChanged: 1
}

export default function promotionsReducer (state = initialState, action) {
  let newState
  const { type, payload = {} } = action
  const changed = new Date().getTime()

  switch (type) {
    case promotionsType.POST_PROMOTION_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case promotionsType.PUT_PROMOTION_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case promotionsType.GET_PROMOTIONS_SUCCESS:
      console.log(payload.data)
      newState = Object.assign({}, state, { promotions: payload.data, total: payload.total })
      break

    case promotionsType.DELETE_PROMOTION_SUCCESS:
      newState = Object.assign({}, state, { isChanged: changed })
      break

    case promotionsType.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: 1 })
      break

    case promotionsType.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: 0 })
      break

    default:
      newState = state
  }
  return newState
}
