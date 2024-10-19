// handling signup and OTP verification

const Company = require('../models/Company'); 
const emailService = require('../services/emailService'); 
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');

// Signup function
exports.signup = async (req, res) => {
  const { name, phoneNumber, companyName, employeeSize, email } = req.body;

  try {
    // Check if company already exists
    let company = await Company.findOne({ email });
    if (company) {
      return res.status(400).json({ message: 'Company already registered' });
    }

    // Create a new company
    company = new Company({ name, phoneNumber, companyName, employeeSize, email });
    await company.save();

    // Send OTP to email and mobile
    const emailOtp = emailService.sendOtp(email);
    const mobileOtp = smsService.sendOtp(phoneNumber);

    res.status(200).json({
      message: 'OTP sent to email and mobile. Please verify to complete registration.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// OTP Verification function
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

    const token = jwt.sign({ id: company._id, email: company.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    console.log('Generated JWT Token:', token);
    console.log('Verified Company Info:', company);

    res.status(200).json({ message: 'OTP verified, registration complete', token });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
};