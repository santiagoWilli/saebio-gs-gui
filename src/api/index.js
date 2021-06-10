import globalAxios from 'axios'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export const login = (user) => globalAxios.post(`${endpoint}/login`, objectToURLParams(user), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

export const getSequences = (token) => globalAxios.get(`${endpoint}/sequences`, authorization(token))
export const getSequence = (id, token) => globalAxios.get(`${endpoint}/sequences/${id}`, authorization(token))
export const getSequenceTrimmedFiles = (id, token) => globalAxios.get(`${endpoint}/sequences/${id}/trimmed`, authorization(token))

export const getReferences = (token) => globalAxios.get(`${endpoint}/references`, authorization(token))
export const getReference = (id, token) => globalAxios.get(`${endpoint}/references/${id}`, authorization(token))

export const getStrains = (token) => globalAxios.get(`${endpoint}/strains`, authorization(token))

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