import * as Api from '../api'
import ErrorMessage from '../api/ErrorMessage'

export default {
    state: {
        token: null,
        tokenExpiresAt: null,
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
        setTokenExpiresAt(state, payload) {
            state.tokenExpiresAt = new Date().getTime() + payload * 1000
        },
        setLoginError(state, payload) {
            state.loginError = payload
        }
    },
    actions: {
        login({ commit }, user) {
            return Api.login(user)
                .then((r) => {
                    commit('setToken', r.data.token)
                    commit('setTokenExpiresAt', r.data.expiresAfter)
                    commit('setLoginError', null)
                    localStorage.setItem('token', r.data.token)
                    localStorage.setItem('exp', r.data.expiresAfter)
                    return true
                })
                .catch(e => {
                    console.log(e.response)
                    commit('setLoginError', ErrorMessage.login(e.response.status))
                    return false
                })
        },
        readToken({ commit }) {
            if (localStorage.getItem('token') && localStorage.getItem('exp')) {
                commit('setToken', localStorage.getItem('token'))
                commit('setTokenExpiresAt', localStorage.getItem('exp'))
            }
        }
    }
}