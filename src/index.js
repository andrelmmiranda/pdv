const express = require('express');
const rotas = require('./routers/routers');
const app  = express()
const cors = require('cors');
const aws = require('aws-sdk');

app.use(cors());
require('dotenv').config

app.use(express.json());
app.use(rotas)

const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Servidor ativo na porta ${port}`);
});