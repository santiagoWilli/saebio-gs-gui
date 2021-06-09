export default {
    getId(object) {
        return object._id.$oid
    },

    download(response, label, mimeType) {
        const blob = new Blob([response.data], { type: mimeType })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
    }
}