const express = require('express')
const itemwiseController = require('../Controllers/buildingItemWiseController');
const router = express.Router();
router.get("/building/getAllItemsBuildingWise/:itemName",itemwiseController.getAllItemsBuildingWise);
router.get("/building/getItemStatusCountsBuildingWise/:itemName",itemwiseController.getItemStatusCountsBuildingWise);

module.exports = router;