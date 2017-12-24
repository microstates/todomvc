/* global module */

import { define } from 'skatejs'
import h from '../../stories/render'
import { storiesOf } from '@storybook/react'

import TodoMVC from './component.js'

define(TodoMVC)

let todos = [{ id: 0, text: 'Write Microstates Docs', completed: false }]

storiesOf('TodoMVC', module).add('it renders', () => <todo-mvc todos={todos} />)
