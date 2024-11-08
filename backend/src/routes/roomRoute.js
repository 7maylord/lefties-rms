const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

//For room routes
router.get('/rooms', roomController.getRooms);
router.post('/rooms/:roomNumber/addOccupant', roomController.addOccupantToRoom);
router.delete('/rooms/:roomNumber/occupants/:occupantId', roomController.deleteOccupantFromRoom);

module.exports = router;