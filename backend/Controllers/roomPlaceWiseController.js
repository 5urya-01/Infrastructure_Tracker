const express = require('express');
const assetSchema = require('../models/assetModel');

const getAllItemCount = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const itemCounts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: "$itemName",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(itemCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getCountByCategory = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const itemTypeCounts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $facet: {
                    electrical: [
                        { $match: { category: "electrical" } },
                        { $count: "count" }
                    ],
                    nonElectrical: [
                        { $match: { category: { $ne: "electrical" } } },
                        { $count: "count" }
                    ]
                }
            }
        ]);
        const electricalCount = itemTypeCounts[0].electrical[0]?.count || 0;
        const nonElectricalCount = itemTypeCounts[0].nonElectrical[0]?.count || 0;
        res.status(200).json({ electrical: electricalCount, nonElectrical: nonElectricalCount });
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getCountByCondition = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const conditionCounts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: "$condition",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(conditionCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getCountByCompany = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const companyCounts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: "$company",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(companyCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getCountByCompanyAndItemName = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const counts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: {
                        company: "$company",
                        itemName: "$itemName"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    company: "$_id.company",
                    itemName: "$_id.itemName",
                    count: 1
                }
            }
        ]);
        res.status(200).json(counts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getConsumptionCounts = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const consumptionCounts = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: {
                        $substr: ["$consumption", 0, -6]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    consumption: "$_id",
                    count: 1
                }
            }
        ]);
        res.status(200).json(consumptionCounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const getTotalTypesOfConsumptionGroupedByItemName = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const consumptionTypes = await assetSchema.aggregate([
            {
                $match: { roomId: roomId }
            },
            {
                $group: {
                    _id: {
                        itemName: "$itemName",
                        consumption: "$consumption"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    itemName: "$_id.itemName",
                    consumption: "$_id.consumption",
                    count: 1
                }
            }
        ]);
        res.status(200).json(consumptionTypes);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

exports.getAllItemCount = getAllItemCount;
exports.getCountByCategory = getCountByCategory;
exports.getCountByCondition = getCountByCondition;
exports.getCountByCompany = getCountByCompany;
exports.getCountByCompanyAndItemName = getCountByCompanyAndItemName;
exports.getConsumptionCounts = getConsumptionCounts;
exports.getTotalTypesOfConsumptionGroupedByItemName = getTotalTypesOfConsumptionGroupedByItemName;
