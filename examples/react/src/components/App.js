import State from "@microstates/react";
import classnames from "classnames";
import { map } from "microstates";
import React from "react";

import TodoMVC from "../models/TodoMVC";
import TodoTextInput from "./TodoTextInput";

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export default function App({ value, onChange }) {
  return (
    <State type={TodoMVC} value={value} onChange={onChange}>
      {app => (
        <div>
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              text={app.state.newTodo}
              classes="new-todo"
              onSave={() => app.insertNewTodo()}
              onBlur={() => app.insertNewTodo()}
              onChange={text => app.newTodo.set(text)}
              placeholder="What needs to be done?"
            />
          </header>
          <section className="main">
            {app.hasTodos && (
              <span>
                <input
                  className="toggle-all"
                  type="checkbox"
                  checked={app.isAllComplete}
                />
                <label onClick={() => app.toggleAll()} />
              </span>
            )}
            <ul className="todo-list">
              {map(app.filtered, todo => (
                <li
                  className={classnames({
                    completed: todo.state.completed,
                    editing: todo.state.editing
                  })}
                  key={todo.state.id}
                >
                  {todo.state.editing ? (
                    <TodoTextInput
                      text={todo.state.text}
                      classes="edit"
                      onSave={() => todo.editing.set(false)}
                      onChange={text => todo.text.set(text)}
                      onBlur={() => todo.editing.set(false)}
                    />
                  ) : (
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.state.completed}
                        onChange={() => todo.completed.toggle()}
                      />
                      <label onDoubleClick={() => todo.editing.set(true)}>
                        {todo.state.text}
                      </label>
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
                        onClick={() => filter.select()}
                      >
                        {filter.label}
                      </button>
                    </li>
                  ))}
                </ul>
                {app.hasCompleted && (
                  <button
                    className="clear-completed"
                    onClick={() => app.clearCompleted()}
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
