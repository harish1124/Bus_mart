const express = require('express');
const router = express.Router();
const { register, login, sendOTP, verifyOTPCode } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPCode);

module.exports = router;
