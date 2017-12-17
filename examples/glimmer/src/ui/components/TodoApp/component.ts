import microstates from 'microstates';
import Component, { tracked } from '@glimmer/component';
import TodoModel, { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'microstates-todomvc';
import Navigo from 'navigo';

const router = new Navigo(null, true);
const filterStates = { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE };

export default class TodoApp extends Component {
  // @tracked newTodoText;

  @tracked microstate;

  filterStates = filterStates;

  constructor(options) {
    super(options);

    const todoModel = microstates(TodoModel, {
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

    this.microstate = todoModel;
    window.ms = this.microstate;
    router
      .on({
        '/': () => (this.microstate = this.microstate.filter.set(SHOW_ALL)),
        '/active': () => (this.microstate = this.microstate.filter.set(SHOW_ACTIVE)),
        '/completed': () => (this.microstate = this.microstate.filter.set(SHOW_COMPLETED))
      })
      .resolve();
  }

  addTodo(event) {
    const { code, target: { value: newTodoText } } = event;
    if (code !== 'Enter') {
      return;
    }
    this.microstate = this.microstate.addTodo(newTodoText);
    event.target.value = '';
    window.ms = this.microstate;    
  }

  clearCompleted() {
    this.microstate = this.microstate.clearCompleted();
  }

  didUpdate() {
    console.log('🚀');
  }

  markAllAsCompleted() {
    
  }

}
