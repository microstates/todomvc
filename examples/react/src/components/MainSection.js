import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'

export default class MainSection extends Component {
  static propTypes = {
    model: PropTypes.shape({
      todos: PropTypes.array.isRequired,
    }),
    actions: PropTypes.object.isRequired,
  }

  renderToggleAll(completedCount) {
    const { model, actions } = this.props

    let count = model.todos.length

    if (count > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === count}
          onChange={actions.completeAll}
        />
      )
    }
  }

  renderFooter(completedCount) {
    const { model, actions } = this.props

    if (model.todos.length) {
      return (
        <Footer
          FILTER_OPTIONS={model.FILTER_OPTIONS}
          completedCount={completedCount}
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
        {this.renderToggleAll(model.completedCount)}
        <ul className="todo-list">
          {model.filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...actions} />)}
        </ul>
        {this.renderFooter(model.completedCount)}
      </section>
    )
  }
}
