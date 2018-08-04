export default class Todo {
  id = Number
  text = String
  completed = Boolean
  editing = Boolean

  startEditing() {
    return this.editing.set(true);
  }

  stopEditing() {
    return this.editing.set(false);
  }
}