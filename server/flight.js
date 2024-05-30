const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


router.get('/check', async (req, res) => {
    const { tripType, origin, destination, departDate,  seat } = req.body;

    // Simple validation (you can extend this as needed)
    if (!tripType || !origin || !destination || !departDate || !seat) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db("data");
        const airportsColl = db.collection("airports");
        const flightsColl = db.collection("domesticflight");

        // Find the airport codes for the origin and destination cities
        const originAirport = await airportsColl.findOne({ city: origin });
        const destinationAirport = await airportsColl.findOne({ city: destination });

        if (!originAirport || !destinationAirport) {
            return res.status(404).json({ message: 'Airport not found' });
        }

        const originCode = originAirport.code;
        const destinationCode = destinationAirport.code;

        // Convert departDate to a weekday (1 for Monday, 2 for Tuesday, ..., 7 for Sunday)
        const departWeekday = new Date(departDate).getUTCDay() + 1;

        // Query to find matching flights
        const query = {
            origin: originCode,
            destination: destinationCode,
            depart_weekday: departWeekday,
            [`${seat}_fare`]: { $exists: true }  // Ensure fare is available for the selected seat
        };

        const flights = await flightsColl.find(query).toArray();

        if (flights.length > 0) {
            res.status(200).json(flights);
        } else {
            res.status(404).json({ message: 'No flights found for the given criteria' });
        }

    } catch (error) {
        console.error('Error checking flight availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

module.exports = router;
