const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;
mongoose.connect(db).then(() => {
    console.log(`Connected to MongoDb!`)
}).catch((err) => console.log(`no connection:${err}`))













// password : JrWmNwlyCLxtb98O