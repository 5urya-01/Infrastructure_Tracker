const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
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
        required:true
    },
    roomNo:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model('roomSchema',roomSchema)