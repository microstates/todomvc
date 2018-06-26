import { types } from 'microstates';

export const SHOW_ALL = ''
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'

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

  /**
   * Contains array of todo items
   * @type Array
   */
  todos = [Todo]

  /**
   * Text value of the new todo input field
   * @type String
   */
  newTodo = String

  /**
   * The current filter applied to the todo items
   * @type String
   */
  filter = types.Any

  /**
   * All possible filter options
   * @type Object
   */
  FILTER_OPTIONS = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
  }

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
    return this.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1
  }

  /**
   * Number of items that are not complete
   * @type Number
   */
  get remainingCount() {
    return this.todos.length - this.completedCount
  }

  /**
   * Are all items complete
   * @type Boolean
   */
  get isAllComplete() {
    return this.todos.length > 0 && this.remainingCount === 0
  }

  /**
   * Todo items based on current filter value
   * @type Array
   */
  get filteredTodos() {
    switch (this.filter) {
      case SHOW_ALL:
        return this.todos
      case SHOW_COMPLETED:
        return this.todos.filter(({ completed }) => completed)
      case SHOW_ACTIVE:
        return this.todos.filter(({ completed }) => !completed)
    }
  }

  /**
   * Filtered todo items decorated with editing status relative to todo that's being edited
   * @type Array
   */
  get editableTodos() {
    return this.filteredTodos.map(todo => ({ ...todo, editing: todo.id === this.editing.id }))
  }

  /**
   * True when todos are present
   * @type Boolean
   */
  get hasTodos() {
    return this.todos.length > 0
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
  toggleTodo(current, { id }) {
    /**
     * microstates doesn't support transitioning state that is composed into an array (yet).
     * We can transition the array, but not values in that array. We're planning
     * to add this feature in the future but we need to figure out how to do that properly.
     *
     * Find the todo that we want to update and replace it with new item that has completed true.
     */
    let todo = current.todos.find(todo => todo.id === id)
    return this.todos.replace(todo, {
      ...todo,
      completed: !todo.completed
    })
  }

  /**
   * Update a todo. If text is empty, delete it otherwise change the text.
   * Afterwards clear the editing item.
   * @param {TodoMVC} current
   * @param {Object} todo
   * @param {String} text
   */
  updateTodo(current, todo, text = '') {
    if (text.length === 0) {
      return this.deleteTodo(todo)
    } else {
      return this.editTodo(todo, text)
    }
  }

  /**
   * Change the text of a todo item
   * @param {TodoMVC} current
   * @param {Object} todo
   * @param {String} text
   */
  editTodo(current, { id }, text) {
    // Find the todo that we want to update and replace it with new item with changed text.
    let todo = current.todos.find(todo => todo.id === id)
    return this.todos.replace(todo, {
      ...todo,
      text
    })
  }

  /**
   * Remote a todo item from the list
   * @param {TodoMVC} current
   * @param {Object} todo
   */
  deleteTodo(current, { id }) {
    // Filter here is a transition on todos array.
    return this.todos.filter(item => item.id !== id)
  }

  /**
   * Add a todo item to the list by providing a text field for the todo.
   * @param {TodoMVC} current
   * @param {String} text
   */
  addTodo(current, text) {
    // Push is transition on todos array.
    return this.todos.push({
      text,
      id: current.nextId,
      completed: false
    })
  }

  /**
   * Save edited todo and hide edit field for the todo
   * @param {TodoMVC} current
   */
  finishEditing({ editing, editText }) {
    return this
      .updateTodo(editing, editText)
      .editText.set('')
      .editing.set(null)
  }

  /**
   * Abandon editing a todo
   * @param {TodoMVC} current
   */
  abandonEditing(current) {
    return this
      .editText.set('')
      .editing.set(null)
  }

  /**
   * Show edit field for a specific todo
   * @param {TodoMVC} current
   * @param {Object} todo
   */
  startEditing(current, todo) {
    return this
      .editing.set(todo)
      .editText.set(todo.text)
  }

  /**
   * Creates a todo from input in newTodo text field and prepare new todo field for
   * input of next todo item.
   * @param {TodoMVC} current
   */
  insertNewTodo(current) {
    let { newTodo } = current
    if (newTodo.length === 0) {
      return current
    } else {
      return this
        .addTodo(newTodo)
        .newTodo.set('')
    }
  }

  /**
   * Remove all items that have completed status
   */
  clearCompleted() {
    return this.todos.filter(({ completed }) => !completed)
  }

  /**
   * Makes all items incomplete if all are complete and makes all complete
   * if some are incomplete.
   * @param {TodoMVC} current
   */
  toggleAll({ isAllComplete }) {
    return this.todos.map(todo => ({ ...todo, completed: !isAllComplete }))
  }
}

export class Todo {
  id = types.Any
  text = String
  completed = Boolean;
}