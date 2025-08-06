const express = require('express')
const assetSchema = require('../models/assetModel');

//read
const assetDetailsRead = async(req,res) => {
    try{
        const roomId = req.params.roomId;
        const assetData = await assetSchema.aggregate([
            {
                $match: {
                    $or: [
                        { roomId: roomId || null },
                        { hallId: roomId || null }
                    ]
                }
            }
        ]);
        console.log(assetData);
        res.status(200).json(assetData);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : err.message});
    }
}



//add
const assetDetailsAdd = async(req,res) => {
    try{
        const assetData = req.body;
        const newData = await assetSchema.create(assetData);
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : err.message});
    }
}




//update
const assetDetailsUpdate = async(req,res) => {
    try{
        const {previousData , updatedData} = req.body;
        const newData = await assetSchema.findOneAndUpdate(previousData,updatedData,{new:true});
        if (!newData) {
            return res.status(404).json({ message: "Floor data not found for update" });
          }
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : err.message});
    }
}




//delete
const assetDetailsDelete = async(req,res) => {
    try{
        const { itemId } = req.body;
        const newData = await assetSchema.findOneAndDelete({itemId});
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : err.message});
    }
}

exports.assetDetailsAdd = assetDetailsAdd;
exports.assetDetailsDelete = assetDetailsDelete;
exports.assetDetailsRead = assetDetailsRead;
exports.assetDetailsUpdate = assetDetailsUpdate;