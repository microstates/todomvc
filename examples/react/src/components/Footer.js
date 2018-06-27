import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoMVC, { FILTER_OPTIONS } from '../models';

const { keys } = Object
export default class Footer extends Component {
  static propTypes = {
    model: PropTypes.shape({
      state: PropTypes.instanceOf(TodoMVC)
    })
  }

  renderTodoCount() {
    let { remainingCount } = this.props.model;
    const itemWord = remainingCount.state === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{remainingCount.state || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_OPTIONS[filter];
    let { model } = this.props;

    return (
      <button
        className={classnames({ selected: filter === model.filter.state })}
        style={{ cursor: 'pointer' }}
        onClick={() => model.filter.set(filter) }
      >
        {title}
      </button>
    )
  }

  renderClearButton() {
    const { model: { completedCount, clearCompleted } } = this.props
    if (completedCount.state > 0) {
      return (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )
    }
  }

  render() {
    let filters = keys(FILTER_OPTIONS)
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">{filters.map(filter => <li key={filter}>{this.renderFilterLink(filter)}</li>)}</ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}
