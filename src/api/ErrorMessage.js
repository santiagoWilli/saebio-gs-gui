export default {
    login(code) {
        if (code === 470) return 'Usuario no encontrado'
        if (code === 480) return 'Contraseña no válida'
        return `Error ${code}`
    }
}