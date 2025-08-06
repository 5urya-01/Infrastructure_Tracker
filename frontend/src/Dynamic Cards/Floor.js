import React from 'react';
import FloorData from "../assets/FakeData/FloorData";

const Floori = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '27px' }}>
            {FloorData.map((Floor, FloorIndex) => (
                <div key={FloorIndex} className="Floor-card" style={{ }}>
                    <h2>{Floor.buildingName}</h2>
                    <p>BuildingCode:{Floor.buildingCode}</p>
                    <p>FloorNo: {Floor.FloorNo}</p>
                    <p>FloorCode: {Floor.FloorCode}</p>
                    <p>FloorIncharge: {Floor.FloorIncharge}</p>
                </div>
            ))}
        </div>
    );
};

export default Floori;
