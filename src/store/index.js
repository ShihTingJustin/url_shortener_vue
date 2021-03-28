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
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email } = data
        commit('setCurrentUser', { id, name, email })
        console.log('data',data)
        if (data.state === 'error') throw new Error(data.message)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
