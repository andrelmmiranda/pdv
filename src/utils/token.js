const jwt = require('jsonwebtoken')
require('dotenv').config()



module.exports = {
    getUser(token) {
        return jwt.verify(token, process.env.SENHA)
    },

    getToken(req) {
        const [bearer, token] = req.headers.authorization.split(" ")
        return token
    }
}

