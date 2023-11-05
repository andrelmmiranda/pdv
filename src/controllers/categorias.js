const { getCategories } = require("../data/db")



const listarCategorias = async (req, res) => {

    try {

        const categorias = await getCategories()
        res.json(categorias)

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar categorias" })
    }
}


module.exports = {

    listarCategorias
}