/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createHashHistory } from 'history'
import store from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
const history = createHashHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
