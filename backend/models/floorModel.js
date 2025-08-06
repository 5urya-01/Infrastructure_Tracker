const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    buildingName:{
        type:String,
        required:true
    },
    buildingId:{
        type:String,
        required:true
    },
    floorNo:{
        type:String,
        required:true
    },
    floorId:{
        type:String,
        required:true,
        unique:true
    },
    floorInCharge:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('floorSchema',floorSchema)