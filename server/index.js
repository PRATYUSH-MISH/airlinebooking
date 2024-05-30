const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const router = require('./auth');
const fetchmongo = require('./fetchmongo');
const flightRouter=require('./flight')
const bookRouter = require('./Book');
dotenv.config({ path: './config.env' });

require('./conn');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/book', bookRouter);
app.use('/auth', router);
app.use('/things', fetchmongo);
app.use('/flight',flightRouter);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
