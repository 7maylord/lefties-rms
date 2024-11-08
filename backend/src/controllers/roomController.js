const Room = require('../models/room');

const addOccupantToRoom = async (req, res) => {
    const { roomNumber } = req.params;
    const { name, role, skillSet, gender } = req.body;

    try {
        const room = await Room.findOne({ roomNumber });

        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Capacity check
        if (room.occupants.length >= 4) {
            return res.status(400).json({ message: 'Room is at full capacity' });
        }

        // Gender-based restriction
        if (room.genderAssigned && room.genderAssigned !== gender) {
            return res.status(400).json({ message: 'Gender mismatch for room assignment' });
        }

        // Assign gender if not already set
        if (!room.genderAssigned) {
            room.genderAssigned = gender;
        }

        // Skillset distribution check
        const skillCount = room.occupants.filter(occ => occ.skillSet === skillSet && occ.role === 'developer').length;
        if (skillCount >= 2) {
            return res.status(400).json({ message: 'Max developers with this skill set reached' });
        }

        // Add occupant
        room.occupants.push({ name, role, skillSet, gender });
        await room.save();
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { addOccupantToRoom };