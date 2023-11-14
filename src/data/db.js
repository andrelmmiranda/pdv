const pool = require('../config/connection')
const { getUser } = require('../utils/token')


module.exports = {

    async createUser(nome, email, senha) {
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email"
        const values = [nome, email, senha]
        const usuario = await pool.query(query, values)
        return usuario
    },

    async getUSerByEmail(email) {
        const query = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const usuario = await pool.query(query, values)
        return usuario.rows[0]
    },

    async getUserByTokenId(token) {

        const { id } = getUser(token)
        const query = "SELECT id, nome, email FROM usuarios WHERE id=$1"
        const values = [id]
        const usario = await pool.query(query, values)
        return usario.rows[0]
    },

    async editUser(nome, email, senhaCripto, usuarioID) {
        const query = "UPDATE usuarios SET nome = $1 , email = $2 , senha = $3 where id = $4 RETURNING *"
        const values = [nome, email, senhaCripto, usuarioID]
        const usuarioEditado = await pool.query(query, values)
        return usuarioEditado
    },

    async getCategories() {
        const query = "SELECT * FROM categorias"
        const categorias = await pool.query(query)
        return categorias.rows
    },

    async getCategorieById(categoria_id) {
        const query = "SELECT * FROM categorias WHERE id = $1"
        const values = [categoria_id]
        const categorias = await pool.query(query, values)
        return categorias.rows[0]
    },

    async existEmailCadastrado(email) {
        return await this.getUSerByEmail(email) != null
    },

    async existEmailOtherUser(email, token) {
        const { id } = getUser(token)
        const query = "SELECT * FROM usuarios WHERE email = $1 AND id != $2"
        const values = [email, id]
        const usuario = await pool.query(query, values)
        return usuario.rowCount != 0
    },

    async createProduct(descricao, quantidade_estoque, valor, categoria_id) {
        const query = "INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id) VALUES ($1, $2, $3, $4)"
        const values = [descricao, quantidade_estoque, valor, categoria_id]
        const produto = await pool.query(query, values)
        return produto.rows[0]
    },

    async getProducts() {
        const query = "SELECT * FROM produtos"
        const produtos = await pool.query(query)
        return produtos.rows
    },

    async getProductsById(categoria_id) {
        const query = "SELECT * FROM produtos WHERE categoria_id = $1"
        const values = [categoria_id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },

    async updateProduct(descricao, quantidade_estoque, valor, categoria_id, id) {
        const query = 'UPDATE produtos SET descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 WHERE id = $5 RETURNING *'
        const values = [descricao, quantidade_estoque, valor, categoria_id, id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },

    async showProduct(id) {
        const query = "SELECT * FROM produtos WHERE id = $1"
        const values = [id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },

}