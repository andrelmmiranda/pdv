module.exports = {
    validarCampos(...params) {
        return params.every((param) => param && param.toString().trim() !== "")
    }
}