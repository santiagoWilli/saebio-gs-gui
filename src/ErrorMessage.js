export default {
    login(code) {
        if (code === 470) return 'Usuario no encontrado'
        if (code === 480) return 'Contraseña no válida'
        return `Error ${code}`
    },

    getResource(code) {
        return (code === 404) ? 'Recurso no encontrado' : `Error ${code}`
    },

    delete(code) {
        if (code === 404) return 'Cepa no encontrada'
        if (code === 409) return 'No puede eliminarse una cepa si hay recursos que apuntan a ella'
        return `Error ${code}`
    }
}