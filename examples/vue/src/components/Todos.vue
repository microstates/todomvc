<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-bind:value="model.newTodo" v-on:input="actions.newTodo.set($event.target.value)" @keyup.enter="actions.insertNewTodo" />
        </header>
        <section class="main" v-show="model.hasTodos" v-cloak>
            <input type="checkbox" class="toggle-all" v-bind:checked="model.isAllComplete" @click="actions.toggleAll">
            <ul class="todo-list">
                <li class="todo" v-for="todo in model.filteredTodos" :class="{completed : todo.completed, editing : todo.id === model.editing.id }" v-bind:key="todo.id">
                    <div class="view">
                        <input type="checkbox" :checked="todo.completed" @change="actions.toggleTodo(todo)"  class="toggle">
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
                <li v-for="(title, filter) in model.FILTER_OPTIONS" v-bind:key="filter">
                  <router-link :to="`/${filter ? '?filter=' + filter : ''}`" :class="{selected: model.filter === filter}">{{title}}</router-link>
                </li>
            </ul>
            <button class="clear-completed" v-show="model.completedCount > 0" @click.prevent="actions.clearCompleted">Clear Completed</button>
        </footer>
    </section>
</template>

<script>
import Vue from 'vue'
import connect from '../utils/connect'
import TodoMVC from 'microstates-todomvc'

export default connect(TodoMVC, {
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