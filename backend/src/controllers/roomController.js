const Room = require("../models/room");

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Add an occupant from a room
const addOccupantToRoom = async (req, res) => {
  const { roomNumber } = req.params;
  const { name, role, skillSet, gender } = req.body;
  try {
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // Capacity check
    if (room.occupants.length >= 4) {
      return res.status(400).json({ message: "Room is at full capacity" });
    }

    // Gender-based restriction
    if (room.genderAssigned && room.genderAssigned !== gender) {
      return res
        .status(400)
        .json({ message: "Gender mismatch for room assignment" });
    }

    // Assign gender if not already set
    if (!room.genderAssigned) {
      room.genderAssigned = gender;
    }

    // Ensure only one facilitator per room
    if (role === "facilitator") {
      const existingFacilitator = room.occupants.find(
        (occ) => occ.role === "facilitator"
      );
      if (existingFacilitator) {
        return res
          .status(400)
          .json({ message: "A facilitator is already assigned to this room" });
      }
    }

    // Skillset distribution check for developers
    if (role === "developer") {
      const skillCount = room.occupants.filter(
        (occ) => occ.skillSet === skillSet && occ.role === "developer"
      ).length;
      if (skillCount >= 2) {
        return res
          .status(400)
          .json({ message: "Max developers with this skill set reached" });
      }
    }

    // Add occupant
    room.occupants.push({ name, role, skillSet, gender });
    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an occupant from a room
const deleteOccupantFromRoom = async (req, res) => {
  const { roomNumber, occupantId } = req.params;

  try {
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Remove occupant by matching the occupant ID
    room.occupants = room.occupants.filter(
      (occupant) => occupant._id.toString() !== occupantId
    );

    // If no occupants are left, set genderAssigned to null
    if (room.occupants.length === 0) {
        room.genderAssigned = null;
    }

    // Save the updated room
    await room.save();

    res.status(200).json({ message: "Occupant removed successfully", room });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getRooms, addOccupantToRoom, deleteOccupantFromRoom };
