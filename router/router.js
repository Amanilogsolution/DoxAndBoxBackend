const express = require('express');
const router = express.Router();
const procedureController = require('../controller/procedure')
const userController = require('../controller/Login')
const profileController = require('../controller/Profile')
const reportController = require('../controller/Reports')
const locationsController = require('../controller/Location')
const dashboardController = require('../controller/dashboard')
const DupliacteController = require('../controller/Duplicacy')

router.post('/reports',procedureController.Data)
router.post('/request',procedureController.AddRequest)

router.post('/UserLogin',userController.UserLogin)
router.post('/userpasswordchange',userController.UserPasswordChange)
router.post('/profiledetails',profileController.ProfileDetails)
router.post('/reportdata',reportController.Reportdata)
router.post('/reportdataboxes',reportController.ReportdataBoxes)
router.post('/requestreport',reportController.RequestReport)


router.post('/totallocation',locationsController.locations)

router.post('/dashboardetails',dashboardController.dashboardetails)
router.get('/bargraph',dashboardController.dashbaordetailsBar)
router.post('/piegraph',dashboardController.dashbaordetailsPie)


router.post('/shreddingduplicate',DupliacteController.ShreddingDupliacte)




module.exports = router