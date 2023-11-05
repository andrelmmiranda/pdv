const pool = require('../data/db')
const bcrypt = require('bcrypt')
const { validarCampos } = require('../utils/validarcampos')
require('dotenv').config()


const casdastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body


    if (!validarCampos(nome, email, senha)) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
    }

    try {

        if (await pool.existeEmailCadastrado(email)) {
            return res.status(400).json({ mensagem: 'Email já existe' })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)
        const novoUsuario = (await pool.createUser(nome, email, senhaCripto)).rows[0]


        return res.status(201).json(novoUsuario)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }
}

module.exports = {
    casdastrarUsuario
}















