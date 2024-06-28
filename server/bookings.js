// routes/bookings.js

const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./DaB');
const auth = require('./auth');

router.post('/add', auth, async (req, res) => {
    const { tripType, origin, destination, departDate, returnDate, seat } = req.body;

    if (!tripType || !origin || !destination || !departDate || !seat) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = await connectToDatabase();
        const bookingsColl = db.collection("bookings");

        const newBooking = {
            userId: req.user.id,
            tripType,
            origin,
            destination,
            departDate,
            returnDate,
            seat,
            createdAt: new Date()
        };
        const result = await bookingsColl.insertOne(newBooking);

        res.status(201).json({ message: 'Booking added successfully', bookingId: result.insertedId });
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
