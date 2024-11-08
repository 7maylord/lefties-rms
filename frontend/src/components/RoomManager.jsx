import { useState, useEffect } from 'react';
import Room from './Room';
import { axiosInstance } from '../axiosInstance';

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const fetchRooms = async () => {
        // Fetch rooms from the backend
        const res = await axiosInstance.get('/rooms');
        setRooms(res.data);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Room Allocation System</h1>
            {rooms.map(room => (
                <Room key={room._id} room={room} fetchRooms={fetchRooms} />
            ))}
        </div>
    );
};

export default RoomManager;
