const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./DaB');

router.post('/add', async (req, res) => {
    const { name, age, gender, bookingId } = req.body;

    if (!name || !age || !gender || !bookingId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = await connectToDatabase();
        const passengersColl = db.collection("passengers");

        
        const newPassenger = { name, age, gender, bookingId };
        const result = await passengersColl.insertOne(newPassenger);

        res.status(201).json({ message: 'Passenger added successfully', passengerId: result.insertedId });
    } catch (error) {
        console.error('Error adding passenger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
