import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'

let key = 'microstates-todomvc';

let restore = value => JSON.parse(localStorage.getItem(key) || "null");
let save = value => localStorage.setItem(key, JSON.stringify(value));

let value = restore() || {
  todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }]
};

render(<App value={value} onChange={save} />, document.getElementById('root'))
