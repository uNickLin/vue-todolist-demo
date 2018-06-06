import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		currentView: 'overview',
		currentTab: 'My Tasks',
		tabList: [
			'My Tasks', 'In Progress', 'Completed'
		],
		nextTodoId: 0,
		todos: [
			// {
			// 	id: 1,
			// 	title: 'Todo Title 1',
			// 	deadline: '2018-11-11',
			// 	comment: 'This is todo 1',
			// 	isImportant: false,
			// 	isEditing: false,
			// 	isCompleted: false,
			// 	isOpen: true
			// },
			// {
			// 	id: 2,
			// 	title: 'Todo Title 2',
			// 	deadline: '2018-11-12',
			// 	comment: 'This is todo 2',
			// 	isImportant: true,
			// 	isEditing: false,
			// 	isCompleted: false,
			// 	isOpen: false
			// },
			// {
			// 	id: 3,
			// 	title: 'Todo Title 3',
			// 	deadline: '2018-11-13',
			// 	comment: 'This is todo 3',
			// 	isImportant: false,
			// 	isEditing: false,
			// 	isCompleted: true,
			// 	isOpen: false
			// }
		]
	},
	mutations: {
		changeView(state, view) {
			state.currentView = view
		},
		changeTab(state, tab) {
      state.currentTab = tab
    },
    toggleFullContent(state, targetTodo) {
      if (!targetTodo.isEditing) {
        targetTodo.isOpen = !targetTodo.isOpen
        state.todos.filter(todo => todo.id !== targetTodo.id).forEach(todo => {
          todo.isEditing = false
          todo.isOpen = false
        })
      }
    },
    toggleImportant(state, todo) {
			todo.isImportant = !todo.isImportant
			store.commit('saveLocalTodoList')
    },
    toggleEditing(state, targetTodo) {
      targetTodo.isEditing = true
      targetTodo.isOpen = true
      state.todos.filter(todo => todo.id !== targetTodo.id).forEach(todo => {
        todo.isEditing = false
        todo.isOpen = false
      })
    },
    toggleCompleted(state, todo) {
			todo.isCompleted = !todo.isCompleted
			store.commit('saveLocalTodoList')
    },
    saveUpdateTodo(state, updateTodo) {
      let updateTarget = state.todos.find(todo => todo.id === updateTodo.id)
      updateTarget.title = updateTodo.title
      updateTarget.deadline = updateTodo.deadline
      updateTarget.comment = updateTodo.comment
      updateTarget.isImportant = updateTodo.isImportant
			updateTarget.isEditing = false
			store.commit('saveLocalTodoList')
    },
    deleteTodo(state, targetTodo) {
      Swal({
        title: 'Are you sure?',
        text: `${targetTodo.title}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(res => {
        if (res.value) {
					state.todos = state.todos.filter(todo => todo.id !== targetTodo.id)
					store.commit('saveLocalTodoList')
        }
      })
    },
    addTodo(state, newTodo) {
			state.todos.unshift(newTodo)
			state.nextTodoId++
			store.commit('saveLocalTodoList')
		},
		saveLocalTodoList(state) {
			localStorage.setItem('vTODOlist', JSON.stringify(state.todos))
			localStorage.setItem('vTODONextId', state.nextTodoId)
		},
		getLocalTodoList(state) {
			state.todos = JSON.parse(localStorage.getItem('vTODOlist'))
			state.nextTodoId = localStorage.getItem('vTODONextId')
		}
	}
})