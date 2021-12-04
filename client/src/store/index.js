import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null || localStorage.getItem('userID'),
      roles: [],
    },
    token: '' || localStorage.getItem('token'),
  },
  getters: {
    getRoles(state) {
      return state.user.roles;
    },

    getUserID(state) {
      return state.user.id;
    },

    isAuthenticated(state) {
      return !!state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token)
    },
    setRoles(state, roles) {
      state.user.roles = roles;
    },

    setUserID(state, userID) {
      console.log(userID)
      state.user.id = userID;
    }
  },
  actions: {
    commitToken({ commit }, payload) {
      console.log('commit token')
      commit('setToken', payload.token)
    },

    commitUserID({ commit }, payload) {
      console.log('setting user id', payload.userID)
      commit('setUserID', payload.userID)
    },

    commitRoles({ commit, state }) {
      axios.post('/get_roles', { userId: state.user.id }).then(resp => {
        console.log('roles', resp.data)
        commit('setRoles', resp.data)
      }).catch(err => console.log(err))
    },

  },
  modules: {
  }
})
