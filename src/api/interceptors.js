/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import camelcaseKeys from 'camelcase-keys'
import store from '../redux/store'
import { showLoading, hideLoading } from '../redux/layout/layoutAction'

const setup = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    },
    function (err) {
      return Promise.reject(err)
    }
  )
}

const checkToken = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      if (response.headers['content-type'].startsWith('application/json')) {
        response.data = camelcaseKeys(response.data, { deep: true })
      }
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

// checkError
const checkError = instance => {
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const responseStatus = error.response.status
      if ([404, 500].includes(responseStatus)) {
        // window.location.replace('/admin/error')
      }
      return Promise.reject(error)
    }
  )
}

// function showSpinner (instance) {
//   instance.interceptors.request.use(
//     request => {
//       !request._skipSpinner && store.dispatch(showLoading())
//       return request
//     },
//     error => {
//       store.dispatch(showLoading())
//       return Promise.reject(error)
//     }
//   )
// }

// function hideSpinner (instance) {
//   instance.interceptors.response.use(
//     response => {
//       setTimeout(() => {
//         store.dispatch(hideLoading())
//       }, 400)
//       return response
//     },
//     error => {
//       setTimeout(() => {
//         store.dispatch(hideLoading())
//       }, 400)
//       return Promise.reject(error)
//     }
//   )
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setup,
  checkToken,
  checkError
  // showSpinner,
  // hideSpinner
}
