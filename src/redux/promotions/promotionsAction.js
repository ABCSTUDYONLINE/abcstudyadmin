import promotionsType from './promotionsType'

export function postPromotion (payload) {
  return {
    type: promotionsType.POST_PROMOTION,
    payload: payload
  }
}

export function putPromotion (payload) {
  return {
    type: promotionsType.PUT_PROMOTION,
    payload: payload
  }
}

export function getPromotions (page, limit) {
  return {
    type: promotionsType.GET_PROMOTIONS,
    page: page,
    limit: limit
  }
}

export function deletePromotion (promotionId) {
  return {
    type: promotionsType.DELETE_PROMOTION,
    promotionId: promotionId
  }
}
