<template lang="pug">
  article.todo
    .brief_content(@click='$emit("toggleFullContent")')
      a.drag_handler
        i.fas.fa-ellipsis-v
      label(
        @click.stop='$emit("toggleCompleted")', 
        :class='{checked: todo.isCompleted}')
        i.fas.fa-check(:class='{"checked-in": todo.isCompleted}')
        input(
          @click.stop='', 
          type="checkbox", 
          :checked='todo.isCompleted')
      .todo_main_head(:class='{completed: todo.isCompleted}')
        h2(v-if='!todo.isEditing') {{ todo.title }}
        input(
          v-if='todo.isEditing', 
          type="text", 
          v-model='todo.title')
        .todo_deadline
          i.far.fa-calendar-alt
          span {{ todo.deadline }}
      .todo_main_actions
        a(@click.stop='$emit("toggleImportant")')
          i(:class='todo.isImportant ? "fas fa-star" : "far fa-star"')
        a(@click.stop='')
          i.fas.fa-pencil-alt
        a(@click.stop='$emit("deleteTodo")')
          i.fas.fa-trash-alt

    .full_content(:class='{active: todo.isOpen}')
      .form-group
        i.far.fa-calendar-alt Deadline
        p(v-if='!todo.isEditing') {{ todo.deadline }}
        input(
          v-if='todo.isEditing', 
          type="text", 
          v-model='todo.deadline')
      .form-group
        i.far.fa-comment-dots
        p(v-if='!todo.isEditing') {{ todo.comment }}
        input(
          v-if='todo.isEditing', 
          type="text", 
          v-model='todo.comment')
      .event_actions
        a
          i.fas.fa-times
        a
          i.fas.fa-check

</template>

<script>
  export default {
    props: [
      'todo'
    ]
  }
</script>