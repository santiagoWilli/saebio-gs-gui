import globalAxios from 'axios'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export const login = (user) => globalAxios.post(`${endpoint}/login`, objectToURLParams(user), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

export const getSequences = (token) => globalAxios.get(`${endpoint}/sequences`, authorization(token))

export const getSequence = (id, token) => globalAxios.get(`${endpoint}/sequences/${id}`, authorization(token))

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