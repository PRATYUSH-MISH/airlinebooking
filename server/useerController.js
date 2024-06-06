const collection = require('./mongo');

const getUsers = async (req, res) => {
    try {
        const users = await collection.find({}).select("-password")
        res.status(200).json(users);
    } catch (error) {
        console.error("Error Fetching USer",error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getUsers
};
