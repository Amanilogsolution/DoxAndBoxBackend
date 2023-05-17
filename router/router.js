const express = require('express');
const router = express.Router();

const procedureController = require('../controller/procedure')
const userController = require('../controller/Login')
const profileController = require('../controller/Profile')
const reportController = require('../controller/Reports')
const locationsController = require('../controller/Location')
const dashboardController = require('../controller/dashboard')
const DupliacteController = require('../controller/Duplicacy')
const TwofaAuthController = require('../controller/2FaAuthentication/Twofa')
const IdController = require('../controller/SeriesCount')
const mail = require('../controller/mail')

router.post('/reports', procedureController.Data)
router.post('/request', procedureController.AddRequest)

router.post('/UserLogin', userController.UserLogin)
router.post('/userpasswordchange', userController.UserPasswordChange)
router.post('/profiledetails', profileController.ProfileDetails)
router.post('/reportdata', reportController.Reportdata)
router.post('/reportdataboxes', reportController.ReportdataBoxes)
router.post('/requestreport', reportController.RequestReport)
router.post('/boxreport', reportController.BoxReport)
router.post('/totalscanreportcount', reportController.TotalScanReportCount)
router.post('/departmentdata', reportController.DepartmentData)


router.post('/Twofa', TwofaAuthController.GenerateTwofa)
router.post('/VerifyTwo', TwofaAuthController.VerifyTwofa)

router.post('/totallocation', locationsController.locations)

router.post('/dashboardetails', dashboardController.dashboardetails)
router.get('/bargraph', dashboardController.dashbaordetailsBar)
router.post('/piegraph', dashboardController.dashbaordetailsPie)
router.post('/dashbaorscannedpages', dashboardController.dashbaorScannedPages)

router.post('/shreddingduplicate', DupliacteController.ShreddingDupliacte)
router.post('/idcount', IdController.IdCount)
router.post('/updateidcount', IdController.UpdateIdCount)

router.post('/mail',mail.Email)

module.exports = router