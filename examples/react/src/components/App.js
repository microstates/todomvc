import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import qs from 'qs'

import Model from 'microstates-todomvc'
import * as MS from 'microstates'
import connect from '../utils/connect'
import TodoMVC from './TodoMVC'

class WindowLocation {
  hash = MS.String
  pathname = MS.String
  search = MS.String

  get qs() {
    return qs.parse(this.search, { ignoreQueryPrefix: true })
  }
}

class RoutableTodoMVC extends Model {
  location = WindowLocation

  get filter() {
    return this.location.qs.filter || ''
  }

  set filter(v = '') {
    return v
  }
}

function App({ model, actions, history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="*">
          <TodoMVC model={model} actions={actions} />
        </Route>
      </Switch>
    </Router>
  )
}

export default connect(RoutableTodoMVC, App)
