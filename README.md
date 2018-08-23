# TodoMVC Model

This package provides a model for TodoMVC App Components. The goal of this package is to show how
a single state model can be consumed by different frameworks without modifying original model.

## How it works?

For each framework, a _connect_ utility wraps a component and binds the TodoMVC Model to the root component.
The connect utility makes `model` and `actions` available to the wrapped component. `model` contains state
for the current value. `actions` are state transitions wrapped in framework specific code that'll cause the
component to update.

## Where to look

* [TodoMVC Model](index.js)
* React
  * [Component](examples/react/src/components/App.js)
  * [Connect Helper](examples/react/src/utils/connect.js)
* Skate.js
  * [Component](examples/skatejs/src/todo-mvc/component.js)
  * [Connect Helper](examples/skatejs/src/util/with-microstate.js)
* Vue.js
  * [Component](examples/vue/src/components/Todos.vue)
  * [Connect Helper](examples/vue/src/utils/connect.js)

## Notable

### No framework specifc state management

Microstates was created to normalize how state transitions are performed across frameworks. For most cases,
the model provides all state and actions necessary to track state of the component. Framework specific state
management is only necessary when storing local component state that is disposable. For example, and input field
might store the current user input locally to prevent the model from being transitioned on every keystroke.

