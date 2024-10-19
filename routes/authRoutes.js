const express = require('express');
const router = express.Router();
const { signup, verifyOtp } = require('../controllers/authController');

// Signup route
router.post('/signup', signup);

// OTP verification route
router.post('/verify-otp', verifyOtp);

module.exports = router;
