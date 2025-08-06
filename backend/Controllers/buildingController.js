const express = require('express')
const buildingSchema = require('../models/buildingModel')
const upload = require('../utils/multer')
//read
const buildingDetailsRead = async(req,res) => {
    try{
        const buildingDetails = await buildingSchema.find({});
        // console.log(buildingDetails);
        res.status(200).json(buildingDetails);
    }
    catch(err){
        console.error(err);
        res.status(500).json({"msg":err.message})
    }
}



//add
const buildingDetailsAdd = async (req, res) => {
    try {
        // Use multer middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Check if a file is provided
            if (!req.file) {
                return res.status(400).json({ message: "Building image is required." });
            }

            const {
                buildingName,
                buildingId,
                buildingInCharge,
                latitude,
                longitude,
            } = req.body;
            console.log(req.file);
            // Create a new building entry with form data
            const newBuilding = new buildingSchema({
                buildingName,
                buildingId,
                buildingInCharge,
                buildingLocation: {
                    longitude,
                    latitude,
                },
                buildingImage: "/images/BuildingImages/" + req.file.filename, 
            });

            // // Save the new building to the database
            await newBuilding.save();

            res.status(200).json({ message: "Building added successfully"});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};




//update
const buildingDetailsUpdate = async (req, res) => {
    try {
        // Use multer middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            const {
                buildingName,
                buildingId,
                buildingInCharge,
                latitude,
                longitude,
            } = req.body;

            // Find the building to update using the buildingId or other identifier
            const building = await buildingSchema.findOne({ buildingId });

            if (!building) {
                return res.status(404).json({ message: "Building not found" });
            }

            // Update the fields
            building.buildingName = buildingName || building.buildingName;
            building.buildingInCharge = buildingInCharge || building.buildingInCharge;
            building.buildingLocation.latitude = latitude || building.buildingLocation.latitude;
            building.buildingLocation.longitude = longitude || building.buildingLocation.longitude;

            // If a new file is uploaded, update the image path
            if (req.file) {
                building.buildingImage = "/images/BuildingImages/" + req.file.filename;
            }

            // Save the updated building details to the database
            await building.save();

            res.status(200).json({ message: "Building updated successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};




//delete
const buildingDetailsDelete = async (req, res) => {
    try {
        const { buildingId } = req.body;
        console.log(req.body);
        // Find and delete the building using the buildingId
        const building = await buildingSchema.findOneAndDelete({ buildingId });

        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }

        res.status(200).json({ message: "Building deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.buildingDetailsAdd = buildingDetailsAdd;
exports.buildingDetailsRead = buildingDetailsRead;
exports.buildingDetailsDelete = buildingDetailsDelete;
exports.buildingDetailsUpdate = buildingDetailsUpdate;