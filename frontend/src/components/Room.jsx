import React, { useState } from 'react';
import { axiosInstance } from '../axiosInstance';

function Room({ room }) {
    const [showDialog, setShowDialog] = useState(false);
    const [occupant, setOccupant] = useState({ name: "", role: "developer", skill_set: "", gender: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOccupant(prev => ({ ...prev, [name]: value }));
    };
       
    const handleAddOccupant = async () => {
        try {
            const response = await axiosInstance.post('/api/rooms/${roomId}/addOccupant', {
                roomId: room.room_id,
                occupant,
            });
            console.log(response.data);
            setShowDialog(false);
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className="room border p-4 rounded-lg">
            <h3 className="font-bold">{room.name}</h3>
            <p>Occupants: {room.current_occupants.length}/{room.capacity}</p>
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={() => setShowDialog(true)} className="bg-blue-500 text-white p-2 mt-2 rounded">
                Add Occupant
            </button>

            {showDialog && (
                <div className="dialog">
                    <input name="name" placeholder="Name" onChange={handleInputChange} />
                    <select name="role" onChange={handleInputChange}>
                        <option value="facilitator">Facilitator</option>
                        <option value="developer">Developer</option>
                    </select>
                    <select name="skill_set" onChange={handleInputChange}>
                        <option value="smart contract">Smart Contract</option>
                        <option value="frontend">Frontend</option>
                        <option value="server-side">Server-Side</option>
                    </select>
                    <select name="gender" onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button onClick={handleAddOccupant}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default Room;
