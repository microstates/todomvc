import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'

export default class MainSection extends Component {
  static propTypes = {
    model: PropTypes.shape({
      todos: PropTypes.array.isRequired
    }),
    actions: PropTypes.object.isRequired
  }

  renderToggleAll() {
    const { model, actions } = this.props

    if (model.hasTodos) {
      return (
        <span>
          <input className="toggle-all" type="checkbox" checked={model.isAllComplete} />
          <label onClick={actions.toggleAll} />
        </span>
      )
    }
  }

  renderFooter() {
    const { model, actions } = this.props

    if (model.hasTodos) {
      return (
        <Footer
          FILTER_OPTIONS={model.FILTER_OPTIONS}
          completedCount={model.completedCount}
          activeCount={model.remainingCount}
          filter={model.filter}
          onClearCompleted={() => actions.clearCompleted()}
          onShow={filter => actions.filter.set(filter)}
        />
      )
    }
  }

  render() {
    const { model, actions } = this.props

    return (
      <section className="main">
        {this.renderToggleAll()}
        <ul className="todo-list">
          {model.filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editText={model.editText}
              editing={model.editing}
              actions={actions}
            />
          ))}
        </ul>
        {this.renderFooter()}
      </section>
    )
  }
}
