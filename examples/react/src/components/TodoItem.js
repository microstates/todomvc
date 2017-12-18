import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editing: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      updateTodo: PropTypes.func.isRequired,
      toggleTodo: PropTypes.func.isRequired,
      startEditing: PropTypes.func.isRequired,
      deleteTodo: PropTypes.func.isRequired
    })
  }

  renderEditingField() {
    let { editText, actions } = this.props
    return (
      <TodoTextInput
        text={editText}
        classes="edit"
        onSave={actions.finishEditing}
        onChange={text => actions.editText.set(text)}
        onBlur={actions.finishEditing}
      />
    )
  }

  renderTodo() {
    const { todo, actions } = this.props
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

  render() {
    let { todo } = this.props
    let isEditing = this.props.editing.id === todo.id
    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: isEditing
        })}
      >
        {isEditing ? this.renderEditingField() : this.renderTodo()}
      </li>
    )
  }
}

export default TodoItem
