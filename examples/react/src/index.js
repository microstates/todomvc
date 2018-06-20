import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'

let value = {
  todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }]
}

render(<App value={value} />, document.getElementById('root'))
