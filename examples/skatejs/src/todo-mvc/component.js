import { props, withComponent } from 'skatejs'
import withPreact from '@skatejs/renderer-preact'
import { h } from 'preact'

import style from '../util/style.js'
import css from './styles.scss'

export default class TodoMVC extends withComponent(withPreact()) {
  static is = 'todo-mvc'
  static props = {
    name: props.string
  }
  render({ name }) {
    return (
      <div>
        {style(this, css)}
        <p class="text">
          Hello, {name}!
          <slot />
        </p>
      </div>
    )
  }
}

// customElements.define('todo-mvc', TodoMVC)
