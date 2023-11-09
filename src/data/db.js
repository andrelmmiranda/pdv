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

    async existEmailCadastrado(email) {
        return await this.getUSerByEmail(email) != null
    },

    async existEmailOtherUser(email, token) {
        const { id } = getUser(token)
        const query = "SELECT * FROM usuarios WHERE email = $1 AND id != $2"
        const values = [email, id]
        const usuario = await pool.query(query, values)
        return usuario.rowCount != 0
    }
}