// book.js

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const bookings = []; // Define the bookings array in the correct scope

router.post('/', async (req, res) => {
    const { tripType, origin, destination, departDate, returnDate, seat } = req.body;

    console.log('Received booking data:', req.body);

    if (!tripType || !origin || !destination || !departDate || !seat) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db("data");
        const airportsColl = db.collection("airports");
        const domesticFlightsColl = db.collection("domesticflight");
        const internationalFlightsColl = db.collection("internationalflight");

        const originAirport = await airportsColl.findOne({ city: origin });
        const destinationAirport = await airportsColl.findOne({ city: destination });

        if (!originAirport || !destinationAirport) {
            return res.status(404).json({ message: 'Airport not found' });
        }

        const originCode = originAirport.code;
        const destinationCode = destinationAirport.code;

        const departWeekday = new Date(departDate).getUTCDay() + 1;

        const domesticQuery = {
            origin: originCode,
            destination: destinationCode,
            depart_weekday: departWeekday,
            [`${seat}_fare`]: { $exists: true }
        };

        const internationalQuery = {
            origin: originCode,
            destination: destinationCode,
            depart_weekday: departWeekday,
            [`${seat}_fare`]: { $exists: true }
        };

        const domesticFlights = await domesticFlightsColl.find(domesticQuery).toArray();
        const internationalFlights = await internationalFlightsColl.find(internationalQuery).toArray();

        const flights = domesticFlights.concat(internationalFlights);

        if (flights.length > 0) {
            const newBooking = {
                tripType,
                originAirport: {
                    city: originAirport.city,
                    code: originAirport.code,
                },
                destinationAirport: {
                    city: destinationAirport.city,
                    code: destinationAirport.code,
                },
                departDate,
                returnDate,
                seat
            };
            bookings.push(newBooking);
            res.status(200).json(newBooking);
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

router.get('/bookings', (req, res) => {
    try {
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;









































// const express = require('express');
// const router = express.Router();
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config({ path: './config.env' });

// // Connection URI
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// // POST /book/bookings route to handle booking submissions
// router.post('/bookings', async (req, res) => {
//     const { tripType, origin, destination, departDate, returnDate, seat } = req.body;

//     try {
//         await client.connect();
//         const db = client.db("data");
//         const domesticFlightsCollection = db.collection("domesticflights");
//         const airportsCollection = db.collection("airports");

//         // Fetch the origin and destination airport details
//         const originAirport = await airportsCollection.findOne({ city: origin });
//         const destinationAirport = await airportsCollection.findOne({ city: destination });

//         if (!originAirport || !destinationAirport) {
//             return res.status(404).json({ error: 'Origin or destination airport not found' });
//         }

//         // Fetch flights that match the criteria
//         const flights = await domesticFlightsCollection.find({
//             originCode: originAirport.code,
//             destinationCode: destinationAirport.code,
//             departDate: departDate,
//             seat: seat
//         }).toArray();

//         // Add the airport details to the flights data
//         const flightsWithDetails = flights.map(flight => ({
//             ...flight,
//             originAirport,
//             destinationAirport
//         }));

//         res.json(flightsWithDetails);
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         res.status(500).send("Error fetching data");
//     } finally {
//         await client.close();
//     }
// });

// module.exports = router;
