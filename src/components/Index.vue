<template lang="pug">
  main#index
    .todo_container
      .add_todo
      .todo_list.importants
        todo(
          v-for='event in importantTodos', 
          :key='event.id', 
          :todo='event', 
          @toggleFullContent='accordionTodo(event)',
          @toggleImportant='changeImportant(event)',
          @toggleCompleted='changeCompleted(event)')
      .todo_list
        todo(
          v-for='event in commonTodos', 
          :key='event.id', 
          :todo='event', 
          @toggleFullContent='accordionTodo(event)',
          @toggleImportant='changeImportant(event)',
          @toggleCompleted='changeCompleted(event)')
      
</template>


<script>
import Todo from './Todo'
export default {
  name: 'hello',
  components: {
    Todo
  },
  data () {
    return {
      todos: [
        {
          id: 1,
          title: 'Todo Title 1',
          deadline: '2018-11-11 11:11',
          comment: 'This is todo 1',
          isImportant: false,
          isEditing: false,
          isCompleted: false,
          isOpen: false
        },
        {
          id: 2,
          title: 'Todo Title 2',
          deadline: '2018-11-11 11:12',
          comment: 'This is todo 2',
          isImportant: true,
          isEditing: false,
          isCompleted: false,
          isOpen: false
        },
        {
          id: 3,
          title: 'Todo Title 3',
          deadline: '2018-11-11 11:13',
          comment: 'This is todo 3',
          isImportant: false,
          isEditing: false,
          isCompleted: true,
          isOpen: false
        }
      ]
    }
  },
  methods: {
    accordionTodo(event) {
      if (event.isOpen) event.isOpen = false
      else {
        this.todos.forEach(todo => todo.isOpen = false)
        event.isOpen = true
      }
    },
    changeImportant(event) {
      event.isImportant = !event.isImportant
    },
    changeCompleted(event) {
      event.isCompleted = !event.isCompleted
    }
  },
  computed: {
    importantTodos() {
      return this.todos.filter(todo => todo.isImportant)
    },
    commonTodos() {
      return this.todos.filter(todo => !todo.isImportant)
    }
  }
}
</script>
