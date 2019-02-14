import { create, Store } from "microstates";
import TodoMVC from "../todomvc";

let state = create(TodoMVC, {
  todos: [
    { id: 1, text: "Make initial commit", completed: false },
    { id: 2, text: "Write readme", completed: false },
    { id: 3, text: "Release microstates", completed: false }
  ]
});

describe('store', () => {
  let store;
  beforeEach(() => {
    store = Store(state, next => store = next);
  });

  it('has an Identity on store.newTodo', () => {
    expect(store.newTodo.constructor.name).toBe("Ref<String>")
  });
});