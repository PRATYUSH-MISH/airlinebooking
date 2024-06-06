const jwt = require("jsonwebtoken")
const { secretKey } = require('./jwtConfig')

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
}

module.exports = { generateToken }
