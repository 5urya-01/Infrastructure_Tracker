const express = require('express')
const assetController = require('../Controllers/assetController')
const router = express.Router()

router.get("/getAssetDetails/:roomId",assetController.assetDetailsRead);
router.post("/addAssetDetails",assetController.assetDetailsAdd);
router.post("/updateAssetDetails",assetController.assetDetailsUpdate);
router.post("/deleteAssetDetails",assetController.assetDetailsDelete);


module.exports = router