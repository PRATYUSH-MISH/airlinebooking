const express = require('express');
const router = express.Router();
const authMiddleware = require('./authenticateToken');
const { connectToDatabase } = require('./DaB');


router.get('/profile', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const userData = req.user;
        console.log('User data from token:', userData)
        const email = userData.email;
        if (!email) {
            console.error('Email not found in user data');
            return res.status(400).json({ message: 'Email not found in user data' });
        }

        const db = await connectToDatabase();

        const userColl = db.data.collection("passengers"); // Assuming the user data is stored in the 'users' collection

       

        const user = await userColl.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookedFlights = await userColl.find({ email }).toArray();

        res.json({
            message: 'Profile data fetched successfully',
            user: {
                name: user.name,
                email: user.email,
                age:user.age,
                bookedFlights
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/profile/update', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const userData = req.user;
        const { name, age, gender, email } = req.body;
        const db = await connectToDatabase();

        const userColl = db.data.collection("passengers");

        await userColl.updateOne(
            { email: userData.email },
            { $set: { name, age, gender, email } }
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/profile/bookedflights/:bookingId', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userData = req.user;
        const db = await connectToDatabase();

        const passengerColl = db.data.collection("passengers");

        await passengerColl.deleteOne({ bookingId, email: userData.email });

        res.json({ message: 'Booked flight deleted successfully' });
    } catch (error) {
        console.error('Error deleting booked flight:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
