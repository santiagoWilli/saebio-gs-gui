import Api from "@/Api";
import Utils from "@/Utils";
import ErrorMessage from "@/ErrorMessage";

export default {
    state: {
        strains: [],
        indexedStrains: [],
        strainError: null
    },
    getters: {
        strains(state) {
            return state.strains
        },
        indexedStrains(state) {
            return state.indexedStrains
        },
        strainError(state) {
            return state.strainError
        }
    },
    mutations: {
        setStrains(state, payload) {
            state.strains = payload
        },
        setIndexedStrains(state, payload) {
            state.indexedStrains = payload
        },
        removeStrain(state, strain) {
            state.strains = state.strains.filter(e => e !== strain)
        },
        setStrainError(state, error) {
            state.strainError = error
        }
    },
    actions: {
        getStrains({ commit }) {
            return Api.getStrains(this.getters.token)
                .then(response => {
                    commit('setStrains', response.data)
                    return true
                }).catch(() => false)
        },
        getIndexedStrains({ commit }) {
            return Api.getStrains(this.getters.token)
                .then(response => {
                    let strains = response.data // only for readability
                    for (let i in strains) {
                        delete Object.assign(strains, {[strains[i]._id.$oid]: strains[i] })[i];
                    }
                    commit('setIndexedStrains', strains)
                })
        },
        deleteStrain({ commit }, strain) {
            Api.deleteStrain(Utils.getId(strain), this.getters.token)
                .then(() => {
                    commit('removeStrain', strain)
                    commit('setStrainError', null)
                }).catch(e => {
                    commit('setStrainError', ErrorMessage.deleteStrain(e.response.status))
                })
        },
        createStrain({ commit }, strain) {
            return Api.createStrain(strain, this.getters.token)
                .then(() => {
                    commit('setStrainError', null)
                    Api.getStrains(this.getters.token).then(r => commit('setStrains', r.data))
                }).catch(e => {
                    commit('setStrainError', ErrorMessage.createOrEditStrain(e.response.status))
                })
        },
        editStrain({ commit }, strain) {
            return Api.editStrain(strain, this.getters.token)
                .then(() => {
                    commit('setStrainError', null)
                    Api.getStrains(this.getters.token).then(r => commit('setStrains', r.data))
                }).catch(e => {
                    commit('setStrainError', ErrorMessage.createOrEditStrain(e.response.status))
                })
        }
    }
}