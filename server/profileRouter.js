const express = require('express');
const router = express.Router();
const authMiddleware = require('./authenticateToken');
const collection = require('./mongo');

router.get('/profile', authMiddleware.authenticateToken, async (req, res) => {
    try {
       const userData=req.user;
       console.log("User data:",userData);
       const userId=userData.id;
       const user=await collection.findById(userId)


        res.json({ message: 'hello from profile', user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
