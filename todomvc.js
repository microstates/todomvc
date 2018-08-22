import { create, reduce, filter } from "microstates";

export const SHOW_ALL = "";
export const SHOW_COMPLETED = "show_completed";
export const SHOW_ACTIVE = "show_active";

export class Todo {
  id = Number
  text = String
  completed = Boolean
}

export class EditableTodo extends Todo {
  editing = Boolean

  edit() {
    return this.editing.set(true);
  }

  save() {
    return this.editing.set(false);
  }
}

export default class TodoMVC {
  todos   = create([EditableTodo])  // Contains array of todo items
  newTodo = String
  filter = String

  get nextId() {
    return reduce(this.todos, (acc, todo) => Math.max(todo.state.id, acc), 0) + 1;
  }

  get completed() {
    return filter(this.todos, todo => todo.state.completed);
  }

  get active() {
    return filter(this.todos, todo => !todo.state.completed);
  }

  get isAllComplete() {
    return this.hasTodos && this.active.length === 0;
  }

  get hasTodos() {
    return this.todos.state.length > 0;
  }

  get hasCompleted() {
    return this.completed.length > 0;
  }

  get filters() {
    let { filter } = this.state;
    
    let option = (key, label) => ({
      key,
      label,
      selected: filter === key,
      select: () => this.filter.set(key)
    });

    return [
      option(SHOW_ALL, 'All'),
      option(SHOW_ACTIVE, 'Active'),
      option(SHOW_COMPLETED, 'Completed')
    ];
  }

  get filtered() {
    switch (this.state.filter) {
      case SHOW_COMPLETED: return this.completed;
      case SHOW_ACTIVE: return this.active;
      case SHOW_ALL:
      default:
        return this.todos;
    }
  }

  insertNewTodo() {
    if (this.newTodo.state.length === 0) {
      return this;
    } else {
      return this.todos
        .push({
          text: this.newTodo.state,
          id: this.nextId,
          completed: false
        })
        .newTodo.set("");
    }
  }

  clearCompleted() {
    return this.todos.filter(({ completed }) => !completed.state);
  }

  toggleAll() {
    return this.todos.map(todo => todo.completed.set(true));
  }
}