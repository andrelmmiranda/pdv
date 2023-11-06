const pool = require('../data/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validarCampos } = require('../utils/validarcampos')
require('dotenv').config()


const casdastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body


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
const login = async (req, res) => {
    const { email, senha } = req.body

    if (!validarCampos(email, senha)) {
        return res.status(400).json({ mensagem: 'Email ou senha são obrigatórios' })
    }

    try {
        const usuario = await pool.getUSer(email)

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' })
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' })
        }
        const token = jwt.sign({ id: usuario.id }, process.env.SENHA, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario

        return res.json({ usuario: usuarioLogado, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}

module.exports = {
    casdastrarUsuario,
    login
}



