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
        if (code === 404) return 'Género y especie no encontrados'
        if (code === 409) return 'No puede eliminarse un género y especie si hay recursos que apuntan al conjunto'
        return `Error ${code}`
    },

    createOrEditStrain(code) {
        if (code === 400) return 'Petición invalida'
        if (code === 409) return 'Nombre o abreviación ya en uso'
        return `Error ${code}`
    },

    upload(code) {
        switch (code) {
            case 400: return 'Nombre del fichero no válido'
            case 409: return 'El recurso ya existe'
            case 500: return 'Se produjo un error interno. Es probable que la herramienta de secuenciación del genoma esté caída'
            case 502: return 'La herramienta de secuenciación del genoma encontró un error fatal'
            case 503: return 'La herramienta de secuenciación del genoma no está activa'
            default: return `Error ${code}`
        }
    },

    request(code) {
        switch (code) {
            case 400: return 'Debes seleccionar una referencia y un mínimo de 4 secuencias'
            case 404: return 'Algunos de los recursos indicados no se pudieron encontrar'
            case 409: return 'La referencia y las secuencias deben pertenecer al mismo género y especie'
            case 500: return 'Se produjo un error interno. Es probable que la herramienta de secuenciación del genoma esté caída'
            case 502: return 'La herramienta de secuenciación del genoma encontró un error fatal'
            case 503: return 'La herramienta de secuenciación del genoma no está activa'
            default: return `Error ${code}`
        }
    }
}