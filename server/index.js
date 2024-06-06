const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const router = require('./auth');
const fetchmongo = require('./fetchmongo');
const flightRouter=require('./flight')
const addPassengersRoute = require('./addPassengers');
const profileRouter = require('./profileRouter'); // Add this line
const bookings = require('./bookings')

const bookRouter = require('./Book');
const connectToDatabase = require('./db'); // Import the database connection function

dotenv.config({ path: './config.env' });

// require('./db');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Connect to the database
connectToDatabase()
    .then(() => {
        app.use('/book', bookRouter);
        app.use('/auth', router);
        app.use(fetchmongo);
        app.use('/flight', flightRouter);
        app.use('/passengers', addPassengersRoute);
        app.use('/api/bookings', bookings); 
        app.use( profileRouter);
        // Use profile router 
        
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });