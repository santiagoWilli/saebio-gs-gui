import * as Api from '../api'

export default {
    state: {
        references: []
    },
    getters: {
        references(state) {
            return state.references
        }
    },
    mutations: {
        setReferences(state, payload) {
            state.references = payload
        }
    },
    actions: {
        getReferences({ commit }) {
            return Api.getReferences(this.getters.token)
                .then(response => {
                    commit('setReferences', response.data)
                    return true
                })
                .catch(() => false)
        }
    }
}