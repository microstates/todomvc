import React from 'react'

import MainSection from './MainSection'
import Header from './Header'

export default function TodoMVC({ model, actions }) {
  return (
    <div>
      <Header newTodo={model.newTodo} actions={actions} />
      <MainSection model={model} actions={actions} />
    </div>
  )
}
