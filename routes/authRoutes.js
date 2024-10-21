const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure this line imports the authController correctly

// Render and Handle Sign Up Page
router.get('/signup', (req, res) => {
    res.render('signup'); 
});

router.post('/signup', authController.signup); 


// Render and Handle OTP Verification Submission
router.get('/verify-otp', (req, res) => {
    res.render('otpVerification'); 
});

router.post('/verify-otp', authController.verifyOtp); 



module.exports = router;
