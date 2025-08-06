const express = require('express');
const hallController = require('../Controllers/hallController');
const router = express.Router();

router.get("/getHallDetails/:floorId",hallController.hallDetailsRead);
router.post("/addHallDetails",hallController.hallDetailsAdd);
router.post("/updateHallDetails",hallController.hallDetailsUpdate);
router.post("/deleteHallDetails",hallController.hallDetailsDelete);

module.exports = router