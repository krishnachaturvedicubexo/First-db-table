require('dotenv').config(); // Load environment variables from .env

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI; // Access the MongoDB Atlas URI

async function connect(){
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define and use your MongoDB schemas and models with Mongoose here

module.exports=connect