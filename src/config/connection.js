const { Pool } = require('pg');
require('dotenv').config();

let pool; // Declaração da variável pool fora do bloco condicional

if (process.env.NODE_ENV === 'teste') {
    pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
} else {
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL + "?sslmode=require"
    });
}

module.exports = pool;