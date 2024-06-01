const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./DaB');

router.post('/check', async (req, res) => {
    const { originAirport, destinationAirport, departDate, seat } = req.body;

    if (!originAirport || !originAirport.code || !destinationAirport || !destinationAirport.code || !departDate || !seat) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = await connectToDatabase();
        const flightsColl = db.collection("domesticflight");

        const originCode = originAirport.code;
        const destinationCode = destinationAirport.code;

        const departWeekday = new Date(departDate).getUTCDay() + 1; // Get the day of the week (0=Sunday, 6=Saturday)

        const query = {
            origin: originCode,
            destination: destinationCode,
            depart_weekday: departWeekday,
            [`${seat}_fare`]: { $exists: true }
        };

        const flights = await flightsColl.find(query).toArray();

        if (flights.length > 0) {
            res.status(200).json({ flights });
        } else {
            res.status(404).json({ message: 'No flights found for the given criteria' });
        }
    } catch (error) {
        console.error('Error checking flight availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// router.post('/check', async (req, res) => {
//     const { originAirport, destinationAirport, departDate, seat } = req.body;

//     if (!originAirport || !originAirport.code || !destinationAirport || !destinationAirport.code || !departDate || !seat) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//         await client.connect();
//         const db = client.db("data");
//         const flightsColl = db.collection("domesticflight");

//         const originCode = originAirport.code;
//         const destinationCode = destinationAirport.code;

//         const departWeekday = new Date(departDate).getUTCDay() + 1; // Get the day of the week (0=Sunday, 6=Saturday)

//         const query = {
//             origin: originCode,
//             destination: destinationCode,
//             depart_weekday: departWeekday,
//             [`${seat}_fare`]: { $exists: true }
//         };

//         const flights = await flightsColl.find(query).toArray();

//         if (flights.length > 0) {
//             res.status(200).json({ flights });
//         } else {
//             res.status(404).json({ message: 'No flights found for the given criteria' });
//         }
//     } catch (error) {
//         console.error('Error checking flight availability:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         await client.close();
//     }
// });

// module.exports = router;
