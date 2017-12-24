import React from 'react'
import { shape, array, func } from 'prop-types'
import TodoList from './TodoList'
import Footer from './Footer'

export default function MainSection({ model, actions }) {
  return (
    <section className="main">
      {model.hasTodos ? (
        <span>
          <input className="toggle-all" type="checkbox" checked={model.isAllComplete} />
          <label onClick={actions.toggleAll} />
        </span>
      ) : null}
      <TodoList todos={model.editableTodos} editText={model.editText} actions={actions} />
      {model.hasTodos ? (
        <Footer
          FILTER_OPTIONS={model.FILTER_OPTIONS}
          completedCount={model.completedCount}
          activeCount={model.remainingCount}
          filter={model.filter}
          onClearCompleted={() => actions.clearCompleted()}
        />
      ) : null}
    </section>
  )
}

MainSection.propTypes = {
  model: shape({
    todos: array.isRequired
  }),
  actions: shape({
    clearCompleted: func.isRequired
  })
}
