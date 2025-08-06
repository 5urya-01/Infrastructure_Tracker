const express = require('express');
const roomSchema = require('../models/roomModel')
//read
const roomDetailsRead = async (req, res) => {
    try {
        const floorId = req.params.floorId;
        const roomData = await roomSchema.aggregate([
            {
                $match: { floorId: floorId }
            }
        ]);

        console.log("floorId" + floorId);

        if (roomData.length === 0) {
            return res.status(404).json({ message: "No rooms found for the given floorId." });
        }

        res.status(200).json(roomData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while retrieving room details." });
    }
};


//add
const roomDetailsAdd = async(req,res) => {
    try{
        const roomData = req.body;
        console.log(req)
        const newData = await roomSchema.create(roomData);    
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err)
        res.status(500).json({"msg":"unknown error"});
    }
}


//update
const roomDetailsUpdate= async(req,res) => {
    try{
        const {previousData , updatedData} = req.body;
        const newData = await roomSchema.findOneAndUpdate(previousData,updatedData,{ new: true });
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({message : err.message})
    }
}


//delete
const roomDetailsDelete = async(req,res) => {
    try{
        const {roomId} = req.body;
        const newData = await roomSchema.findOneAndDelete({roomId});
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassage: err.message});
    }
    
}

exports.roomDetailsAdd = roomDetailsAdd;
exports.roomDetailsRead = roomDetailsRead;
exports.roomDetailsDelete = roomDetailsDelete;
exports.roomDetailsUpdate = roomDetailsUpdate;