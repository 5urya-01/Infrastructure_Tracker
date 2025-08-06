const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    buildingId:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('loginSchema',loginSchema)