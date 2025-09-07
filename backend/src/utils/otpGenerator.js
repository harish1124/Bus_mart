// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock OTP storage (in production, use Redis or database)
const otpStore = new Map();

const saveOTP = (email, otp, expiresInMinutes = 5) => {
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  otpStore.set(email, { otp, expiresAt });
  
  // Auto-cleanup expired OTPs
  setTimeout(() => {
    otpStore.delete(email);
  }, expiresInMinutes * 60 * 1000);
};

const verifyOTP = (email, inputOtp) => {
  const stored = otpStore.get(email);
  
  if (!stored) {
    return { valid: false, message: 'OTP not found or expired' };
  }
  
  if (new Date() > stored.expiresAt) {
    otpStore.delete(email);
    return { valid: false, message: 'OTP expired' };
  }
  
  if (stored.otp !== inputOtp) {
    return { valid: false, message: 'Invalid OTP' };
  }
  
  otpStore.delete(email); // Remove OTP after successful verification
  return { valid: true, message: 'OTP verified successfully' };
};

module.exports = { generateOTP, saveOTP, verifyOTP };
