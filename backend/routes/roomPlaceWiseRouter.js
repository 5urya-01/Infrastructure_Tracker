const express = require('express')
const placewiseController = require('../Controllers/roomPlaceWiseController');
const router = express.Router()

router.get('/room/getAllItemCount/:roomId',placewiseController.getAllItemCount)
router.get('/room/getCountByCategory/:roomId',placewiseController.getCountByCategory)
router.get('/room/getCountByCondition/:roomId',placewiseController.getCountByCondition)
router.get('/room/getCountByCompany/:roomId',placewiseController.getCountByCompany)
router.get('/room/getCountByCompanyAndItemName/:roomId',placewiseController.getCountByCompanyAndItemName)
router.get('/room/getConsumptionCounts/:roomId',placewiseController.getConsumptionCounts)
router.get('/room/getTotalTypesOfConsumptionGroupedByItemName/:roomId',placewiseController.getTotalTypesOfConsumptionGroupedByItemName)

module.exports = router