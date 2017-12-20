import React from 'react'
import PropTypes from 'prop-types'

export default function TodoItem({ todo, actions }) {
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => actions.toggleTodo(todo)}
      />
      <label onDoubleClick={() => actions.startEditing(todo)}>{todo.text}</label>
      <button className="destroy" onClick={() => actions.deleteTodo(todo)} />
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    toggleTodo: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  })
}
