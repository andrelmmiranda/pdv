module.exports = {
    validarCampos(...params) {
        return params.every((param) => param && param.toString().trim() !== "")
    },

    campoNegativo(...param) {
        return param.every((param) => param > 0)
    }
}   