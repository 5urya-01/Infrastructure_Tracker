const express = require('express')
const placewiseController = require('../Controllers/buildingPlaceWiseController');
const router = express.Router()

router.get('/building/getAllItemCount/:buildingId',placewiseController.getAllItemCount)
router.get('/building/getCountByCategory/:buildingId',placewiseController.getCountByCategory)
router.get('/building/getCountByCondition/:buildingId',placewiseController.getCountByCondition)
router.get('/building/getCountByCompany/:buildingId',placewiseController.getCountByCompany)
router.get('/building/getCountByCompanyAndItemName/:buildingId',placewiseController.getCountByCompanyAndItemName)
router.get('/building/getConsumptionCounts/:buildingId',placewiseController.getConsumptionCounts)
router.get('/building/getTotalTypesOfConsumptionGroupedByItemName/:buildingId',placewiseController.getTotalTypesOfConsumptionGroupedByItemName)

module.exports = router