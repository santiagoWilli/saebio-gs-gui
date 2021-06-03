import globalAxios from 'axios'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export const login = (user) => globalAxios.post(`${endpoint}/login`, objectToURLParams(user), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

function objectToURLParams(object) {
    const params = new URLSearchParams()
    for (let key in object) params.append(key, object[key])
    return params
}