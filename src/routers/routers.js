const express = require('express');
const { listarCategorias } = require('../controllers/categorias');
const autenticarUsuario = require('../utils/authentication');
const { casdastrarUsuario, login, editarUsuario, detalharUsuario } = require('../controllers/users');
const { cadastrarProduto, listarProdutos, editarProduto, detalharProduto, deletarProduto, inserirImagemProduto } = require('../controllers/products');
const { cadastrarClientes, listarClientes, detalharCliente, editarCliente } = require('../controllers/clients')
const multer = require('../utils/multer');
const { cadastrarPedido, listarPedidos } = require('../controllers/orders');

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
rotas.post("/produto/:id/imagem", multer.single('imagem'), inserirImagemProduto)
rotas.delete('/produto/:id', deletarProduto)


rotas.post('/cliente', cadastrarClientes)
rotas.get('/cliente', listarClientes)
rotas.get('/cliente/:id', detalharCliente)
rotas.put('/cliente/:id', editarCliente)

rotas.get('/pedido', listarPedidos);
rotas.post('/pedido', cadastrarPedido)

module.exports = rotas