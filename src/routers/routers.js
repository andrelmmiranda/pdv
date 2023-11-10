const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const autenticarUsuario = require('../utils/authentication');
const { casdastrarUsuario, login, editarUsuario, detalharUsuario } = require('../controllers/users');
const { cadastrarProduto } = require('../controllers/products');

const rotas = express.Router();


rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', casdastrarUsuario)
rotas.post('/login', login)


rotas.use(autenticarUsuario)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', editarUsuario)

rotas.post('produto', cadastrarProduto)

module.exports = rotas