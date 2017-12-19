import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
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
      <ul className="todo-list">
        {model.filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editText={model.editText}
            isEditing={model.editing.id === todo.id}
            actions={actions}
          />
        ))}
      </ul>
      {model.hasTodos ? (
        <Footer
          FILTER_OPTIONS={model.FILTER_OPTIONS}
          completedCount={model.completedCount}
          activeCount={model.remainingCount}
          filter={model.filter}
          onClearCompleted={() => actions.clearCompleted()}
          onShow={filter => actions.filter.set(filter)}
        />
      ) : null}
    </section>
  )
}

MainSection.propTypes = {
  model: PropTypes.shape({
    hasTodos: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired
  }),
  actions: PropTypes.object.isRequired
}
