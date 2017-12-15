import React from 'react'
import Header from '../Header'
import MainSection from '../MainSection'

export default function App({ actions, model }) {
  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection model={model} actions={actions} />
    </div>
  )
}
