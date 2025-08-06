const express = require('express');
const buildingController = require('../Controllers/buildingController');
const router = express.Router()

router.get('/getBuildingDetails',buildingController.buildingDetailsRead);
router.post('/addBuildingDetails',buildingController.buildingDetailsAdd);
router.post('/updateBuildingDetails',buildingController.buildingDetailsUpdate);
router.post('/deleteBuildingDetails',buildingController.buildingDetailsDelete);

module.exports = router;