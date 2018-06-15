<template lang="pug">
  form#add_todo_template(@submit.prevent='addTodo')
    .add_todo_head
      a(@click='cancelAdd')
        i.fa.fa-arrow-left
      h2 New Todo
      a(@click='newTodo.isImportant = !newTodo.isImportant')
        i(:class='newTodo.isImportant ? "fa fa-star" : "fa fa-star-o"')
    .add_todo_content
      .field
        label Title
        input.input(
          type="text", 
          v-model='newTodo.title',
          required)
      .field
        label Deadline
        datePicker(
          :date='startTime',
          :option='option',
          :limit='limit'
        )
        //- input.input(
        //-   type="datetime-local", 
        //-   v-model='newTodo.deadline')
      .field
        label Comment
        textarea.input(v-model='newTodo.comment')
    .add_todo_footer
      button(@click.prevent='cancelAdd').cancel.form_btn
        i.fa.fa-times
        span Cancel
      button(@submit='addTodo').save.form_btn
        i.fa.fa-save
        span Save
</template>

<script>
  import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

  export default {
    components: {
      datePicker: myDatepicker
    },
    data() {
      return {
        newTodo: {
          id: this.$store.state.nextTodoId,
          title: '',
          deadline: '',
          comment: '',
          isImportant: false,
          isEditing: false,
          isCompleted: false,
          isOpen: false
        },

        // myDatepicker
        startTime: {
          time: '' // get value here
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
        limit: [
        {
          type: 'fromto',
          from: new Date(),
          to: '2020-12-31'
        }]
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
            this.$store.commit("changeView", "overview")
          }
        })
      },
      addTodo() {
        this.newTodo.deadline = this.startTime.time
        this.$store.commit('addTodo', this.newTodo)
        this.$store.commit("changeView", "overview")
      }
    },
  }
</script>