import { createStore } from 'vuex'

const state = {
    user: sessionStorage.getItem('user')
};

const mutations = {
    login(state, user) {
        state.user = user;
    },
    logout(state) {
        state.user = null;
    }
};

const actions = {
    login(ctx, user) {
        ctx.commit('login', user);
        sessionStorage.setItem('user', user);
    },
    logout(ctx) {
        ctx.commit('logout');
        sessionStorage.removeItem('user');
    }
};

const getters = {
    user(state) {
        return state.user;
    }
};

export default createStore({
    state,
    getters,
    actions,
    mutations
});