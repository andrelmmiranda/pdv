const pool = require('../config/connection')
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
        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' })
        }
        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' })
        }
        const token = jwt.sign({ id: usuario.rows[0].id }, process.env.SENHA, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

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



