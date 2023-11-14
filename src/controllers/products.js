const pool = require('../data/db')
const { validarCampos } = require('../utils/validarcampos')




const cadastrarProduto = async (req, res) => {

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    if (!validarCampos(descricao, quantidade_estoque, valor, categoria_id)) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios' })
    }

    try {

        const categoria = await pool.getCategorieById(categoria_id)

        if (!categoria || categoria == null) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }

        const produto = await pool.createProduct(descricao, quantidade_estoque, valor, categoria_id)
        return res.json(produto)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}


const listarProdutos = async (req, res) => {
    const { categoria_id } = req.body

    try {
        if (categoria_id) {
            const produtos = await pool.getProductsById(categoria_id)
            if (produtos) {
                res.status(200).json(produtos);
            } else {
                res.status(404).json({ message: 'Não existe produto para a categoria informada' });
            }
        } else {
            const produtos = await pool.getProducts()
            res.status(200).json(produtos)
        }

    } catch (error) {
        res.status(500).json({ message: 'Erro inesperado do servidor' })
    }
}



module.exports = {
    cadastrarProduto,
    listarProdutos
}