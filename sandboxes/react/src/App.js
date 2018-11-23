import React from "react";
import classnames from "classnames";

import { map, create, Store, valueOf } from "microstates";
import TodoMVC from "@microstates/todomvc";

import TodoTextInput from "./TodoTextInput";

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export default class App extends React.Component {
  state = {
    $: Store(create(TodoMVC, this.props.value), $ => {
      this.setState({ $ });
      this.props.onChange(valueOf($));
    })
  }
  render() {
    let { $ } = this.state;
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoTextInput
            text={$.newTodo.state}
            classes="new-todo"
            onSave={$.insertNewTodo}
            onBlur={$.insertNewTodo}
            onInputChange={$.newTodo.set}
            placeholder="What needs to be done?"
          />
        </header>
        <section className="main">
          {$.hasTodos && (
            <span>
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={$.isAllComplete}
                onChange={$.toggleAll}
              />
              <label htmlFor="toggle-all" />
            </span>
          )}
          <ul className="todo-list">
            {map($.filtered, todo => (
              <li
                className={classnames({
                  completed: todo.completed.state,
                  editing: todo.editing.state
                })}
                key={todo.id.state}
              >
                {todo.editing.state ? (
                  <TodoTextInput
                    text={todo.text.state}
                    classes="edit"
                    onSave={todo.save}
                    onBlur={todo.save}
                    onInputChange={todo.text.set}
                  />
                ) : (
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.completed.state}
                      onChange={todo.completed.toggle}
                    />
                    <label onDoubleClick={todo.edit}>{todo.text.state}</label>
                    <button
                      className="destroy"
                      onClick={() =>
                        $.todos.filter(item => todo.state !== item.state)
                      }
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          {$.hasTodos && (
            <footer className="footer">
              <span className="todo-count">
                <strong>{$.active.length || "No"}</strong>{" "}
                {pluralize("item", $.active.length)}
              </span>
              <ul className="filters">
                {$.filters.map(filter => (
                  <li key={filter.key}>
                    <button
                      className={classnames({ selected: filter.selected })}
                      style={{ cursor: "pointer" }}
                      onClick={filter.select}
                    >
                      {filter.label}
                    </button>
                  </li>
                ))}
              </ul>
              {$.hasCompleted && (
                <button
                  className="clear-completed"
                  onClick={$.clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          )}
        </section>
      </div>
    )
  }
}