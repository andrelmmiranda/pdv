const { getCategories } = require("../data/db")



const listarCategorias = async (req, res) => {
    const categorias = await getCategories()
    res.json(categorias)
}


module.exports = {
    
    listarCategorias
}