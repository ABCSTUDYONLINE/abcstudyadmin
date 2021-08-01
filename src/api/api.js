/* eslint-disable no-undef */
import axios from 'axios'
import interceptors from './interceptors'

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: '*/*',
    'Content-Type': localStorage.getItem('contentType')
  }
})

interceptors.setup(Api)
interceptors.checkToken(Api)
interceptors.checkError(Api)
// interceptors.showSpinner(Api)
// interceptors.hideSpinner(Api)

export default Api
