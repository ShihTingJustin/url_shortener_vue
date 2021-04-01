import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: ''
    },
    isAuthenticated: false,
    isLoading: false,
    isComplete: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    removeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    switchState(state, params) {
      state[params.status] = params.boolean
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email } = data
        commit('setCurrentUser', { id, name, email })
        if (data.state === 'error') throw new Error(data.message)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
