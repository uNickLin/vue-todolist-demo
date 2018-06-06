<template lang="pug">
  main#index
    #mask(:class='{active: isSomeoneEditing}')
    .todo_container
      transition(
        v-if='currentView === "add todo"',
        name='right-in-left-out',
        mode='out-in')
        add-todo(
          @changeView='currentView = "overview", currentTab="My Tasks"',
          @addTodo='addTodo')
      transition(
        v-if='currentView === "overview"',
        name='left-in-right-out',
        mode='out-in')
        todo-list(
          :currentTab='currentTab',
          :todos='todos',
          :tabList='tabList',
          @changeTab='changeTab',
          @changeView='currentView = "add todo", currentTab="My Tasks"',
          @toggleFullContent='toggleFullContent',
          @toggleImportant='toggleImportant',
          @toggleEditing='toggleEditing',
          @toggleCompleted='toggleCompleted',
          @saveUpdateTodo='saveUpdateTodo',
          @deleteTodo='deleteTodo')
      
</template>


<script>
import AddTodo from './AddTodo'
import TodoList from './TodoList'

export default {
  name: 'hello',
  components: {
    AddTodo, TodoList
  },
  data () {
    return {
      currentView: 'overview',
      currentTab: 'My Tasks',
      tabList: [
        'My Tasks', 'In Progress', 'Completed'
      ],
      todos: [
        {
          id: 1,
          title: 'Todo Title 1',
          deadline: '2018-11-11',
          comment: 'This is todo 1',
          isImportant: false,
          isEditing: false,
          isCompleted: false,
          isOpen: true
        },
        {
          id: 2,
          title: 'Todo Title 2',
          deadline: '2018-11-12',
          comment: 'This is todo 2',
          isImportant: true,
          isEditing: false,
          isCompleted: false,
          isOpen: false
        },
        {
          id: 3,
          title: 'Todo Title 3',
          deadline: '2018-11-13',
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
    changeTab(tab) {
      this.currentTab = tab
    },
    toggleFullContent(targetTodo) {
      if (!targetTodo.isEditing) {
        targetTodo.isOpen = !targetTodo.isOpen
        this.todos.filter(todo => todo.id !== targetTodo.id).forEach(todo => {
          todo.isEditing = false
          todo.isOpen = false
        })
      }
    },
    toggleImportant(todo) {
      todo.isImportant = !todo.isImportant
    },
    toggleEditing(targetTodo) {
      targetTodo.isEditing = true
      targetTodo.isOpen = true
      this.todos.filter(todo => todo.id !== targetTodo.id).forEach(todo => {
        todo.isEditing = false
        todo.isOpen = false
      })
    },
    toggleCompleted(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    saveUpdateTodo(updateTodo) {
      let updateTarget = this.todos.find(todo => todo.id === updateTodo.id)
      updateTarget.title = updateTodo.title
      updateTarget.deadline = updateTodo.deadline
      updateTarget.comment = updateTodo.comment
      updateTarget.isImportant = updateTodo.isImportant
      updateTarget.isEditing = false
    },
    deleteTodo(targetTodo) {
      this.$alert({
        title: 'Are you sure?',
        text: `${targetTodo.title}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(res => {
        if (res.value) {
          this.todos = this.todos.filter(todo => todo.id !== targetTodo.id)
        }
      })
    },
    addTodo(newTodo) {
      this.todos.unshift(newTodo)
    }
  },
  computed: {
    isSomeoneEditing() {
      if (this.todos.some(todo => todo.isEditing)) return true
      else return false
    }
  }
}
</script>
