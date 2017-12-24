import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import Model from 'microstates-todomvc'
import connect from '../utils/connect'
import TodoMVC from './TodoMVC'

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

export default connect(Model, App)
