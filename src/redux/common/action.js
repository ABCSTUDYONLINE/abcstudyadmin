import CommonTypes from './type'

// reset store[key] to defaultVal or 'val' if pass param 'val'
// keyVals=[{key:...},{key:...,val:..}]
export function resetStoreKeys (keyVals) {
  return {
    type: CommonTypes.RESET_STORE_KEYS,
    payload: keyVals
  }
}
