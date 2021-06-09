import * as Api from '../api'
import ErrorMessage from "@/api/ErrorMessage";

export default {
    state: {
        sequences: [],
        sequence: null,
        sequenceError: null
    },
    getters: {
        sequences(state) {
            return state.sequences
        },
        sequence(state) {
            return state.sequence
        },
        sequenceError(state) {
            return state.sequenceError
        }
    },
    mutations: {
        setSequences(state, payload) {
            state.sequences = payload
        },
        setSequence(state, payload) {
            state.sequence = payload
        },
        setSequenceError(state, payload) {
            state.sequenceError = payload
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
        },
        getSequence({ commit }, id) {
            Api.getSequence(id, this.getters.token)
                .then(response => {
                    commit('setSequence', response.data)
                })
                .catch(e => {
                    commit('setSequenceError', ErrorMessage.getResource(e.response.status))
                })
        }
    }
}