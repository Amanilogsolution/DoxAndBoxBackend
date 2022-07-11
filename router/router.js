const express = require('express');
const router = express.Router();
const procedureController = require('../controller/procedure')
const userController = require('../controller/Login')
const profileController = require('../controller/Profile')
const reportController = require('../controller/Reports')

router.post('/reports',procedureController.Data)
router.post('/request',procedureController.AddRequest)

router.post('/UserLogin',userController.UserLogin)
router.post('/userpasswordchange',userController.UserPasswordChange)
router.post('/profiledetails',profileController.ProfileDetails)
router.post('/reportdata',reportController.Reportdata)



module.exports = router