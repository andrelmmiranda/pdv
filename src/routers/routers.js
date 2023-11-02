const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const rotas = express.Router();


rotas.get('/categorias', listarCategorias)

module.exports = rotas