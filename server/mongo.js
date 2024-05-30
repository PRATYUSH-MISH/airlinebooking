const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const newSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//we are hashing the password

newSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const collection = mongoose.model("collection", newSchema)

module.exports = collection