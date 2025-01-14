const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/user_kyc';

const connectDB =  async ()=>{
    try {
        const connection = await mongoose.connect(MONGODB_URI);
    
        mongoose.connection.on('connected', () => {
            console.log('Mongodb Connetced');
        });
    
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', (err) => {
            console.error('Mongoose disconnected');
        });
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

}
module.exports = connectDB