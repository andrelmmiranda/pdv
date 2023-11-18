const pool = require('../data/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validarCampos } = require('../utils/validarcampos')
const { getToken } = require('../utils/token')
require('dotenv').config()


const casdastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!validarCampos(nome, email, senha)) {
        return res.status(400).json({ mensagem: 'Email ou senha são obrigatórios' })
    }

    try {

        if (await pool.existEmailCadastrado(email)) {
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
        const usuario = await pool.getUSerByEmail(email)

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

const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const token = getToken(req)


    if (!validarCampos(nome, email, senha)) {
        return res.status(400).json({ mensagem: "Favor preencher os campos obrigatórios (nome, email, senha)." })
    }

    try {

        const usuario = await pool.getUserByTokenId(token)


        if (await pool.existEmailOtherUser(email, token)) {
            return res.status(400).json({ mensagem: 'Email já existe' })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)

        await pool.editUser(nome, email, senhaCripto, usuario.id)

        res.status(200).send()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro inesperado do servidor" })
    }
}

const detalharUsuario = async (req, res)=>{
    try {
        const [ tokenType, tokenValue ] = req.headers.authorization?.split(' ') || ['', ''];

        const data = await pool.getUserByTokenId(tokenValue);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ mensagem: error.message });
    }
}

module.exports = {
    casdastrarUsuario,
    login,
    editarUsuario,
    detalharUsuario
}



