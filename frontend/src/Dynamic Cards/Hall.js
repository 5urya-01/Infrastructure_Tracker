import React from 'react';
import RoomData from "../assets/FakeData/RoomData";

const Halli = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '27px' }}>
            {RoomData.map((Hall, HallIndex) => (
                <div key={HallIndex} className="building-card" style={{ width: '300px', height: '400px', border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box',borderRadius:'20px' }}>
                    <h2>{Hall.buildingName}</h2>
                    <p>BuildingCode{Hall.buildingCode}</p>
                    <p>FloorNo{Hall.FloorNo}</p>
                    <p>FloorID{Hall.FloorID}</p>
                    <p>RoomNo: {Hall.RoomNo}</p>
                    <p>Section: {Hall.Section}</p>

                </div>
            ))}
        </div>
    );
};

export default Halli;
