const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./DaB');

router.post('/add', async (req, res) => {
    const { name, age, gender, bookingId ,email} = req.body;

    if (!name || !age || !gender || !bookingId|| !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = await connectToDatabase();
        const usersColl = db.test.collection("collections");

        const passengersColl = db.data.collection("passengers");
        const user = await usersColl.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not registered' });
        }
        
        const newPassenger = { name, age, gender, bookingId, email };
        const result = await passengersColl.insertOne(newPassenger);

        res.status(201).json({ message: 'Passenger added successfully', passengerId: result.insertedId });
    } catch (error) {
        console.error('Error adding passenger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
