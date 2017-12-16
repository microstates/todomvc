import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import * as MS from 'microstates'

import TodoTextInput from './TodoTextInput'
import connect from '../utils/connect'

class TodoEditorModel {
  isEditing = MS.Boolean
}

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  }

  handleDoubleClick = () => {
    this.props.actions.isEditing.set(true)
  }

  handleSave = (todo, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(todo)
    } else {
      this.props.editTodo(todo, text)
    }
    this.props.actions.isEditing.set(false)
  }

  renderEditingField() {
    let { todo, model } = this.props
    return (
      <TodoTextInput
        text={todo.text}
        editing={model.isEditing}
        onSave={text => this.handleSave(todo, text)}
      />
    )
  }

  renderTodo() {
    const { todo, completeTodo, deleteTodo } = this.props
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo)}
        />
        <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo)} />
      </div>
    )
  }

  render() {
    let { model, todo } = this.props
    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: model.isEditing,
        })}
      >
        {model.isEditing ? this.renderEditingField() : this.renderTodo()}
      </li>
    )
  }
}

export default connect(TodoEditorModel, TodoItem)
