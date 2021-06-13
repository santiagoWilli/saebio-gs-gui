import Api from "@/Api";
import Utils from "@/Utils";
import ErrorMessage from "@/ErrorMessage";

export default {
    state: {
        strains: [],
        indexedStrains: [],
        removeStrainError: null
    },
    getters: {
        strains(state) {
            return state.strains
        },
        indexedStrains(state) {
            return state.indexedStrains
        },
        removeStrainError(state) {
            return state.removeStrainError
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
        setRemoveStrainError(state, error) {
            state.removeStrainError = error
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
            return Api.deleteStrain(Utils.getId(strain), this.getters.token)
                .then(() => {
                    commit('removeStrain', strain)
                    commit('setRemoveStrainError', null)
                }).catch(e => {
                    commit('setRemoveStrainError', ErrorMessage.delete(e.response.status))
                })
        }
    }
}