const pool = require('../data/db')
const { validarCampos } = require('../utils/validarcampos')

const cadastrarClientes = async (req, res) => {

    const { nome, email, cpf } = req.body

    if (!validarCampos(nome, email, cpf)) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios' })
    }

    try {

        if (await pool.existEmailCliente(email) || await pool.existCpfCliente(cpf)) {
            return res.status(400).json({ mensagem: 'Email ou cpf ja cadastrados' })
        }

        const cliente = await pool.createClient(nome, email, cpf)
        return res.status(201).json(cliente)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}

const listarClientes = async (req, res) => {

    try {

        const clientes = await pool.getClients()
        res.json(clientes)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar clientes" })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const clienteDetalhado = await pool.clientDetail(id)

        if (!clienteDetalhado) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        return res.status(200).json(clienteDetalhado);

    } catch (error) {
        res.status(500).json({ message: 'Erro inesperado do servidor' })
    }
}

const editarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body
    const { id } = req.params
 
    if (!validarCampos(nome, email, cpf)) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }

    try {

        const cliente = await pool.clientDetail(id)

        if (!cliente) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado' })
        }
        const clienteAtualizado = await pool.updateClient(nome, email, cpf, id) 
        return res.status(200).json(clienteAtualizado);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}

module.exports = {
    cadastrarClientes,
    listarClientes,
    detalharCliente,
    editarCliente
}