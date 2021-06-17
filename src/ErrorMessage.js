export default {
    login(code) {
        if (code === 470) return 'Usuario no encontrado'
        if (code === 480) return 'Contraseña no válida'
        return `Error ${code}`
    },

    getResource(code) {
        return (code === 404) ? 'Recurso no encontrado' : `Error ${code}`
    },

    deleteStrain(code) {
        if (code === 404) return 'Cepa no encontrada'
        if (code === 409) return 'No puede eliminarse una cepa si hay recursos que apuntan a ella'
        return `Error ${code}`
    },

    createOrEditStrain(code) {
        if (code === 400) return 'Petición invalida'
        if (code === 409) return 'Abreviación ya en uso'
        return `Error ${code}`
    },

    upload(code) {
        if (code === 400) return 'Nombre del fichero no válido'
        return `Error ${code}`
    }
}