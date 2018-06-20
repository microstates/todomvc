import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'
import TodoMVC from '../models';

export default function Header({ model }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        text={model.state.newTodo}
        classes="new-todo"
        onSave={model.insertNewTodo}
        onBlur={model.insertNewTodo}
        onChange={model.newTodo.set}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

Header.propTypes = {
  model: PropTypes.shape({
    state: PropTypes.instanceOf(TodoMVC)
  }),
}
