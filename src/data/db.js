const pool = require('../config/connection')


module.exports = {

    async getCategories() {
        const query = "SELECT * FROM categorias"
        const categorias = await pool.query(query)
        return categorias.rows
    },
}