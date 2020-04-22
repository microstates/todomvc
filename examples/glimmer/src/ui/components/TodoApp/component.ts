import microstates from 'microstates'
import Component, { tracked } from '@glimmer/component'
import TodoModel, {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from 'microstates-todomvc'
import Navigo from 'navigo'
import { ENTER } from '../../../utils/keys'
import withMicrostate from '../../../utils/with-microstates';

const router = new Navigo(null, true)
const filterStates = { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE }

export default class TodoApp extends withMicrostate(TodoModel, Component) {

  static props = {
    filter: SHOW_ALL,
    todos: []
  }

  filterStates = filterStates

  constructor(options) {
    super(options)
    this.setupRouter()
  }

  setupRouter() {

    const updateFilter = (text = SHOW_ALL) => this.actions.filter.set(text);

    router
      .on({
        '/': updateFilter,
        '/active': () => updateFilter(SHOW_ACTIVE),
        '/completed': () => updateFilter(SHOW_COMPLETED)
      })
      .notFound(updateFilter)
      .resolve()
  }

  addTodo(event) {
    const { which, target: { value: newTodoText } } = event
    if (which !== ENTER) {
      return
    }
    this.actions.addTodo(newTodoText);
    event.target.value = ''
  }

}
