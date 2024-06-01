const express = require('express');
const router = express.Router();

router.post('/upi', (req, res) => {
    // Simulate UPI payment
    console.log('Simulating UPI payment...');
    res.status(200).json({ message: 'UPI payment processed successfully' });
});

router.post('/net-banking', (req, res) => {
    // Simulate net banking payment
    console.log('Simulating Net Banking payment...');
    res.status(200).json({ message: 'Net Banking payment processed successfully' });
});

router.post('/debit-card', (req, res) => {
    // Simulate debit card payment
    console.log('Simulating Debit Card payment...');
    res.status(200).json({ message: 'Debit Card payment processed successfully' });
});

module.exports = router;
