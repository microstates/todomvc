import React from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import Footer from "./Footer";
import TodoMVC from "../models";

export default function MainSection({ model }) {
  return (
    <section className="main">
      {model.hasTodos.state ? (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={model.isAllComplete.state}
          />
          <label onClick={model.toggleAll} />
        </span>
      ) : null}
      <TodoList model={model} />
      {model.hasTodos.state ? (
        <Footer model={model} />
      ) : null}
    </section>
  );
}

MainSection.propTypes = {
  model: PropTypes.shape({
    state: PropTypes.instanceOf(TodoMVC)
  })
};
