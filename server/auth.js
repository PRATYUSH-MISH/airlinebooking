const express = require('express');
const bcrypt = require('bcrypt');
const {  generateToken } = require("./authenticateToken")

const app = express();
const router = express.Router();
const collection = require('./mongo');

// JWT secret key
const jwtSecret = require("./jwtConfig");

// Middleware to parse JSON requests
app.use(express.json());

// Test route to ensure the auth service is running
router.get('/', (req, res) => {
    res.send("hello from AUTH");
});



// Login route
router.post("/login" ,async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password input
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password" });
        }

        // Find user by email
        const user = await collection.findOne({ email });
        if (!user) {
            console.log(`User not found with email: ${email}`);
            return res.status(400).json({ error: "Invalid credentials" });
        }
        console.log('User found:', user);

        // Compare input password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken({ id: user._id, email: user.email })
        console.log("Token is :", token);

        


        // Send success response with the auth token
        res.status(200).json({ message: "User signed in successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Signup route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        // Check if user already exists
        const userExist = await collection.findOne({ email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Create new user with hashed password
        const user = new collection({ name, email, password });
      const response= await user.save();



//token 
        const token = generateToken({ id: response._id, email: response.email })
    console.log("Token is :",token);



        // Send success response
        res.status(201).json({ message: "User created successfully",response:response,token:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
