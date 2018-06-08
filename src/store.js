import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		hasNotify: false,
		currentView: 'overview',
		currentTab: 'My Tasks',
		tabList: [
			'My Tasks', 'In Progress', 'Completed'
		],
		nextTodoId: 4,
		tempTodo: {
			id: null,
			title: '',
			deadline: '',
			comment: '...',
			isImportant: false,
			isEditing: false,
			isCompleted: false,
			isOpen: false
		},
		todos: [
			{
				id: 1,
				sort: 1,
				title: 'Drag and sort',
				deadline: '2018-06-08',
				comment: 'Still working on Muuri.js doc, will apply Sortable.js if Muuri fail ...',
				isImportant: false,
				isEditing: false,
				isCompleted: false,
				isOpen: true
			},
			{
				id: 2,
				sort: 2,
				title: 'Localstorage fail on PWA',
				deadline: '2018-06-08',
				comment: 'Turns out there\'s nothing to do with localstorage, it\'s my stupid mistake in manifest: start_url: "/index.html", it should be "/" ...',
				isImportant: true,
				isEditing: false,
				isCompleted: true,
				isOpen: true
			},
			{
				id: 3,
				sort: 3,
				title: 'Write your todo now !',
				deadline: '2020-12-31',
				comment: '',
				isImportant: false,
				isEditing: false,
				isCompleted: false,
				isOpen: false
			}
		]
	},
	mutations: {
		setTempTodoForEdit(state, editTodo) {
			state.tempTodo = Object.assign({}, editTodo)
		},
		updateEditDeadline(state, newDeadline) {
			state.tempTodo.deadline = newDeadline
		},
		closeNotify(state) {
			state.hasNotify = true
			localStorage.setItem('vTODOHasNotify', JSON.stringify(state.hasNotify))
		},
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
			let localdata = JSON.parse(localStorage.getItem('vTODOlist')) || state.todos
			localdata.forEach(todo => {
				// todo.isOpen = false
				todo.isEditing = false
			})
			state.todos = localdata
			state.nextTodoId = parseInt(localStorage.getItem('vTODONextId')) || state.nextTodoId
			state.hasNotify = JSON.parse(localStorage.getItem('vTODOHasNotify')) || false
		}
	}
})