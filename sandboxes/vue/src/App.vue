<script>
import TodoMVC from '@microstates/todomvc';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export default {
  functional: true,
  props: {
    app: {
      type: TodoMVC,
      required: true,
    },
  },
  render(h, { props: { app } }) {
    return (
      <div class='todoapp'>
        <header class='header'>
          <h1>todos</h1>
          <TodoTextInput
            text={app.newTodo.state}
            classes='new-todo'
            onSave={app.insertNewTodo}
            onBlur={app.insertNewTodo}
            onInputChange={app.newTodo.set}
            placeholder='What needs to be done?'
          />
        </header>
        <section class='main'>
          {app.hasTodos && (
            <span>
              <input
                id='toggle-all'
                class='toggle-all'
                type='checkbox'
                checked={app.isAllComplete}
                onChange={app.toggleAll}
              />
              <label for='toggle-all' />
            </span>
          )}
          <ul class='todo-list'>
            {[...app.filtered].map(todo => (
              <li
                class={classnames({
                  completed: todo.completed.state,
                  editing: todo.editing.state,
                })}
                key={todo.id.state}
              >
                {todo.editing.state ? (
                  <TodoTextInput
                    text={todo.text.state}
                    classes='edit'
                    onSave={todo.save}
                    onBlur={todo.save}
                    onInputChange={todo.text.set}
                  />
                ) : (
                  <div class='view'>
                    <input
                      class='toggle'
                      type='checkbox'
                      checked={todo.completed.state}
                      onChange={todo.completed.toggle}
                    />
                    <label onDblclick={todo.edit}>{todo.text.state}</label>
                    <button
                      class='destroy'
                      onClick={() =>
                        app.todos.remove(todo)
                      }
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          {app.hasTodos && (
            <footer class='footer'>
              <span class='todo-count'>
                <strong>{app.active.length || 'No'}</strong>{' '}
                {pluralize('item', app.active.length)}
              </span>
              <ul class='filters'>
                {app.filters.map(filter => (
                  <li key={filter.key}>
                    <button
                      class={classnames({ selected: filter.selected })}
                      style={{ cursor: 'pointer' }}
                      onClick={filter.select}
                    >
                      {filter.label}
                    </button>
                  </li>
                ))}
              </ul>
              {app.hasCompleted && (
                <button
                  class='clear-completed'
                  onClick={app.clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          )}
        </section>
      </div>
    );
  },
};
</script>

<style src='./styles.css'></style>
