import chai from 'chai'
import mocha from 'mocha'

import TodoMVC from './index'
// Fix: why do I need to do this?
const microstate = require('microstates').default

const { freeze } = Object
const { expect } = chai
const { describe, it } = mocha

describe('TodoMVC', function() {
  describe('WITHOUT initial value', function() {
    let ms = microstate(TodoMVC)
    it('has todos array on state', function() {
      expect(ms.state.todos).to.deep.equal([])
    })
    it('has nextId on state', function() {
      expect(ms.state.nextId).to.equal(0)
    })
    it('has completedCount on state', function() {
      expect(ms.state.completedCount).to.equal(0)
    })
  })
  describe('FROM initial value', function() {
    let ms = microstate(TodoMVC, {
      todos: [{ text: 'Hello World', id: 1, completed: true }],
    })
    it('has one todo', function() {
      expect(ms.state.todos).to.deep.equal([{ text: 'Hello World', id: 1, completed: true }])
    })
    it('has nextId on state', function() {
      expect(ms.state.nextId).to.equal(2)
    })
    it('has completedCount on state', function() {
      expect(ms.state.completedCount).to.equal(1)
    })
  })
  describe('transitions', function() {
    let todoOne = freeze({ id: 1, text: 'Make initial commit', completed: false })
    let todoTwo = freeze({ id: 2, text: 'Write readme', completed: false })
    let todoThree = freeze({ id: 3, text: 'Release microstates', completed: false })
    let value = freeze({
      todos: freeze([todoOne, todoTwo, todoThree]),
    })
    it('completes todo with completeTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .completeTodo(todoOne)
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: true },
        { id: 2, text: 'Write readme', completed: false },
        { id: 3, text: 'Release microstates', completed: false },
      ])
    })
    it('edits todo with editTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .editTodo(todoTwo, 'Write README')
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: false },
        { id: 2, text: 'Write README', completed: false },
        { id: 3, text: 'Release microstates', completed: false },
      ])
    })
    it('deletes todo with deleteTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .deleteTodo(todoThree)
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: false },
        { id: 2, text: 'Write readme', completed: false },
      ])
    })
    it('adds todo with addTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .addTodo('Write tests')
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: false },
        { id: 2, text: 'Write readme', completed: false },
        { id: 3, text: 'Release microstates', completed: false },
        { id: 4, text: 'Write tests', completed: false },
      ])
    })
    it('clears completed with clearCompleted', function() {
      let { todos } = microstate(TodoMVC, {
        todos: [todoOne, freeze({ id: 2, text: 'Write readme', completed: true }), todoThree],
      })
        .clearCompleted()
        .valueOf()
      expect(todos).to.deep.equal([todoOne, todoThree])
    })
  })
})
