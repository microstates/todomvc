import chai from 'chai'
import mocha from 'mocha'

import TodoMVC, { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from './index'
// Fix: why do I need to do this?
const microstate = require('microstates').default

const { freeze } = Object
const { expect } = chai
const { describe, it } = mocha

let todoOne = freeze({ id: 1, text: 'Make initial commit', completed: false })
let todoTwo = freeze({ id: 2, text: 'Write readme', completed: false })
let todoThree = freeze({ id: 3, text: 'Release microstates', completed: false })
let value = freeze({
  todos: freeze([todoOne, todoTwo, todoThree])
})
let empty = microstate(TodoMVC)
let filled = microstate(TodoMVC, value)
let someCompleted = microstate(TodoMVC, {
  todos: [todoOne, freeze({ id: 2, text: 'Write readme', completed: true }), todoThree]
})
let allCompleted = microstate(TodoMVC, {
  todos: [
    freeze({ id: 1, text: 'Make initial commit', completed: true }),
    freeze({ id: 2, text: 'Write readme', completed: true }),
    freeze({ id: 3, text: 'Release microstates', completed: true })
  ]
})

describe('TodoMVC', function() {
  describe('state', function() {
    describe('todos', function() {
      it('is empty array when todos are not provided', function() {
        expect(empty.state.todos).to.deep.equal([])
      })
      it('has todo items when filled', function() {
        expect(filled.state.todos).to.deep.equal([todoOne, todoTwo, todoThree])
      })
    })
    describe('completedCount', function() {
      it('is empty when no todos are present', function() {
        expect(empty.state.completedCount).to.equal(0)
      })
      it('is 1 when 1 item is complete', function() {
        expect(someCompleted.state.completedCount).to.equal(1)
      })
    })
    describe('nextId', function() {
      it('is 1 when no todos are present', function() {
        expect(empty.state.nextId).to.equal(1)
      })
      it('caclulates next id when todos are present', function() {
        expect(filled.state.nextId).to.equal(4)
      })
    })
    describe('remainingCount', function() {
      it('is 0 when no todos are present', function() {
        expect(empty.state.remainingCount).to.equal(0)
      })
      it('is 2 two when 1 out of 3 items are completed', function() {
        expect(someCompleted.state.remainingCount).to.equal(2)
      })
    })
    describe('filteredTodos', function() {
      let todos = [todoOne, freeze({ id: 2, text: 'Write readme', completed: true }), todoThree]
      it('has all items when filter is not specified', function() {
        expect(filled.state.filteredTodos).to.deep.equal([todoOne, todoTwo, todoThree])
      })
      it('has only completed when filter is SHOW_COMPLETED', function() {
        let ms = microstate(TodoMVC, {
          filter: SHOW_COMPLETED,
          todos
        })
        expect(ms.state.filteredTodos).to.deep.equal([
          { id: 2, text: 'Write readme', completed: true }
        ])
      })
      it('has only active when filter is SHOW_ACTIVE', function() {
        let ms = microstate(TodoMVC, {
          filter: SHOW_ACTIVE,
          todos
        })
        expect(ms.state.filteredTodos).to.deep.equal([todoOne, todoThree])
      })
    })
    describe('hasTodos', function() {
      it('is false when no todos are present', function() {
        expect(empty.state.hasTodos).to.be.false
      })
      it('is true when todos are present', function() {
        expect(filled.state.hasTodos).to.be.true
      })
    })
    describe('isAllComplete', function() {
      it('is false for empty', function() {
        expect(empty.state.isAllComplete).to.be.false
      })
      it('is false when some are incomplete', function() {
        expect(someCompleted.state.isAllComplete).to.be.false
      })
      it('is true when all items are complete', function() {
        expect(allCompleted.state.isAllComplete).to.be.true
      })
    })
  })

  describe('transitions', function() {
    describe('toggleTodo', function() {
      it('makes todo complete when previously incomplete', function() {
        let todo = someCompleted.state.todos[0]
        let toggled = someCompleted.toggleTodo(todo)
        expect(toggled.state.todos[0].completed).to.be.true
      })
      it('makes todo incomplete when previously complete', function() {
        let todo = someCompleted.state.todos[1]
        let toggled = someCompleted.toggleTodo(todo)
        expect(toggled.state.todos[1].completed).to.be.false
      })
    })
    it('edits todo with editTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .editTodo(todoTwo, 'Write README')
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: false },
        { id: 2, text: 'Write README', completed: false },
        { id: 3, text: 'Release microstates', completed: false }
      ])
    })
    it('deletes todo with deleteTodo', function() {
      let { todos } = microstate(TodoMVC, value)
        .deleteTodo(todoThree)
        .valueOf()
      expect(todos).to.deep.equal([
        { id: 1, text: 'Make initial commit', completed: false },
        { id: 2, text: 'Write readme', completed: false }
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
        { id: 4, text: 'Write tests', completed: false }
      ])
    })
    it('clears completed with clearCompleted', function() {
      let { todos } = microstate(TodoMVC, {
        todos: [todoOne, freeze({ id: 2, text: 'Write readme', completed: true }), todoThree]
      })
        .clearCompleted()
        .valueOf()
      expect(todos).to.deep.equal([todoOne, todoThree])
    })
    describe('startEditing', function() {
      let startedEditing = filled.startEditing(todoTwo)
      it('sets todo as editing', function() {
        expect(startedEditing.state.editing.id).to.equal(todoTwo.id)
      })
      it('sets editText to name of the todo', () => {
        expect(startedEditing.state.editText).to.equal('Write readme')
      })
    })
    describe('finishEditing', function() {
      let edited = filled
        .startEditing(todoTwo)
        .editText.set('Update readme')
        .finishEditing()
      it('updated todo in todos', function() {
        expect(edited.state.todos[1].text).to.equal('Update readme')
      })
      it('clears the editText', function() {
        expect(edited.state.editText).to.equal('')
      })
      it('clears editing', function() {
        expect(edited.state.editing).to.deep.equal({})
      })
    })
    describe('insertNewTodo', function() {
      let inserted = empty.newTodo.set('Go for a walk').insertNewTodo()
      it('adds todo item', function() {
        expect(inserted.state.todos).to.deep.equal([
          { id: 1, text: 'Go for a walk', completed: false }
        ])
      })
      it('clears newTodo text field', function() {
        expect(inserted.state.newTodo).to.equal('')
      })
    })
    describe('toggleAll', function() {
      let completed = someCompleted.toggleAll()
      let noneCompleted = allCompleted.toggleAll()
      it('makes some completed into all completed', function() {
        expect(completed.state.isAllComplete).to.be.true
      })
      it('makes all completed into all incompleted', function() {
        expect(noneCompleted.state.completedCount).to.equal(0)
      })
    })
    describe('updateTodo', function() {
      it('edits todo when text changed', function() {
        let updated = filled.updateTodo(todoTwo, 'Edit readme')
        expect(updated.state.todos[1].text).to.equal('Edit readme')
      })
      it('deletes todo when text is empty', function() {
        let deleted = filled.updateTodo(todoTwo, '')
        expect(deleted.state.todos).to.deep.equal([
          { id: 1, text: 'Make initial commit', completed: false },
          { id: 3, text: 'Release microstates', completed: false }
        ])
      })
    })
  })
})
