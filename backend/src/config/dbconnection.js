const mongoose = require('mongoose');
const Room = require('../models/room')
require('dotenv').config();

function connectionToMongodb() {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on('connected', async () => {
        console.log('MongoDB connection successful');
        //Database seeding Do this once
        // try {
        //     // Create rooms with unique room numbers
        //     for (let i = 1; i <= 6; i++) {
        //         await Room.create({ roomNumber: i, occupants: [] });
        //     }
        //     console.log('Rooms created successfully');
        // } catch (err) {
        //     console.error('Error creating rooms:', err);
        // } finally {
        //     // Close the connection after seeding is done
        //     mongoose.connection.close();
        // }
    });

    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log('MongoDB connection unsuccessful');
    });
}

module.exports = { connectionToMongodb };

