// Mock email service (console log for now)
const sendOTPEmail = (email, otp) => {
  console.log(`📧 MOCK EMAIL SENT TO: ${email}`);
  console.log(`🔢 OTP CODE: ${otp}`);
  console.log(`⏰ Valid for 5 minutes`);
  console.log('─'.repeat(40));
  
  // In production, use nodemailer, SendGrid, etc.
  return { success: true };
};

module.exports = { sendOTPEmail };
