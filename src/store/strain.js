import * as Api from '../api'

export default {
    state: {
        strains: [],
        indexedStrains: []
    },
    getters: {
        strains(state) {
            return state.strains
        },
        indexedStrains(state) {
            return state.indexedStrains
        }
    },
    mutations: {
        setStrains(state, payload) {
            state.strains = payload
        },
        setIndexedStrains(state, payload) {
            state.indexedStrains = payload
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
        }
    }
}