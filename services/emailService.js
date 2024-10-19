const nodemailer = require('nodemailer');

// A simple in-memory OTP storage (for demo purposes)
const emailOtps = {};

exports.sendOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
  emailOtps[email] = otp;

  // Simulate email sending (use real Nodemailer config for actual email)
  console.log(`Email OTP sent to ${email}: ${otp}`);
  
  return otp;
};

exports.verifyOtp = (email, otp) => {
  return emailOtps[email] === parseInt(otp);
};
