// A simple in-memory OTP storage (for demo purposes)
const phoneOtps = {};

exports.sendOtp = (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
  phoneOtps[phoneNumber] = otp;

  // Simulate SMS sending (use a real SMS service like Twilio for actual SMS)
  console.log(`Phone OTP sent to ${phoneNumber}: ${otp}`);
  
  return otp;
};

exports.verifyOtp = (phoneNumber, otp) => {
  return phoneOtps[phoneNumber] === parseInt(otp);
};
