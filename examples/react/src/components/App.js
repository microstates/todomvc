import React from 'react'
import Model from 'microstates-todomvc'

import connect from '../utils/connect'
import Header from './Header'
import MainSection from './MainSection'

function App({ actions, model }) {
  return (
    <div>
      <Header newTodo={model.newTodo} actions={actions} />
      <MainSection model={model} actions={actions} />
    </div>
  )
}

export default connect(Model, App)
