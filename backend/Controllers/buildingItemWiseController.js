const express = require('express');
const assetSchema = require('../models/assetModel');

const getAllItemsBuildingWise = async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const itemCounts = await assetSchema.aggregate([
            {
                $match: { itemName: itemName }
            },
            {
                $group: {
                    _id: "$buildingId",
                    totalItems: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    buildingName: "$_id",
                    totalItems: 1
                }
            }
        ]);
        res.status(200).json(itemCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};
const getItemStatusCountsBuildingWise = async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const itemCounts = await assetSchema.aggregate([
            {
                $match: { itemName: itemName }
            },
            {
                $group: {
                    _id: {
                        buildingId: "$buildingId",
                        condition: "$condition"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.buildingId",
                    working: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.condition", "working"] }, "$count", 0]
                        }
                    },
                    notWorking: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.condition", "notWorking"] }, "$count", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    buildingId: "$_id",
                    working: 1,
                    notWorking: 1
                }
            }
        ]);

        res.status(200).json(itemCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};


exports.getItemStatusCountsBuildingWise = getItemStatusCountsBuildingWise;
exports.getAllItemsBuildingWise = getAllItemsBuildingWise;
