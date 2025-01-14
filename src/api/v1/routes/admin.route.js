const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateUser } = require('../../middlewares/authMiddleware');
const { authorizeAdmin } = require('../../middlewares/adminAuthorize');


router.put('/:kycId/approve-kyc',authenticateUser,authorizeAdmin,adminController.approveKyc)
router.get('/view-compliance-kpi',authenticateUser,authorizeAdmin,adminController.viewKycList)
router.get('/view-kyc',authenticateUser,authorizeAdmin,adminController.viewKycList)



module.exports = router;