
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    bookingId: { type: String, required: true },
    passengers: [{
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    }],
    totalFare: { type: Number, required: true },
    paymentType: { type: String, required: true },
    flight: {
        flight_no: { type: String, required: true },
        airline: { type: String, required: true },
        depart_time: { type: String, required: true },
        arrival_time: { type: String, required: true },
        departDate: { type: String, required: true },
         origin: {
            city: { type: String, required: true },
            code: { type: String, required: true }
        },
        destination: {
            city: { type: String, required: true },
            code: { type: String, required: true }
        }
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;