const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const autenticarUsuario = require('../utils/authentication');
const { casdastrarUsuario, login, editarUsuario, detalharUsuario } = require('../controllers/users');
const { cadastrarProduto, listarProdutos, editarProduto, detalharProduto, deletarProduto } = require('../controllers/products');
const { cadastrarClientes, listarClientes, detalharCliente, editarCliente } = require('../controllers/clients')

const rotas = express.Router();


rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', casdastrarUsuario)
rotas.post('/login', login)


rotas.use(autenticarUsuario)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', editarUsuario)

rotas.post('/produto', cadastrarProduto)
rotas.put('/produto/:id', editarProduto)
rotas.get('/produto', listarProdutos)
rotas.get('/produto/:id', detalharProduto)
rotas.delete('/produto/:id', deletarProduto)
rotas.post('/cliente', cadastrarClientes)
rotas.get('/cliente', listarClientes)
rotas.get('/cliente/:id', detalharCliente)
rotas.put('/cliente/:id', editarCliente)

module.exports = rotas