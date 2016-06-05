import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../../components/Root'
import Main from './pages/Main'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={Main} />
  </Route>
)

export default Routes
