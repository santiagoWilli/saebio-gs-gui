import Api from "@/Api";
import ErrorMessage from "@/ErrorMessage";

export default {
    state: {
        references: [],
        uploadMessage: null,
        uploadError: false,
    },
    getters: {
        references(state) {
            return state.references
        },
        uploadMessage(state) {
            return state.uploadMessage
        },
        uploadError(state) {
            return state.uploadError
        }
    },
    mutations: {
        setReferences(state, payload) {
            state.references = payload
        },
        setUploadMessage(state, payload) {
            state.uploadMessage = payload
        },
        setUploadError(state, payload) {
            state.uploadError = payload
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
        },
        uploadReference({ commit }, reference) {
            Api.uploadReference(reference, this.getters.token)
                .then(() => {
                    commit('setUploadError', false)
                    commit('setUploadMessage', 'Referencia subida con éxito')
                    Api.getReferences(this.getters.token).then(r => commit('setReferences', r.data))
                })
                .catch((e) => {
                    commit('setUploadError', true)
                    commit('setUploadMessage', ErrorMessage.upload(e.response.status))
                })
        }
    }
}