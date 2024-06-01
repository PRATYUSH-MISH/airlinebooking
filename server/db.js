// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = connectToDatabase;






























// const mongoose = require('mongoose');
// const db = process.env.MONGODB_URI;
// mongoose.connect(db).then(() => {
//     console.log(`Connected to MongoDb!`)
// }).catch((err) => console.log(`no connection:${err}`))
