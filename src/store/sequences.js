import Api from "@/Api";
import ErrorMessage from "@/ErrorMessage";

export default {
    state: {
        sequences: [],
        sequence: null,
        sequenceError: null,
        uploadSequenceMessage: null,
        uploadSequenceError: false
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
        },
        uploadSequenceMessage(state) {
            return state.uploadSequenceMessage
        },
        uploadSequenceError(state) {
            return state.uploadSequenceError
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
        },
        setUploadSequenceMessage(state, payload) {
            state.uploadSequenceMessage = payload
        },
        setUploadSequenceError(state, payload) {
            state.uploadSequenceError = payload
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
        },
        uploadSequence({ commit }, sequence) {
            if (sequence.length !== 2 || filesDoNotFormASequence(sequence)) {
                commit('setUploadSequenceMessage', 'Debes seleccionar dos archivos que conformen una secuencia')
                commit('setUploadSequenceError', true)
            } else {
                Api.uploadSequence(sequence, this.getters.token)
                    .then(() => {
                        commit('setUploadSequenceMessage', sequence[0].name.includes('trimmed') ? 'Secuencia subida con éxito' : 'Trimmed solicitado para la secuencia')
                        commit('setUploadSequenceError', false)
                        Api.getSequences(this.getters.token).then(r => commit('setSequences', r.data))
                    })
                    .catch(e => {
                        commit('setUploadSequenceMessage', ErrorMessage.upload(e.response.status))
                        commit('setUploadSequenceError', true)
                    })
            }
        }
    }
}

function filesDoNotFormASequence(files) {
    let file1 = files[0].name.split('_')
    let file2 = files[1].name.split('_')
    return !(file1[0] === file2[0] && file1[1] === file2[1])
}