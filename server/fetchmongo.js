const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './config.env' });

// Connection URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("data");
        const coll = db.collection("airports");
      
        const cursor = coll.find();
        const results = await cursor.toArray();
       
        res.json(results);
      //  console.log('Fetched data:', results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    } finally {
        await client.close();
    }
});

module.exports = router;
