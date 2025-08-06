const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    itemName : {
        type : String,
        required : true
    },
    buildingId : {
        type : String,

    },
    floorId : {
        type : String,

    },
    roomId : {
        type : String,
    },
    hallId : {
        type : String,
    },
    addDate : {
        type : Date,

    },
    updateDate : {
        type : Date,

    },
    itemId : {
        type : String,
        required : true,
        unique : true
    },
    company : {
        type : String,
        required : true
    },
    properties : {
        type : Object,

    },
    consumption : {
        type : String,

    },
    condition : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    warranty : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('assetSchema',assetSchema);