<template lang="pug">
  form.todo(
    :class='{important: todo.isImportant, on_editing: todo.isEditing}',
    @submit.prevent='saveEdit'
    )
    .brief_content(@click='$emit("toggleFullContent", todo)')
      a.drag_handler
        i.fas.fa-ellipsis-v
      label(
        @click.stop='$emit("toggleCompleted", todo)', 
        :class='{checked: todo.isCompleted}')
        i.fas.fa-check(:class='{"checked-in": todo.isCompleted}')
        input(
          @click.stop='', 
          type="checkbox", 
          :checked='todo.isCompleted')
      .todo_main_head(:class='{completed: todo.isCompleted}')
        h2(v-if='!todo.isEditing') {{ todo.title | toCapitalize }}
        input.input(
          @click.stop='',
          required,
          v-if='todo.isEditing', 
          type="text", 
          v-model='todo.title')
        .todo_detail
          .todo_deadline(v-if='todo.deadline')
            i.far.fa-calendar-alt
            span {{ todo.deadline }}
          .todo_comment(v-if='todo.comment')
            i.far.fa-comment-dots
      .todo_main_actions
        a(@click.stop='$emit("toggleImportant", todo)')
          i(:class='todo.isImportant ? "fas fa-star" : "far fa-star"')
        a(@click.stop='$emit("toggleEditing", todo)')
          i.fas.fa-edit(:class='{on_editing: todo.isEditing}')
        a(@click.stop='$emit("deleteTodo", todo)')
          i.fas.fa-trash-alt

    .full_content(:class='{active: todo.isOpen}')
      .field
        i.far.fa-calendar-alt 
        strong Deadline
        p(v-if='!todo.isEditing') {{ todo.deadline }}
        input.input(
          v-if='todo.isEditing', 
          type="datetime-local", 
          v-model='todo.deadline')
      .field
        i.far.fa-comment-dots 
        strong {{ todo.comment ? 'Comment' : 'No Comment'}}
        p(v-if='!todo.isEditing') {{ todo.comment }}
        textarea.input(
          v-if='todo.isEditing',
          v-model='todo.comment')
    .event_actions(v-if='todo.isEditing')
      button(@click.prevent='cancelEdit').cancel.form_btn
        i.fas.fa-times
        span Cancel
      button(@submit='saveEdit').save.form_btn
        i.fas.fa-save
        span Save

</template>

<script>
  export default {
    props: [
      'todo'
    ],
    methods: {
      cancelEdit() {
        this.$alert({
          title: 'Cancel?',
          text: 'Data will lost.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(res => {
          if (res.value) {
            this.todo.isEditing = false
          }
        })
      },
      saveEdit() {
        this.todo.isEditing = false
      }
    },
    filters: {
      toCapitalize(val) {
        return val.replace(/\b\w/g, l => l.toUpperCase())
      }
    }
  }
</script>