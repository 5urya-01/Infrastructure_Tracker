import React from 'react';
import AssertsData from "../assets/FakeData/AssetData";
const Buildingi = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '27px' }}>
            {AssertsData.map((Assert, AssertIndex) => (
                <div key={AssertIndex} className="building-card" style={{ width: '300px', height: '400px', border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box', borderRadius: '20px' }}>
                    <h2>{Assert.itemName}</h2>
                    <p>Building Id: {Assert.buildingId}</p>
                    <p>FloorID: {Assert.floorId}</p>
                    <p>Room Id{Assert.roomId}</p>
                    <p>Date:{Assert.addDate}</p>
                    <p>updateDate:{Assert.updateDate}</p>
                    <p>ItemId:{Assert.itemId}</p>
                    <p>Company:{Assert.company}</p>
                    <p>Properties:{Assert.properties}</p>
                    <p>Consumption:{Assert.consumption}</p>
                    <p>Condition:{Assert.condition}</p>
                    <p>Status:{Assert.status}</p>
                    <p>Warranty:{Assert.warranty}</p>
                </div>
            ))}
        </div>
    );
};

export default Buildingi;