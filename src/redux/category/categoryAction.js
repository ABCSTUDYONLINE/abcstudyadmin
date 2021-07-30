import categoryType from './categoryType'

export function postCategories (payload) {
  return {
    type: categoryType.POST_CATEGORIES,
    payload: payload
  }
}

export function putCategories (payload) {
  return {
    type: categoryType.PUT_CATEGORIES,
    payload: payload
  }
}

export function getCategories (page, limit) {
  return {
    type: categoryType.GET_CATEGORIES,
    page: page,
    limit: limit
  }
}

export function deleteCategories (categoryID) {
  return {
    type: categoryType.DELETE_CATEGORIES,
    categoryID: categoryID
  }
}

export function getCategoriesDetailCategory (categoryID) {
  return {
    type: categoryType.GET_CATEGORIES_DETAIL_CATEGORY,
    categoryID: categoryID
  }
}
