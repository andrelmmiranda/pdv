const pool = require('../config/connection')
const { getUser } = require('../utils/token')


module.exports = {

    async createUser(nome, email, senha) {
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email"
        const values = [nome, email, senha]
        const usuario = await pool.query(query, values)
        return usuario
    },

    async getUSerByEmail(email) {
        const query = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const usuario = await pool.query(query, values)
        return usuario.rows[0]
    },

    async getUserByTokenId(token) {

        const { id } = getUser(token)
        const query = "SELECT id, nome, email FROM usuarios WHERE id=$1"
        const values = [id]
        const usario = await pool.query(query, values)
        return usario.rows[0]
    },

    async editUser(nome, email, senhaCripto, usuarioID) {
        const query = "UPDATE usuarios SET nome = $1 , email = $2 , senha = $3 where id = $4 RETURNING *"
        const values = [nome, email, senhaCripto, usuarioID]
        const usuarioEditado = await pool.query(query, values)
        return usuarioEditado
    },

    async getCategories() {
        const query = "SELECT * FROM categorias"
        const categorias = await pool.query(query)
        return categorias.rows
    },

    async getCategorieById(categoria_id) {
        const query = "SELECT * FROM categorias WHERE id = $1"
        const values = [categoria_id]
        const categorias = await pool.query(query, values)
        return categorias.rows[0]
    },

    async existEmailCadastrado(email) {
        return await this.getUSerByEmail(email) != null
    },

    async existEmailOtherUser(email, token) {
        const { id } = getUser(token)
        const query = "SELECT * FROM usuarios WHERE email = $1 AND id != $2"
        const values = [email, id]
        const usuario = await pool.query(query, values)
        return usuario.rowCount != 0
    },

    async createProduct(descricao, quantidade_estoque, valor, categoria_id) {
        const query = "INSERT INTO produtos (descricao, quantidade_estoque, valor, categoria_id) VALUES ($1, $2, $3, $4)"
        const values = [descricao, quantidade_estoque, valor, categoria_id]
        const produto = await pool.query(query, values)
        return produto.rows[0]
    },

    async getProducts() {
        const query = "SELECT * FROM produtos"
        const produtos = await pool.query(query)
        return produtos.rows
    },

    async getProductById(product_id) {
        const query = "SELECT * FROM produtos WHERE id = $1"
        const values = [product_id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },


    async getProductByCategorieId(categoria_id) {
        const query = "SELECT * FROM produtos WHERE categoria_id = $1"
        const values = [categoria_id]
        const produtos = await pool.query(query, values)
        return produtos.rows
    },

    async updateProduct(descricao, quantidade_estoque, valor, categoria_id, id) {
        const query = 'UPDATE produtos SET descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 WHERE id = $5 RETURNING *'
        const values = [descricao, quantidade_estoque, valor, categoria_id, id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },

    async createClient(nome, email, cpf) {
        const query = "INSERT INTO clientes (nome, email, cpf) VALUES ($1, $2, $3)"
        const values = [nome, email, cpf]
        const cliente = await pool.query(query, values)
        return cliente.rows[0]
    },

    async getClients() {
        const query = "SELECT * FROM clientes"
        const clientes = await pool.query(query)
        return clientes.rows
    },

    async existEmailCliente(email) {
        const query = "SELECT * FROM clientes WHERE email = $1"
        const values = [email]
        const usuario = await pool.query(query, values)
        return usuario.rows[0]
    },

    async existCpfCliente(cpf) {
        const query = "SELECT * FROM clientes WHERE cpf = $1"
        const values = [cpf]
        const usuario = await pool.query(query, values)
        return usuario.rows[0]
    },

    async clientDetail(id) {
        const query = "SELECT * FROM clientes WHERE id = $1"
        const values = [id]
        const cliente = await pool.query(query, values)
        return cliente.rows[0]
    },

    async updateClient(nome, email, cpf, id) {
        const query = 'UPDATE clientes SET nome = $1, email = $2, cpf = $3 WHERE id = $4 RETURNING *'
        const values = [nome, email, cpf, id]
        const cliente = await pool.query(query, values)
        return cliente.rows[0]
    },

    async deleteProduct(id) {
        const query = "DELETE FROM produtos WHERE id = $1"
        const values = [id]
        const produtos = await pool.query(query, values)
        return produtos.rows[0]
    },

    async updateProductImg(produto_imagem, id) {
        const query = `UPDATE produtos SET produto_imagem = $1 WHERE id = $2`;
        const values = [produto_imagem, id];
        const produtos = await pool.query(query, values);
        return produtos.rows[0];
    },

    async createOrder(cliente_id, observacao, valor_total) {
        const query = "INSERT INTO pedidos (cliente_id, observacao,valor_total) VALUES ($1, $2, $3) RETURNING *"
        const values = [cliente_id, observacao, valor_total]
        const pedido = await pool.query(query, values)
        return pedido.rows[0]
    },

    async getOrders() {
        const query = "SELECT * FROM pedidos"
        const pedidos = await pool.query(query)
        return pedidos.rows
    },

    async getOrdersClientId(cliente_id) {
        const query = "SELECT * FROM pedidos WHERE cliente_id = $1"
        const values = [cliente_id]
        const pedidos = await pool.query(query, values)
        return pedidos.rows
    },

    async createOrderProduct(quantidade_produto, valor_produto, pedido_id, produto_id) {
        const query = "INSERT INTO pedido_produtos (quantidade_produto, valor_produto, pedido_id, produto_id) VALUES ($1, $2, $3, $4)"
        const values = [quantidade_produto, valor_produto, pedido_id, produto_id]
        const pedido_produtos = await pool.query(query, values)
        return pedido_produtos.rows[0]
    },

    async getOrdertById(pedido_id) {
        const query = "SELECT * FROM pedidos WHERE id = $1"
        const values = [pedido_id]
        const pedidos = await pool.query(query, values)
        return pedidos.rows[0]
    },

    // async getOrderAndProducts(cliente_id){
    //     try {
    //         if(!!cliente_id){
    //             const query = `
    //                 SELECT JSON_BUILD_OBJECT(
    //                     'id', p.id, 
    //                     'valor_total', p.valor_total, 
    //                     'observacao', p.observacao, 
    //                     'cliente_id', p.cliente_id
    //                 ) AS pedido,
    //                     ARRAY(
    //                         SELECT JSONB_BUILD_OBJECT(
    //                             'id', pp.id,
    //                             'quantidade_produtos', pp.quantidade_produto,
    //                             'valor_produto', pp.valor_produto,
    //                             'pedido_id', pp.pedido_id,
    //                             'produto_id', pp.produto_id
    //                         )
    //                         FROM
    //                             pedido_produtos pp
    //                         WHERE
    //                             p.id = pp.pedido_id
    //                     ) AS pedido_produtos
    //                 FROM
    //                     pedidos p
    //                 LEFT JOIN
    //                     pedido_produtos pp
    //                 ON
    //                     p.id = pp.pedido_id
    //                 LEFT JOIN
    //                     clientes c
    //                 ON
    //                     c.id = p.cliente_id
    //                 WHERE
    //                     c.id=$1
    //                 GROUP BY
    //                     p.id;
    //             `;

    //         const values = [ cliente_id ];

    //         return (await pool.query(query, values)).rows;
    //     }
    //         return (await pool.query('select id, valor_total, observacao, cliente_id from pedidos')).rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // }  

    async getOrderAndProducts(cliente_id){
        try {
                const query = `
                    SELECT JSON_BUILD_OBJECT(
                        'id', p.id, 
                        'valor_total', p.valor_total, 
                        'observacao', p.observacao, 
                        'cliente_id', p.cliente_id
                    ) AS pedido,
                        ARRAY(
                            SELECT JSONB_BUILD_OBJECT(
                                'id', pp.id,
                                'quantidade_produtos', pp.quantidade_produto,
                                'valor_produto', pp.valor_produto,
                                'pedido_id', pp.pedido_id,
                                'produto_id', pp.produto_id
                            )
                            FROM
                                pedido_produtos pp
                            WHERE
                                p.id = pp.pedido_id
                        ) AS pedido_produtos
                    FROM
                        pedidos p
                    LEFT JOIN
                        pedido_produtos pp
                    ON
                        p.id = pp.pedido_id
                    LEFT JOIN
                        clientes c
                    ON
                        c.id = p.cliente_id
                    ${ !!cliente_id ? 
                        'WHERE c.id=$1' :
                        'WHERE c.id is not null'
                    }
                    GROUP BY
                        p.id;
                `;

            return !! cliente_id ?
                (await pool.query(query, [ cliente_id ])).rows :
                (await pool.query(query)).rows;
        
        } catch (error) {
            throw error;
        }
    }  
}

