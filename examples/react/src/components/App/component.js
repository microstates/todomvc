import React from 'react'
import Header from '../Header'
import MainSection from '../MainSection'

export default function App({ actions, todos, completedCount }) {
  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} completedCount={completedCount} actions={actions} />
    </div>
  )
}
