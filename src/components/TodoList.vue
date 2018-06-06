<template lang="pug">
  #todo_list
    .add_info
      a(@click='$store.commit("changeView", "add todo")')
        i.fas.fa-pencil-alt
        label New Todo
      span {{ doneTodosCount }} todos has done, {{ undoneTodosCount }} todos left.
    tabs(
      :currentTab='currentTab', 
      :tabs='tabList')
    .list_container
      .empty(v-if='todesFiltered.length === 0')
        p {{ emptyText }}
      .todo_list.importants(v-if='importantTodos.length > 0')
        todo(
          v-for='event in importantTodos', 
          :key='event.id', 
          :todo='event')
      .todo_list(v-if='commonTodos.length > 0')
        todo(
          v-for='event in commonTodos', 
          :key='event.id', 
          :todo='event')
</template>

<script>
  import Tabs from './Tabs'
  import Todo from './Todo'
  import {mapState} from 'vuex'

  export default {
    components: {
      Tabs, Todo
    },
    computed: {
      ...mapState([
        'currentView',
        'currentTab',
        'tabList',
        'todos'
      ]),
      emptyText() {
        if (this.todos.length === 0) {
          return 'Try to add something.'
        } else if (this.todos.filter(todo => !todo.isCompleted).length === 0) {
          return 'You\'ve done everything !'
        } else if (this.todos.filter(todo => todo.isCompleted).length === 0) {
          return 'Keep working on it !'
        }
      },
      todesFiltered() {
        switch (this.currentTab) {
          case 'My Tasks':
            return this.todos
            break;

          case 'In Progress':
            return this.todos.filter(todo => !todo.isCompleted)

          case 'Completed':
            return this.todos.filter(todo => todo.isCompleted)
        }
      },
      importantTodos() {
        return this.todesFiltered.filter(todo => todo.isImportant)
      },
      commonTodos() {
        return this.todesFiltered.filter(todo => !todo.isImportant)
      },
      doneTodosCount() {
        return this.todos.filter(todo => todo.isCompleted).length
      },
      undoneTodosCount() {
        return this.todos.filter(todo => !todo.isCompleted).length
      }
    }
  }
</script>