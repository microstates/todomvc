import React from "react";
import PropTypes from "prop-types";
import { Todo } from '../models';

export default function TodoItem({ todo, onDelete }) {
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={todo.state.completed}
        onChange={todo.completed.toggle}
      />
      <label onDoubleClick={todo.edit}>{todo.text.state}</label>
      <button className="destroy" onClick={onDelete} />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    state: PropTypes.instanceOf(Todo)
  })
};
