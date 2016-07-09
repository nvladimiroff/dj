import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Test from '../components/Test'

export default (
  <Route name="app" path="/">
    <IndexRoute component={App}/>
    <Route name="test" component={Test} path="/test"/>
  </Route>
)
