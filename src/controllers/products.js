const pool = require('../data/db')
const { uploadImagem, deleteImagem } = require('../imgstorage')
const { validarCampos, campoNegativo } = require('../utils/validarcampos')




const cadastrarProduto = async (req, res) => {

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    if (!validarCampos(descricao, quantidade_estoque, valor, categoria_id)) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios' })
    }

    if (!campoNegativo(quantidade_estoque, valor)) {
        return res.status(400).json({ mensagem: 'Quantidade e valor não podem ser negativos' })
    }

    try {

        const categoria = await pool.getCategorieById(categoria_id)

        if (!categoria || categoria == null) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }

        const produto = await pool.createProduct(descricao, quantidade_estoque, valor, categoria_id)
        return res.status(201).send()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    if (!campoNegativo(quantidade_estoque, valor)) {
        return res.status(400).json({ mensagem: 'Quantidade e valor não podem ser negativos' })
    }

    try {

        const produto = await pool.getProductById(id)

        if (!produto) {
            return res.status(400).json({ mensagem: 'Produto não encontrado' })
        }

        if (!validarCampos(descricao, quantidade_estoque, valor, categoria_id)) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
        }

        const categoria = await pool.getCategorieById(categoria_id)
        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }

        const produtoAtualizado = await pool.updateProduct(descricao, quantidade_estoque, valor, categoria_id, id)
        console.log(produtoAtualizado);

        return res.status(200).json(produtoAtualizado);


    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}


const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query

    try {
        if (categoria_id) {
            const produtos = await pool.getProductByCategorieId(categoria_id)

            if (produtos.length == 0) {
                return res.status(404).json({ message: 'Não existe produto para a categoria informada' });
            }
            return res.status(200).json(produtos);
        }

        const produtos = await pool.getProducts()
        return res.status(200).json(produtos)
    } catch (error) {
        res.status(500).json({ message: 'Erro inesperado do servidor' })
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ mensagem: 'O id do produto é um campo obrigatório' })
    }

    try {
        const produto = await pool.getProductById(id)

        if (!produto) {
            return res.status(404).json({ message: 'Produto não existe' });
        }
        return res.status(200).json(produto);

    } catch (error) {
        res.status(500).json({ message: 'Erro inesperado do servidor' })
    }
}

const deletarProduto = async (req, res) => {
    const { id } = req.params

    try {

        const produto = await pool.getProductById(id)
        if (!produto) {
            return res.status(400).json({ mensagem: 'Produto não encontrado' })
        }

        if (produto.produto_imagem) {
            await deleteImagem(produto.produto_imagem);
        }
        
        const produtoDeletado = await pool.deleteProduct(id)  
        return res.status(200).json({ message: "Produto removido!" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }
}

const inserirImagemProduto = async (req, res) => {
    const { id } = req.params;
    const { originalname, mimetype, buffer } = req.file;

    try {
        const produto = await pool.showProduct(id);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const imagem = await uploadImagem(`produtos/${id}/${originalname}`, buffer, mimetype);


        const produtoAtualizado = await pool.updateProductImg(imagem.url, id);

        return res.status(200).json({ Mensagem: "Imagem cadastrada com sucesso!", produto: produtoAtualizado });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};









module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    deletarProduto,
    inserirImagemProduto
}