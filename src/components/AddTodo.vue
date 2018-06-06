<template lang="pug">
  form#add_todo_template(@submit.prevent='addTodo')
    .add_todo_head
      a(@click='cancelAdd')
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
      button(@click.prevent='cancelAdd').cancel.form_btn
        i.fas.fa-times
        span Cancel
      button(@submit='addTodo').save.form_btn
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
      cancelAdd() {
        this.$alert({
          title: 'Leaving?',
          text: 'Data will lost.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(res => {
          if (res.value) {
            this.$emit("changeView")
          }
        })
      },
      addTodo() {
        this.$emit('addTodo', this.newTodo)
        this.$emit("changeView")
      }
    },
  }
</script>
