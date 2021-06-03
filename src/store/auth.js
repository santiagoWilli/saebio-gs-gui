import * as Api from '../api'
export default {
    state: {
        token: null,
        loginError: null
    },
    getters: {
        token(state) {
            return state.token
        },
        loginError(state) {
            return state.loginError
        }
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setLoginError(state, payload) {
            state.loginError = payload
        }
    },
    actions: {
        login({ commit }, user) {
            Api.login(user)
                .then((r) => {
                    commit('setToken', r.data.token)
                    localStorage.setItem('token', r.data.token)
                })
                .catch(e => {
                    commit('setLoginError', e.response.data)
                })
        },
        readToken({ commit }) {
            if (localStorage.getItem('token')) commit('setToken', localStorage.getItem('token'))
        }
    }
}