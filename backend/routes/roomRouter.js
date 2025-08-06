const express = require('express')
const roomControllers = require('../Controllers/roomController');
const router = express.Router();

router.get("/getRoomDetails/:floorId",roomControllers.roomDetailsRead);
router.post("/addRoomDetails",roomControllers.roomDetailsAdd);
router.post("/updateRoomDetails",roomControllers.roomDetailsUpdate);
router.post("/deleteRoomDetails",roomControllers.roomDetailsDelete);

module.exports = router