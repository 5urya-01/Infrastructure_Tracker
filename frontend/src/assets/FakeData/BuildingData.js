import React from 'react';
import Biligates from "../../assets/images/building/building.png";
import Rtb from "../../assets/images/building/building.png";
import Cotton from "../../assets/images/building/building.png";
import Kl from "../../assets/images/building/building.png";
import Newton from "../../assets/images/building/building.png";
import Thub from "../../assets/images/building/building.png";

const buildingsData = [
    {
        sno: 1,
        buildingName: 'Ratan Tata Bhavan',
        image: Rtb,     
        buildingInCharge: 'Vinay',
        buildingLocation: { longitude: "82.066512", latitude: "17.088359" },
        buildingId: 'RTB'
    },
    {
        sno: 2,
        buildingName: 'Billigates Bhavan',
        image: Biligates,
        buildingInCharge: 'Vinay',
        buildingLocation: { longitude: "82.0672205", latitude: "17.0891659" },
        buildingId: 'BGB'
    },
    {
        sno: 3,
        buildingName: 'Cotton Bhavan',
        image: Cotton,
        buildingInCharge: 'Vinay',
        buildingLocation: { longitude: "82.0671344", latitude: "17.0882378" },
        buildingId: 'CTB'
    },
    {
        sno: 4,
        buildingName: 'KL Rao Bhavan',
        image: Kl,
        buildingInCharge: 'Vinay',
        buildingLocation: { longitude: "82.067102", latitude: "17.088880" },
        buildingId: 'KLRB'
    },
    {
        sno: 5,
        buildingName: 'Newton Bhavan',
        image: Newton,
        buildingInCharge: 'Vinay',
        buildingLocation: { longitude: "82.0720321", latitude: "17.0889013" },
        buildingId: 'NB'
    },
    {
        sno: 6,
        buildingName: 'Technical Hub',
        image: Thub,
        buildingInCharge: 'Dinesh',
        buildingLocation: { longitude: "82.0698295", latitude: "17.0878153" },
        buildingId: 'THUB'
    }
    
];

export default buildingsData;
