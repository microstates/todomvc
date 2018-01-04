import microstates from 'microstates';
import Component, { tracked } from '@glimmer/component';
import TodoModel, { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'microstates-todomvc';
import Navigo from 'navigo';

const router = new Navigo(null, true);
const filterStates = { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE };

export default class TodoApp extends Component {
  /** Microstate */
  @tracked ms;

  filterStates = filterStates;

  constructor(options) {
    super(options);

    this.ms = microstates(TodoModel, {
      filter: SHOW_ALL,
      todos: [
        {
          id: 1,
          text: 'Write TodoMVC microstate',
          completed: true
        },
        {
          id: 2,
          text: 'Write a sample glimmer app',
          completed: false
        }
      ]
    });

    const updateFilter = (text = SHOW_ALL) => this.updateState(this.ms.filter.set, text);

    router
      .on({
        '/': updateFilter,
        '/active': () => updateFilter(SHOW_ACTIVE),
        '/completed': () => updateFilter(SHOW_COMPLETED)
      })
      .notFound(updateFilter)
      .resolve();
  }

  addTodo(event) {
    const { code, target: { value: newTodoText } } = event;
    if (code !== 'Enter') {
      return;
    }
    this.updateState(this.ms.addTodo, newTodoText);
    event.target.value = '';
  }

  deleteTodo = (todo) => this.updateState(this.ms.deleteTodo, todo);

  toggleTodo = (todo) =>  this.updateState(this.ms.toggleTodo, todo);

  toggleAll = () => this.updateState(this.ms.toggleAll);

  updateState = (fn, args?) => (this.ms = fn(args));

}
