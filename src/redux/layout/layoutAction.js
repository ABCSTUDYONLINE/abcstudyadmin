import layoutType from './layoutType';

export function showLoading() {
  return {
    type: layoutType.LOADING_SHOW
  }
}

export function hideLoading() {
  return {
    type: layoutType.LOADING_HIDE
  }
}

export function handleError(payload) {
  return {
    type: layoutType.ERROR,
    payload: payload
  }
}