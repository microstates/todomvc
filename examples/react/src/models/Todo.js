export default class Todo {
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