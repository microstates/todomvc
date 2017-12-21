/* global module */

import { define } from 'skatejs'
import h from '../../stories/render'
import { storiesOf } from '@storybook/react'

import TodoMVC from './component.js'

define(TodoMVC)

storiesOf('TodoMvc', module)
  .add('it renders', () => <todo-mvc name="taras" />)
  .add('it can render content into the slot', () => (
    <todo-mvc>
      <p>This is some inner content</p>
    </todo-mvc>
  ))
