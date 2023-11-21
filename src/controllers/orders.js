const pool = require('../data/db')
const { validarCampos } = require('../utils/validarcampos')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    if (!validarCampos(cliente_id, pedido_produtos)) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios' })
    }

    try {
        const cliente = await pool.clientDetail(cliente_id)
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }

        let valor_total = 0

        for (const produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = produto

            if (!validarCampos(produto_id, quantidade_produto)) {
                return res.status(400).json({ mensagem: 'Campos obrigatórios' })
            }

            const produtoEncontrado = await pool.getProductById(produto_id)
            if (!produtoEncontrado) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' })
            }

            if (produtoEncontrado.quantidade_estoque < quantidade_produto) {
                return res.status(400).json({ mensagem: 'Quantidade do produto insufuciente no estoque' })
            }

            valor_total += produtoEncontrado.valor * quantidade_produto
        }
        const pedido = await pool.createOrder(cliente_id, observacao, valor_total)

        return res.status(201).send()

        // Enviar email pra cliente notificando do pedido

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro inesperado do servidor' })
    }

}

module.exports = {
    cadastrarPedido
}