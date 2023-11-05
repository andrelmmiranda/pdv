const pool = require('../config/connection')


module.exports = {

    async createUser(nome, email, senha) {
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email"
        const values = [nome, email, senha]
        const usuario = await pool.query(query, values)
        return usuario
    },

    async existeEmailCadastrado(email) {
        const query = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const usuario = await pool.query(query, values)
        return usuario.rowCount != 0
    },

    async getCategories() {
        const query = "SELECT * FROM categorias"
        const categorias = await pool.query(query)
        return categorias.rows
    }
}