<template lang="pug">
  form#add_todo_template
    .add_todo_head
      a(@click='$emit("changeView")')
        i.fas.fa-chevron-left
      h2 New Todo
      a(@click='newTodo.isImportant = !newTodo.isImportant')
        i(:class='newTodo.isImportant ? "fas fa-star" : "far fa-star"')
    .add_todo_content
      .field
        label Title
        input.input(
          type="text", 
          v-model='newTodo.title',
          required)
      .field
        label Deadline
        input.input(
          type="datetime-local", 
          v-model='newTodo.deadline')
      .field
        label Comment
        textarea.input(v-model='newTodo.comment')
    .add_todo_footer
      button.cancel 
        i.fas.fa-times
        span Cancel
      button(@submit='submit').save 
        i.fas.fa-save
        span Save
</template>

<script>
  export default {
    data() {
      return {
        newTodo: {
          id: Math.ceil(Math.random() * 1000),
          title: '',
          deadline: '',
          comment: '',
          isImportant: false,
          isEditing: false,
          isCompleted: false,
          isOpen: false
        }
      }
    },
    methods: {
      submit() {
        alert('done!')
      }
    },
  }
</script>
