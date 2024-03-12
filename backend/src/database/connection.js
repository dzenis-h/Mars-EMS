// connection.js

const mongoose = require('mongoose');
//database connection 
mongoose.connect(process.env.MONGO_URL, {});



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

module.exports = db;
