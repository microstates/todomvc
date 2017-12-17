<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-bind:value="model.newTodo" v-on:input="actions.newTodo.set($event.target.value)" @keyup.enter="actions.insertNewTodo" />
        </header>
        <section class="main" v-show="model.hasTodos" v-cloak>
            <!-- <input type="checkbox" class="toggle-all" v-model="allDone"> -->
            <ul class="todo-list">
                <li class="todo" v-for="todo in model.filteredTodos" :class="{completed : todo.completed, editing : todo.id === model.editing.id }" v-bind:key="todo.id">
                    <div class="view">
                        <input type="checkbox" :checked="todo.completed" @change="actions.completeTodo(todo)"  class="toggle">
                        <label @dblclick="actions.startEditing(todo)">{{ todo.text }}</label>
                        <button class="destroy" @click.prevent="actions.deleteTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-bind:value="model.editText" v-on:input="actions.editText.set($event.target.value)" @keyup.enter="actions.finishEditing" @blur="actions.finishEditing" v-todoFocus="todo === model.editing" />
                </li>
            </ul>
        </section>
        <footer class="footer" v-show="model.hasTodos">
            <span class="todo-count">
            <strong>{{ model.remainingCount }}</strong> {{ model.remainingCount | pluralize }} left
            </span>
            <ul class="filters">
                <li><router-link to="/" :class="{selected: model.filter == ''}">All</router-link></li>
                <li><router-link to="/?filter=show_active" :class="{selected: model.filter == 'show_active'}" >Active</router-link></li>
                <li><router-link to="/?filter=show_completed" :class="{selected: model.filter == 'show_completed'}">Completed</router-link></li>
            </ul>
            <button class="clear-completed" v-show="model.completedCount > 0" @click.prevent="actions.clearCompleted">Clear Completed</button>
        </footer>
    </section>
</template>

<script>
import Vue from 'vue'
import connect from '../utils/connect'
import * as MS from 'microstates'
import TodoMVC from 'microstates-todomvc'

class VueTodoMVC extends TodoMVC {
  newTodo = MS.String
  editing = MS.Object
  editText = MS.String

  finishEditing({ editing, editText }) {
    return this()
      .editTodo(editing, editText)
      .editText.set('')
      .editing.set(null)
  }

  startEditing(current, todo) {
    return this()
      .editing.set(todo)
      .editText.set(todo.text)
  }

  insertNewTodo(current) {
    return this()
      .addTodo(current.newTodo)
      .newTodo.set('')
  }
}

export default connect(VueTodoMVC, {
  props: ['filter'],
  filters: {
    pluralize: function(n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.actions.filter.set(to.query.filter)
    next()
  },
  directives: {
    todoFocus(el, value) {
      if (value) {
        Vue.nextTick(_ => {
          el.focus()
        })
      }
    }
  }
})
</script>

<style src="./todo.css"></style>