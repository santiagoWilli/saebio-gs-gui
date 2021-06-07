import * as Api from '../api'

export default {
    state: {
        sequences: []
    },
    getters: {
        sequences(state) {
            return state.sequences
        }
    },
    mutations: {
        setSequences(state, payload) {
            state.sequences = payload
        }
    },
    actions: {
        getSequences({ commit }) {
            return Api.getSequences(this.getters.token)
                .then(response => {
                    commit('setSequences', response.data)
                    return true
                })
                .catch(() => false)
        }
    }
}