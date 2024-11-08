import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosInstance';

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ name: '', role: 'developer', skillSet: 'smartContract', gender: 'male' });
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const res = await axiosInstance.get('/rooms');
        setRooms(res.data);
    };

    const addOccupant = async (roomNumber) => {
        try {
            const res = await axiosInstance.post(`/rooms/${roomNumber}/addOccupant`, form);
            setRooms(rooms.map(room => (room.roomNumber === roomNumber ? res.data : room)));
            setForm({ name: '', role: 'developer', skillSet: 'smartContract', gender: 'male' });
            setError('');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lefties Room Allocation System</h1>
            {rooms.map(room => (
                <div key={room.roomNumber} className="mb-4 p-4 border rounded">
                    <h2 className="text-xl font-semibold">Room {room.roomNumber}</h2>
                    <p>Gender Assigned: {room.genderAssigned || 'None'}</p>
                    <ul>
                        {room.occupants.map((occupant, index) => (
                            <li key={index}>
                                {occupant.name} - {occupant.role} ({occupant.skillSet})
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setSelectedRoom(room.roomNumber)}
                    >
                        Add Occupant
                    </button>
                </div>
            ))}

            {selectedRoom && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded">
                        <h2 className="text-xl mb-4">Add Occupant to Room {selectedRoom}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addOccupant(selectedRoom);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                className="mb-2 p-2 border rounded w-full"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <select
                                className="mb-2 p-2 border rounded w-full"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                            >
                                <option value="facilitator">Facilitator</option>
                                <option value="developer">Developer</option>
                            </select>
                            <select
                                className="mb-2 p-2 border rounded w-full"
                                value={form.skillSet}
                                onChange={(e) => setForm({ ...form, skillSet: e.target.value })}
                            >
                                <option value="smartContract">Smart Contract</option>
                                <option value="frontend">Frontend</option>
                                <option value="serverSide">Server-Side</option>
                            </select>
                            <select
                                className="mb-4 p-2 border rounded w-full"
                                value={form.gender}
                                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {error && <p className="text-red-500 mb-2">{error}</p>}
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                Add Occupant
                            </button>
                        </form>
                        <button className="mt-4 text-blue-500" onClick={() => setSelectedRoom(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomManager;
