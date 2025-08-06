const express = require('express')
const floorController = require('../Controllers/floorController')
const router = express.Router();

router.get("/getFloorDetails/:buildingId",floorController.floorDataRead)
router.post("/addFloorDetails",floorController.floorDataAdd)
router.post("/updateFloorDetails",floorController.floorDataUpdate)
router.post("/deleteFloorDetails",floorController.floorDataDelete)

module.exports = router;