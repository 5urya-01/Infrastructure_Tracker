const express = require('express')
const placewiseController = require('../Controllers/floorPlaceWiseController');
const router = express.Router()

router.get('/floor/getAllItemCount/:floorId',placewiseController.getAllItemCount)
router.get('/floor/getCountByCategory/:floorId',placewiseController.getCountByCategory)
router.get('/floor/getCountByCondition/:floorId',placewiseController.getCountByCondition)
router.get('/floor/getCountByCompany/:floorId',placewiseController.getCountByCompany)
router.get('/floor/getCountByCompanyAndItemName/:floorId',placewiseController.getCountByCompanyAndItemName)
router.get('/floor/getConsumptionCounts/:floorId',placewiseController.getConsumptionCounts)
router.get('/floor/getTotalTypesOfConsumptionGroupedByItemName/:floorId',placewiseController.getTotalTypesOfConsumptionGroupedByItemName)

module.exports = router