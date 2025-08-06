const express = require('express')
const storeroomController = require('../Controllers/storeroomController');
const router = express.Router();

router.get('/getStoreItemDetails',storeroomController.getStoreItems);

module.exports = router;