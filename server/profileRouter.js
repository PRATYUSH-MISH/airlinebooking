// profileRouter.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Get all flights booked by the user
router.get('/', async (req, res) => {
    try {
        // Assume you have a way to authenticate users and get their ID
        const userId = req.user.id;

        const flights = await Flight.find({ userId });
        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a booked flight by ID
router.delete('/:id', async (req, res) => {
    try {
        const flightId = req.params.id;
        // Assuming you have some logic to ensure the user owns this flight
        await Flight.findByIdAndDelete(flightId);
        res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
        console.error('Error deleting flight:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
