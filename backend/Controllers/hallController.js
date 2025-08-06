const express = require('express');
const hallSchema = require('../models/hallModel')

//read
const hallDetailsRead = async(req,res) => {
    try{
        const floorId = req.params.floorId;
        const hallData = await hallSchema.aggregate([
            {
                $match : {floorId : floorId }
            }
        ]);
        console.log(hallData);
        res.status(200).json(hallData);
    }
    catch(err){
        console.error(err);
        res.send(500).json({details:err.message});
    }
}



//add
const hallDetailsAdd = async(req,res) => {
    try{
        const hallData = req.body;
        const newData = await hallSchema.create(hallData);
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.send(500).json({details:err.message});
    }
}



//update
const hallDetailsUpdate = async(req,res) => {
    try{
        const {previousData , updatedData } = req.body;
        const newData = await hallSchema.findOneAndUpdate(previousData,updatedData,{new:true});
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.send(500).json({details:err.message});
    }
}


//delete
const hallDetailsDelete = async(req,res) => {
    try{
        const { hallId } = req.body;
        const newData = await hallSchema.findOneAndDelete({hallId});
        console.log(newData);
        res.status(200).json(newData);
    }
    catch(err){
        console.error(err);
        res.send(500).json({details:err.message});
    }
}


exports.hallDetailsAdd = hallDetailsAdd;
exports.hallDetailsUpdate = hallDetailsUpdate;
exports.hallDetailsDelete = hallDetailsDelete;
exports.hallDetailsRead = hallDetailsRead;
