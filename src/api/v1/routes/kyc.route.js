const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kyc.controller');
const { authenticateUser } = require('../../middlewares/authMiddleware');
const upload = require('../../../utils/multer');
const { kycnSchema} = require('../../../utils/schema');
const { validate } = require('../../middlewares/validation.middleware');

router.post('/upload', authenticateUser, validate(kycnSchema), upload.single('idDocument'), kycController.submitKyc);


module.exports = router;