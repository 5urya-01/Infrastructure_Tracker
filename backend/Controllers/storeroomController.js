const express = require('express');
const assetSchema = require('../models/assetModel');

const getStoreItems = async(req,res) => {
    try{
        const storeItems = await assetSchema.aggregate([
            {
                $match : {status : "inStock"}
            }
        ])
        res.status(200).json(storeItems);
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}

exports.getStoreItems = getStoreItems;