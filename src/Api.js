import globalAxios from 'axios'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export default {
    login(user) {
        return globalAxios.post(`${endpoint}/login`, objectToURLParams(user), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        })
    },

    getSequences(token) {
        return globalAxios.get(`${endpoint}/sequences`, authorization(token))
    },

    getSequence(id, token) {
        return globalAxios.get(`${endpoint}/sequences/${id}`, authorization(token))
    },

    getSequenceTrimmedFiles(id, token) {
        return globalAxios.get(`${endpoint}/sequences/${id}/trimmed`, authorization(token))
    },

    getReferences(token) {
        return globalAxios.get(`${endpoint}/references`, authorization(token))
    },

    getReference(id, token) {
        return globalAxios.get(`${endpoint}/references/${id}`, authorization(token))
    },

    getStrains(token) {
        return globalAxios.get(`${endpoint}/strains`, authorization(token))
    },

    deleteStrain(id, token) {
        return globalAxios.delete(`${endpoint}/strains/${id}`, authorization(token))
    }
}

function objectToURLParams(object) {
    const params = new URLSearchParams()
    for (let key in object) params.append(key, object[key])
    return params
}

function authorization(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}