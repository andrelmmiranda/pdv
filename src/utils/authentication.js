const jwt = require('jsonwebtoken')
const pool = require('../config/connection')
require('dotenv').config()
const autenticarUsuario = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SENHA)
        const { rows, rowCount } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }
        const { senha, ...usuario } = rows[0]
        req.usuario = usuario

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }


}

module.exports = autenticarUsuario
