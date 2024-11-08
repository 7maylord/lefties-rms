const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const Room = require('../models/room');

//For room routes
router.post('/rooms/:roomNumber/addOccupant', roomController.addOccupantToRoom);

// Fetch all rooms
router.get('/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

module.exports = router;