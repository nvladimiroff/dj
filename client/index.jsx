import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import routes from '../app/routes'
import reducer from '../app/reducers'

const initialState = window.__INITIAL_STATE__
const store = createStore(reducer, initialState)

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
)
