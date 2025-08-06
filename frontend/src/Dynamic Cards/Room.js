import React from 'react';
import RoomData from "../assets/FakeData/RoomData";

const Roomi = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '27px' }}>
            {RoomData.map((Room, RoomIndex) => (
                <div key={RoomIndex} className="building-card" style={{ width: '300px', height: '400px', border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box',borderRadius:'20px' }}>
                    <h2>{Room.buildingName}</h2>
                    <p>BuildingCode{Room.buildingCode}</p>
                    <p>FloorNo{Room.FloorNo}</p>
                    <p>FloorID{Room.floorId}</p>
                    <p>RoomNo: {Room.RoomNo}</p>
                </div>
            ))}
        </div>
    );
};

export default Roomi;
