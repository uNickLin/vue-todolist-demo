<template lang="pug">
  main#index
    #mask(:class='{active: isSomeoneEditing}')
    .todo_container
      transition(
        v-if='currentView === "add todo"',
        name='right-in-left-out',
        mode='out-in')
        add-todo
      transition(
        v-if='currentView === "overview"',
        name='left-in-right-out',
        mode='out-in')
        todo-list
      
</template>


<script>
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import {mapState} from 'vuex'

export default {
  name: 'hello',
  components: {
    AddTodo, TodoList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'currentView',
      'currentTab',
      'tabList',
      'todos'
    ]),
    isSomeoneEditing() {
      if (this.todos.some(todo => todo.isEditing)) return true
      else return false
    }
  }
}
</script>
