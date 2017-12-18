import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default function Header({ newTodo, actions }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        text={newTodo}
        classes="new-todo"
        onSave={actions.insertNewTodo}
        onBlur={actions.insertNewTodo}
        onChange={text => actions.newTodo.set(text)}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

Header.propTypes = {
  newTodo: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    insertNewTodo: PropTypes.func.isRequired
  })
}
