const express = require('express');
const router = express.Router();
const Ticket =require("./Tickets")

router.post("/tickets", async (req, res) => {
    try {
        const { bookingId, passengers, totalFare, paymentType, flight } = req.body;

        // Validate required fields
        if (!bookingId || !passengers || !totalFare || !paymentType || !flight) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newTicket = new Ticket({
            bookingId,
            passengers,
            totalFare,
            paymentType,
            flight,
        });

        await newTicket.save();

        res.status(201).json({ message: 'Ticket saved successfully' });
    } catch (error) {
        console.error('Error saving ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Route to fetch ticket by bookingId
router.get('/tickets/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const ticket = await Ticket.findOne({ bookingId });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Function to generate dummy PDF data (replace this with your actual PDF generation logic)

module.exports = router;
