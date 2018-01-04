import Component from '@glimmer/component'
import { ENTER, ESCAPE } from '../../../utils/keys'

export default class TodoItem extends Component {
  didUpdate() {
    if (this.args.todo.editing) {
      requestAnimationFrame(() => {
        let input = this.element.querySelector(
          'input[type="text"]'
        ) as HTMLElement
        input.focus()
      })
    }
  }

  handleEditTextUpdate(event) {
    const { which, target: { value: newTodoText } } = event

    this.args.updateEditText(newTodoText)

    if (which === ENTER) {
      this.args.finishEdit()
    } else if (which === ESCAPE) {
      this.args.abandonEdit()
    }
  }
}
