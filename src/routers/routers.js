const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const { casdastrarUsuario } = require('../controllers/users');
const rotas = express.Router();


rotas.get('/categorias', listarCategorias)
rotas.post('/usuarios', casdastrarUsuario)

module.exports = rotas