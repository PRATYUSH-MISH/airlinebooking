const express = require('express')
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
const router = express.Router()
const collection = require('./mongo')
router.get(('/'), (req, res) => {
    res.send("hello from AUTH ")
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
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

        // Compare password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        //  console.log('Password match:', isMatch);
        // If passwords don't match, return error
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // If credentials are correct, send a success response
        res.status(200).json({ message: "User signed in successfully", name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await collection.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Hash the password before saving

        const user = new collection({ name, email, password });

        await user.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;