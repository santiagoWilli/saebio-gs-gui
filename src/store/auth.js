import * as Api from '../api'
import ErrorMessage from '../api/ErrorMessage'

function tokenIsValid(expDate) {
    return (expDate > new Date().getTime())
}

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
        tokenExpiresAt(state) {
            return state.tokenExpiresAt
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
            state.tokenExpiresAt = payload
        },
        setLoginError(state, payload) {
            state.loginError = payload
        }
    },
    actions: {
        login({ commit }, user) {
            return Api.login(user)
                .then((r) => {
                    const expiry = new Date().getTime() + r.data.expiresAfter * 1000
                    commit('setToken', r.data.token)
                    commit('setTokenExpiresAt', expiry)
                    commit('setLoginError', null)
                    localStorage.setItem('token', r.data.token)
                    localStorage.setItem('exp', expiry.toString())
                    return true
                })
                .catch(e => {
                    console.log(e.response)
                    commit('setLoginError', ErrorMessage.login(e.response.status))
                    return false
                })
        },
        readToken({ commit, getters }) {
            if (localStorage.getItem('token') && localStorage.getItem('exp')) {
                commit('setTokenExpiresAt', localStorage.getItem('exp'))
                if (tokenIsValid(getters.tokenExpiresAt)) {
                    commit('setToken', localStorage.getItem('token'))
                }
            }
        }
    }
}