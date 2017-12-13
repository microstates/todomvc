import * as MS from 'microstates'

/**
 * TodoMVC is a Microstate model.
 *
 * This model provides state structure and transitions necessary to create build a functional TodoMVC app your own view layer.
 *
 * A Microstate model is a value and type description. The type description is used to interpret the value
 * and generate state and transitions for the value. The state will be bound to the template and rendered.
 * Transitions will be used to create actions that will transition the state and update the DOM tree.
 *
 * Types describe:
 * 1. The structure of the state that the type represents.
 * 2. The custom transitions that can be performed on this type.
 * 3. The computed properties that should be applied to the state object that's derived from this type.
 */
export default class TodoMVC {
  /**
   * COMPOSED TYPES
   *
   * Composed types describe the structure of the microstate and how the composed value can be transitioned.
   * In this example, we're only composing an array into this microstate, but we can compose microstates of any
   * depth. Microstates will know how to transition that structure.
   */
  todos = MS.Array

  /**
   * Getters
   *
   * Getters are applied to the state that's generated from a type. The context of a getter is the state object.
   * This gives developer access to composed states on this microstate. It can be used to derive values.
   *
   * In Redux world, this would be similar to Reselect except Microstates doesn't currently support memoization.
   * We're planning to apply several levels of memoization in the future.
   */

  /**
   * Number completed items
   * @type Number
   */
  get completedCount() {
    // in computed properties, `this` references state object which has composed state values on it.
    return this.todos.filter(({ completed }) => completed).length
  }

  /**
   * Next id in order
   * @type Number
   */
  get nextId() {
    return this.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
  }

  /**
   * CUSTOM TRANSITIONS
   *
   * Custom transitions allow to define operations that are specific to the domain of the data that the microstate represents.
   * Transitions are similar to Redux reducers in that they are pure functions that receive state and return new state.
   *
   * When a transition is invoked, the transition function has access to the following:
   * 1. current state of the the microstate via the first argument - unlike Redux, this state is already initialized, so you do not need to define initial value.
   * 2. arguments passed to the transition as the rest of the argument after the first argument
   * 3. context object is a microstate constructor for performing batched transitions on the microstate's state
   */

  /**
   * Change the status of a todo item to be completed
   * @param {TodoMVC} current state
   * @param {Object} todo
   */
  completeTodo(current, todo) {
    /**
     * microstates doesn't support transitioning state that is composed into an array (yet).
     * We can transition the array, but not values in that array. We're planning
     * to add this feature in the future but we need to figure out how to do that properly.
     *
     * Find the todo that we want to update and replace it with new item that has completed true.
     */
    return this().todos.replace(todo, {
      ...todo,
      completed: true,
    })
  }

  /**
   * Change the text of a todo item
   * @param {TodoMVC} current
   * @param {Object} todo
   * @param {String} text
   */
  editTodo(current, todo, text) {
    // Find the todo that we want to update and replace it with new item with changed text.
    return this().todos.replace(todo, {
      ...todo,
      text,
    })
  }

  /**
   * Remote a todo item from the list
   * @param {TodoMVC} current
   * @param {Object} todo
   */
  deleteTodo(current, todo) {
    // Filter here is a transition on todos array.
    return this().todos.filter(item => item !== todo)
  }

  /**
   * Add a todo item to the list
   * @param {TodoMVC} current
   * @param {String} text
   */
  addTodo(current, text) {
    // Push is transition on todos array.
    return this().todos.push({
      text,
      id: current.nextId,
      completed: false,
    })
  }

  /**
   * Remove all items that have completed status
   */
  clearCompleted() {
    return this().todos.filter(({ completed }) => !completed)
  }
}
