const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToDatabase = async () => {
    if (!db) {
        await client.connect();
        db = client.db("data");
    }
    return db;
};

const closeDatabase = async () => {
    if (client) {
        await client.close();
    }
};

module.exports = {
    connectToDatabase,
    closeDatabase
};
