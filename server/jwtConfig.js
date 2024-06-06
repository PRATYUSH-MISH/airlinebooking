//jwtConfig.js
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString('hex'); // This should be constant and securely stored

module.exports = {
    secretKey: secretKey
};
