const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

//For room routes
router.post('/rooms/:roomId/addOccupant', roomController.addOccupantToRoom);

// Fetch all rooms
router.get('/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

module.exports = router;