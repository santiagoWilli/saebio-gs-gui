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

    getSequences(token, params) {
        return globalAxios.get(`${endpoint}/sequences`, authorizationWithParams(token, params))
    },

    getSequencesWithStrain(strainId, token) {
        return globalAxios.get(`${endpoint}/sequences`, authorizationWithParams(token, {strain: strainId}))
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

    getReferences(token, params) {
        return globalAxios.get(`${endpoint}/references`, authorizationWithParams(token, params))
    },

    getReferencesWithStrain(strainId, token) {
        return globalAxios.get(`${endpoint}/references`, authorizationWithParams(token, {strain: strainId}))
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

    getReports(token, params) {
        return globalAxios.get(`${endpoint}/reports`, authorizationWithParams(token, params))
    },

    getReport(id, token) {
        return globalAxios.get(`${endpoint}/reports/${id}`, authorization(token))
    },

    getReportHTML(id, token) {
        return globalAxios.get(`${endpoint}/reports/${id}/report`, downloadAuthorization(token))
    },

    getReportLog(id, token) {
        return globalAxios.get(`${endpoint}/reports/${id}/log`, downloadAuthorization(token))
    },

    getReportFile(id, filename, token) {
        return globalAxios.get(`${endpoint}/reports/${id}/${filename.replace('.', '')}`, downloadAuthorization(token))
    },

    requestAnalysis(reference, sequences, token) {
        return globalAxios.post(`${endpoint}/reports`, objectToURLParams({ reference, sequences }), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
    }
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

function authorizationWithParams(token, params) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: objectToURLParams(params)
    };
}