<template lang="pug">
  form.todo(
    :class='{important: todo.isImportant, on_editing: todo.isEditing}',
    @submit.prevent='saveEdit'
    )
    .brief_content(@click='$store.commit("toggleFullContent", todo)')
      a.drag_handler
        i.fas.fa-ellipsis-v
      label(
        @click.stop='$store.commit("toggleCompleted", todo)', 
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
          v-model='tempTodo.title')
        .todo_detail
          .todo_deadline(v-if='todo.deadline')
            i.far.fa-calendar-alt
            span {{ todo.deadline }}
          .todo_comment(v-if='todo.comment')
            i.far.fa-comment-dots
      .todo_main_actions
        a(@click.stop='$store.commit("toggleImportant", todo)')
          i(:class='todo.isImportant ? "fas fa-star" : "far fa-star"')
        a(@click.stop='editTodo(todo)')
          i.fas.fa-edit(:class='{on_editing: todo.isEditing}')
        a(@click.stop='$store.commit("deleteTodo", todo)')
          i.fas.fa-trash-alt

    .full_content(:class='{active: todo.isOpen}')
      .field
        i.far.fa-calendar-alt 
        strong Deadline
        p(v-if='!todo.isEditing') {{ todo.deadline }}
        datePicker(
          v-if='todo.isEditing',
          :date='startTime',
          :option='option'
        )
        //- input.input(
        //-   v-if='todo.isEditing', 
        //-   type="datetime-local", 
        //-   v-model='todo.deadline')
      .field
        i.far.fa-comment-dots 
        strong {{ tempTodo.comment ? 'Comment' : 'No Comment'}}
        p(v-if='!todo.isEditing') {{ todo.comment }}
        textarea.input(
          v-if='todo.isEditing',
          v-model='tempTodo.comment')
    .event_actions(v-if='todo.isEditing')
      button(@click.prevent='cancelEdit').cancel.form_btn
        i.fas.fa-times
        span Cancel
      button(@submit='saveEdit').save.form_btn
        i.fas.fa-save
        span Save

</template>

<script>
  import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

  export default {
    props: [
      'todo'
    ],
    components: {
      datePicker: myDatepicker
    },
    data() {
      return {
        // myDatepicker
          startTime: {
            time: this.todo.deadline // get value here
          },
          endtime: {
            time: ''
          },
          option: {
            type: 'day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD',
            placeholder: '',
            inputStyle: {
              'display': 'block',
              'padding': '6px',
              'line-height': '22px',
              'font-size': '16px',
              'border-radius': '4px',
              'border': '1px solid #dbdbdb',
              'box-shadow': 'inset 0 1px 2px rgba(10, 10, 10, 0.1)',
              'color': '#5F5F5F'
            },
            color: {
              header: '#4fc08d',
              headerText: '#f2f2f2'
            },
            buttons: {
              ok: 'Ok',
              cancel: 'Cancel'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
          },
          timeoption: {
            type: 'min',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD HH:mm'
          },
          multiOption: {
            type: 'multi-day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format:"YYYY-MM-DD HH:mm"
          },
          limit: [{
            type: 'weekday',
            available: [1, 2, 3, 4, 5]
          },
          {
            type: 'fromto',
            from: '2020-12-31',
            to: '2020-12-31'
          }]
      }
    },
    methods: {
      editTodo(todo) {
        this.$store.commit('setTempTodoForEdit', todo)
        this.startTime.time = this.$store.state.tempTodo.deadline
        this.$store.commit("toggleEditing", todo) // only change status
      },
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
        this.$store.commit('updateEditDeadline', this.startTime.time)
        this.tempTodo.isImportant = this.todo.isImportant
        this.$store.commit('saveUpdateTodo', this.tempTodo)
      }
    },
    computed: {
      tempTodo() {
        return this.$store.state.tempTodo
      }
    },
    filters: {
      toCapitalize(val) {
        return val.charAt(0).toUpperCase() + val.slice(1)
      }
    }
  }
</script>