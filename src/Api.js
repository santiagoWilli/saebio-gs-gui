import globalAxios from 'axios'

const endpoint = process.env.VUE_APP_API_ENDPOINT

export default {
    login(user) {
        return globalAxios.post(`${endpoint}/login`, objectToURLParams(user), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
        return globalAxios.get(`${endpoint}/sequences/${id}/trimmed`, downloadAuthorization(token))
    },

    uploadSequence(files, token) {
        let formData = new FormData()
        formData.append('file1', files[0])
        formData.append('file2', files[1])
        return globalAxios.post(`${endpoint}/sequences`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    getReferences(token) {
        return globalAxios.get(`${endpoint}/references`, authorization(token))
    },

    getReference(id, token) {
        return globalAxios.get(`${endpoint}/references/${id}`, downloadAuthorization(token))
    },

    uploadReference(file, token) {
        let formData = new FormData()
        formData.append('file', file)
        return globalAxios.post(`${endpoint}/references`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    getStrains(token) {
        return globalAxios.get(`${endpoint}/strains`, authorization(token))
    },

    deleteStrain(id, token) {
        return globalAxios.delete(`${endpoint}/strains/${id}`, authorization(token))
    },

    createStrain(strain, token) {
        return globalAxios.post(`${endpoint}/strains`, objectToURLParams(strain), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
    },

    editStrain(strain, token) {
        const id = strain.id
        delete strain['id']
        return globalAxios.patch(`${endpoint}/strains/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: objectToURLParams(strain)
        })
    },

    getReports(token) {
        return globalAxios.get(`${endpoint}/reports`, authorization(token))
    },

    getReportFile(id, token) {
        return globalAxios.get(`${endpoint}/reports/${id}/file`, downloadAuthorization(token))
    },

    getReportLog(id, token) {
        return globalAxios.get(`${endpoint}/reports/${id}/log`, downloadAuthorization(token))
    },
}

function objectToURLParams(object) {
    const params = new URLSearchParams()
    for (let key in object) {
        if (object[key] instanceof Array) {
            for (let arKey in object[key]) params.append(key, object[key][arKey])
        }
        else params.append(key, object[key])
    }
    return params
}

function authorization(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}

function downloadAuthorization(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob'
    }
}