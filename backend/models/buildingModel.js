const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema({
    buildingName : {
        type:String,
        required:true
    },
    buildingId:{
        type:String,
        required:true
    },
    buildingLocation:{
        longitude:{
            type:String,
            required:true
        },
        latitude:{
            type:String,
            required:true
        }
    },
    buildingInCharge:{
        type:String,
        required:true
    },
    buildingImage:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("buildingSchema",buildingSchema);