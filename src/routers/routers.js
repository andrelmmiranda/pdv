const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const autenticarUsuario = require('../utils/authentication');
const {
    casdastrarUsuario,
    login
} = require('../controllers/users');

const rotas = express.Router();


rotas.get('/categorias', listarCategorias)
rotas.post('/usuarios', casdastrarUsuario)
rotas.post('/login', login)

rotas.use(autenticarUsuario)

module.exports = rotas