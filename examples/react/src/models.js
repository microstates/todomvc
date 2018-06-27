import { create } from "microstates";

export const SHOW_ALL = "";
export const SHOW_COMPLETED = "show_completed";
export const SHOW_ACTIVE = "show_active";

export const FILTER_OPTIONS = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

export class Todo {
  id = Number;
  text = String;
  completed = Boolean;

  edit() {
    return create(EditingTodo, this);
  }
}

class EditingTodo extends Todo {
  get editing() {
    return true;
  }

  save() {
    return create(Todo, this);
  }
}

/**
 * TodoMVC is a Microstate model.
 */
export default class TodoMVC {
  /**
   * Contains array of todo items
   * @type Array
   */
  todos = [Todo];

  /**
   * Text value of the new todo input field
   * @type String
   */
  newTodo = String;

  /**
   * The current filter applied to the todo items
   * @type String
   */
  filter = String;

  /**
   * Number completed items
   * @type Number
   */
  get completedCount() {
    // in computed properties, `this` references state object which has composed state values on it.
    return this.todos.filter(({ completed }) => completed.state).todos.length;
  }

  /**
   * Next id in order
   * @type Number
   */
  get nextId() {
    return this.todos.reduce((max, todo) => max.set(Math.max(todo.id.state, max.state)), 0).todos.state + 1;
  }

  /**
   * Number of items that are not complete
   * @type Number
   */
  get remainingCount() {
    return this.todos.length - this.completedCount.state;
  }

  /**
   * Are all items complete
   * @type Boolean
   */
  get isAllComplete() {
    return this.todos.length > 0 && this.remainingCount.state === 0;
  }

  /**
   * Todo items based on current filter value
   * @type Array
   */
  get filteredTodos() {
    switch (this.filter.state) {
      case SHOW_COMPLETED:
        return this.todos.filter(({ completed }) => completed.state).todos;
      case SHOW_ACTIVE:
        return this.todos.filter(({ completed }) => !completed.state).todos;
      case SHOW_ALL:
      default:
        return this.todos;
    }
  }

  /**
   * True when todos are present
   * @type Boolean
   */
  get hasTodos() {
    return this.todos.length > 0;
  }

  /**
   * Creates a todo from input in newTodo text field and prepare new todo field for
   * input of next todo item.
   */
  insertNewTodo() {
    if (this.newTodo.state.length === 0) {
      return this;
    } else {
      return this.todos
        .push({
          text: this.newTodo.state,
          id: this.nextId.state,
          completed: false
        })
        .newTodo.set("");
    }
  }

  /**
   * Remove all items that have completed status
   */
  clearCompleted() {
    return this.todos.filter(({ completed }) => !completed.state);
  }

  /**
   * Makes all items incomplete if all are complete and makes all complete 
   * if some are incomplete.
   */
  toggleAll() {
    return this.todos.map(todo => todo.completed.set(true));
  }
}
