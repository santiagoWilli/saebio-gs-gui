import Api from "@/Api";
import ErrorMessage from "@/ErrorMessage";

export default {
    state: {
        references: [],
        uploadReferenceMessage: null,
        uploadReferenceError: false
    },
    getters: {
        references(state) {
            return state.references
        },
        uploadReferenceMessage(state) {
            return state.uploadReferenceMessage
        },
        uploadReferenceError(state) {
            return state.uploadReferenceError
        }
    },
    mutations: {
        setReferences(state, payload) {
            state.references = payload
        },
        setUploadReferenceMessage(state, payload) {
            state.uploadReferenceMessage = payload
        },
        setUploadReferenceError(state, payload) {
            state.uploadReferenceError = payload
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
        getReferencesWithStrain({ commit }, strainId) {
            if (strainId == null) commit('setReferences', [])
            Api.getReferencesWithStrain(strainId, this.getters.token)
                .then(response => {
                    commit('setReferences', response.data)
                })
        },
        uploadReference({ commit }, reference) {
            Api.uploadReference(reference, this.getters.token)
                .then(() => {
                    commit('setUploadReferenceError', false)
                    commit('setUploadReferenceMessage', 'Referencia subida con éxito')
                    Api.getReferences(this.getters.token).then(r => commit('setReferences', r.data))
                })
                .catch((e) => {
                    commit('setUploadReferenceError', true)
                    commit('setUploadReferenceMessage', ErrorMessage.upload(e.response.status))
                })
        }
    }
}