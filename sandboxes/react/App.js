import React from "react";
import classnames from "classnames";

import { map } from "microstates";
import State from "@microstates/react";
import TodoMVC from "@microstates/todomvc";

import TodoTextInput from "./TodoTextInput";

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export default function App({ value, onChange }) {
  return (
    <State type={TodoMVC} value={value} onChange={onChange}>
      {app => (
        <div class="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              text={app.newTodo.state}
              classes="new-todo"
              onSave={app.insertNewTodo}
              onBlur={app.insertNewTodo}
              onInputChange={app.newTodo.set}
              placeholder="What needs to be done?"
            />
          </header>
          <section className="main">
            {app.hasTodos && (
              <span>
                <input
                  id="toggle-all"
                  className="toggle-all"
                  type="checkbox"
                  checked={app.isAllComplete}
                  onChange={app.toggleAll}
                />
                <label htmlFor="toggle-all" />
              </span>
            )}
            <ul className="todo-list">
              {map(app.filtered, todo => (
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
                            app.todos.filter(item => todo.state !== item.state)
                          }
                        />
                      </div>
                    )}
                </li>
              ))}
            </ul>
            {app.hasTodos && (
              <footer className="footer">
                <span className="todo-count">
                  <strong>{app.active.length || "No"}</strong>{" "}
                  {pluralize("item", app.active.length)}
                </span>
                <ul className="filters">
                  {app.filters.map(filter => (
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
                {app.hasCompleted && (
                  <button
                    className="clear-completed"
                    onClick={app.clearCompleted}
                  >
                    Clear completed
                  </button>
                )}
              </footer>
            )}
          </section>
        </div>
      )}
    </State>
  );
}
