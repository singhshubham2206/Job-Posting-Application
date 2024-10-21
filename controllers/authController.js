// handling signup and OTP verification

const Company = require('../models/Company'); 
const emailService = require('../services/emailService'); 
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');


// Signup function(register new company by sending otps)(api/auth/signup)
exports.signup = async (req, res) => {
  const { name, phoneNumber, companyName, employeeSize, email } = req.body;

  try {
    let company = await Company.findOne({ email });
    if (company) {
      return res.status(400).json({ message: 'Company already registered' });
    }

    company = new Company({ name, phoneNumber, companyName, employeeSize, email });
    await company.save();

    // Send OTP to email and mobile
    const emailOtp = emailService.sendOtp(email);
    const mobileOtp = smsService.sendOtp(phoneNumber);

    res.redirect('/api/auth/verify-otp');

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// OTP Verification and JWT token generation function(/api/auth/verify-otp)
exports.verifyOtp = async (req, res) => {
  const { email, phoneOtp, emailOtp } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Company not found' });
    }

    // Verify both OTPs
    const isEmailOtpValid = emailService.verifyOtp(email, emailOtp);
    const isPhoneOtpValid = smsService.verifyOtp(company.phoneNumber, phoneOtp);

    if (!isEmailOtpValid || !isPhoneOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    company.isEmailVerified = true;
    company.isPhoneVerified = true;
    await company.save();

    // Generate JWT TOKEN 
    const token = jwt.sign({ id: company._id,name: company.name, email: company.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    console.log('Generated JWT Token:', token);
    console.log('Verified Company Info:', company);

    res.cookie("token", token).redirect('/api/jobs/post');
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
};