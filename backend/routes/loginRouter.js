const express = require('express')
const loginController = require('../Controllers/loginController')
const router = express.Router()

router.post("/getLoginDetails",loginController.getLoginDetails);
router.post("/sendEmail",loginController.mailSender);

module.exports = router
