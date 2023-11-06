const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const {
    casdastrarUsuario,
    login
} = require('../controllers/users');

const rotas = express.Router();


rotas.get('/categorias', listarCategorias)
rotas.post('/usuarios', casdastrarUsuario)
rotas.post('/login', login)

module.exports = rotas