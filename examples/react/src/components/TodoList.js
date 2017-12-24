import React from 'react'
import { arrayOf, shape, bool, func } from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import TodoItem from './TodoItem'

export default function TodoList({ todos, actions, editText }) {
  return (
    <ul className="todo-list">
      {todos &&
        todos.map(todo => (
          <li
            className={classnames({
              completed: todo.completed,
              editing: todo.editing
            })}
            key={todo.id}
          >
            {todo.editing ? (
              <TodoTextInput
                text={editText}
                classes="edit"
                onSave={actions.finishEditing}
                onChange={text => actions.editText.set(text)}
                onBlur={actions.finishEditing}
              />
            ) : (
              <TodoItem todo={todo} actions={actions} />
            )}
          </li>
        ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: arrayOf(
    shape({
      editing: bool.isRequired,
      completed: bool.isRequired
    })
  ),
  actions: shape({
    finishEditing: func.isRequired,
    startEditing: func.isRequired
  })
}
