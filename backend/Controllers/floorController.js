const express = require('express');
const floorSchema = require('../models/floorModel');

//read
const floorDataRead = async (req, res) => {
    try {
      const buildingId = req.params.buildingId;
  
      const floorData = await floorSchema.aggregate([
        {
            $match: { buildingId: buildingId }
        }
      ]);
  
      console.log(floorData);
      res.status(200).json(floorData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching the floor data" });
    }
  };
  


//add
const floorDataAdd = async (req, res) => {
    try {
      const floorData = req.body;
      console.log(floorData);
  
      const newFloor = await floorSchema.create(floorData);
      res.status(201).json({
        message: "Floor data added successfully",
        data: newFloor
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "An error occurred while adding the floor data",
        details: err.message
      });
    }
  };
  

//update
const floorDataUpdate = async (req, res) => {
    try {
      const { previousData, updatedData } = req.body;
      const newData = await floorSchema.findOneAndUpdate(
        previousData, 
        updatedData, 
        { new: true }
      );
  
      if (!newData) {
        return res.status(404).json({ message: "Floor data not found for update" });
      }
  
      res.status(200).json(newData);
    } catch (err) {
      console.error("Error updating floor data:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// Delete Floor Data
const floorDataDelete = async (req, res) => {
    try {
      const { floorId } = req.body;
      console.log("Received floorId for deletion:", req.body); // Log the received floorId
  
      const deletedData = await floorSchema.findOneAndDelete({ floorId });
  
      if (!deletedData) {
        console.log("Floor not found with the provided floorId.");
        return res.status(404).json({ message: "Floor not found." });
      }
  
      res.status(200).json({ message: "Floor deleted successfully.", deletedData });
    } catch (err) {
      console.error("Error during floor deletion:", err);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  

exports.floorDataRead = floorDataRead;
exports.floorDataAdd = floorDataAdd;
exports.floorDataUpdate = floorDataUpdate;
exports.floorDataDelete = floorDataDelete;