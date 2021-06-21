import Api from "@/Api";

export default {
    state: {
        reports: []
    },
    getters: {
        reports(state) {
            return state.reports
        }
    },
    mutations: {
        setReports(state, payload) {
            state.reports = payload
        }
    },
    actions: {
        getReports({ commit }) {
            return Api.getReports(this.getters.token)
                .then(response => {
                    commit('setReports', response.data)
                    return true
                })
                .catch(() => false)
        }
    }
}