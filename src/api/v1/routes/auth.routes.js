const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { registerSchema, loginSchema} = require('../../../utils/schema')
router.post('/register',validate(registerSchema),authController.registerUser);
router.post('/login', validate(loginSchema),authController.loginUser);

module.exports = router;