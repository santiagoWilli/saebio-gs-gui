import * as Api from '../api'

export default {
    state: {
        strains: []
    },
    getters: {
        strains(state) {
            return state.strains
        }
    },
    mutations: {
        setStrains(state, payload) {
            state.strains = payload
        }
    },
    actions: {
        getStrains({ commit }) {
            Api.getStrains(this.getters.token)
                .then(response => {
                    let strains = response.data // only for readability
                    for (let i in strains) {
                        delete Object.assign(strains, {[strains[i]._id.$oid]: strains[i] })[i];
                    }
                    commit('setStrains', strains)
                })
        }
    }
}