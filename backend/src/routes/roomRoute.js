const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

//For room routes
router.post('/rooms/:roomId/addOccupant', roomController.addOccupantToRoom);

module.exports = router;