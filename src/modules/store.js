import { createStore } from 'vuex'

/*
    Vuex.
*/

const state = {
  username: sessionStorage.getItem('username'),
  email: sessionStorage.getItem('email')
}

const mutations = {
  login(state, user) {
    state.username = user.username
    state.email = user.email
  },
  logout(state) {
    state.username = null
    state.email = null
  }
}

const actions = {
  login(ctx, user) {
    ctx.commit('login', user)
    sessionStorage.setItem('username', user.username)
    sessionStorage.setItem('email', user.email)
  },
  logout(ctx) {
    ctx.commit('logout')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('email')
  }
}

const getters = {
  username(state) {
    return state.username
  },
  email(state) {
    return state.email
  }
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})
