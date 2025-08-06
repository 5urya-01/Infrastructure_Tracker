import React from 'react';
import buildingsData from "../assets/FakeData/BuildingData";
const Building = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '27px' }}>
            {buildingsData.map((building, buildingIndex) => (
                <div key={buildingIndex} className="building-card" style={{ width: '300px', height: '400px', border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box',borderRadius:'20px' }}>
                    {building.image && <img src={building.image} alt={building.buildingName} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />}
                    <h2>{building.buildingName}</h2>
                    <p>BuildingIncharge: {building.BuildingIncharge}</p>
                    <p>BuildingCode: {building.BuildingCode}</p>
                    <p>BuildingLocation:{building.BuildingLocation}</p>

                    
                </div>
            ))}
        </div>
    );
};

export default Building;