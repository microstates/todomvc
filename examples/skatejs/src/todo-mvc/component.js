import { props, withComponent } from 'skatejs'
import withLitHtml from '@skatejs/renderer-lit-html'
import { html } from 'lit-html'
import { repeat } from 'lit-html/lib/repeat'
import Model from 'microstates-todomvc'

import withMicrostate from '../util/with-microstate'
import style from '../util/style.js'
import css from './styles.scss'

const noop = () => {}
const when = (cond, truthy, falsy = '') => (cond ? truthy : falsy)
const whenEnter = (truthy, falsy = noop) => e => (e.which === 13 ? truthy(e.target.value) : falsy(e.target.value))
const value = cb => e => cb(e.target.value)
const items = count => (count === 1 ? 'item' : 'items')

const { keys } = Object

export default class TodoMVC extends withMicrostate(Model, withComponent(withLitHtml())) {
  static is = 'todo-mvc'
  static props = {
    todos: props.array
  }
  render({ state: { actions, model } }) {
    return html`
    ${style(this, css)}
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input 
          class="new-todo" 
          placeholder="What needs to be done?" 
          autofocus
          value="${model.newTodo}" 
          onkeyup=${whenEnter(_ => actions.insertNewTodo(), v => actions.newTodo.set(v))}
          onblur=${() => actions.insertNewTodo()}
        />
      </header>
      <section class="main">
        <input 
          id="toggle-all" 
          class="toggle-all" 
          type="checkbox" 
          checked=${model.isAllComplete}
          onchange=${() => actions.toggleAll()}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          ${repeat(
            model.editableTodos,
            ({ id }) => id,
            todo => html`
            <li className="${when(todo.completed, 'completed')} ${when(todo.editing, 'editing')}">
              ${when(
                todo.editing,
                html`
                  <input 
                    class="edit" 
                    value="${model.editText}" 
                    oninput=${value(v => actions.editText.set(v))}
                    onblur=${() => actions.finishEditing()}
                  />
                `,
                html`
                  <div class="view" ondblclick=${() => actions.startEditing(todo)}>
                    <input 
                      class="toggle" 
                      type="checkbox" 
                      checked=${todo.completed} 
                      onchange=${() => actions.toggleTodo(todo)} 
                    />
                    <label>${todo.text}</label>
                    <button class="destroy" onclick="${() => actions.deleteTodo(todo)}" />
                  </div>
                `
              )}
            </li>
          `
          )}
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>${model.remainingCount}</strong> ${items(model.remainingCount)} left
        </span>
        <ul class="filters">
          ${repeat(
            keys(model.FILTER_OPTIONS),
            filter => filter,
            filter => html`
              <li>
                <button
                  className="${when(model.filter === filter, 'selected')}"
                  onclick=${() => actions.filter.set(filter)}
                >
                  ${model.FILTER_OPTIONS[filter]}
                </button>
              </li>
            `
          )}
        </ul>
        ${when(
          model.completedCount > 0,
          html`
            <button class="clear-completed" onclick=${() => actions.clearCompleted()}>Clear completed</button>
          `
        )}
      </footer>
    </section>
    `
  }
}
