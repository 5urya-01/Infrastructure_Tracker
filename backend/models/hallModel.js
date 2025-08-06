const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
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
    },
    hallName:{
        type:String,
        required:true
    },
    hallId:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('hallSchema',hallSchema);