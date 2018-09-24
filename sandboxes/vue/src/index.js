// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import TodoMVC from '@microstates/todomvc';
import { create, Store } from 'microstates';

import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

const key = 'microstates-todomvc';

const restore = () => JSON.parse(localStorage.getItem(key) || 'null');
const save = value => localStorage.setItem(key, JSON.stringify(value));

const initial = restore() || {
  todos: [{ id: 0, text: 'Write Microstates Docs', completed: false }],
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  data() {
    return {
      key: 0,
    };
  },
  created() {
    this.app = Store(create(TodoMVC, initial), (app) => {
      this.app = app;
      this.key = this.key + 1;
      save(app.state);
    });
  },
  template: '<App :app="app" :key="key"/>',
});
