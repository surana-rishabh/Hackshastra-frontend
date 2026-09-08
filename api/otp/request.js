import { applyCors, sendResponse } from '../_utils/cors.js';
import { generateRandomOtp, storeOtp } from '../_utils/otpStore.js';
import { sendRegistrationOtpEmail } from '../_utils/emailService.js';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendResponse(res, 405, false, 'Method Not Allowed');
  }

  const { email, fullName, eventTitle = 'Beyond the Screen' } = req.body || {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email.trim())) {
    return sendResponse(res, 400, false, 'Please provide a valid email address');
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail.endsWith('@srmap.edu.in')) {
    return sendResponse(res, 400, false, 'Registration is exclusive to SRM University-AP students. Email must end with @srmap.edu.in');
  }

  const otp = generateRandomOtp();
  const storeResult = storeOtp(normalizedEmail, otp);

  if (!storeResult.allowed) {
    return sendResponse(res, 429, false, storeResult.message);
  }

  const mailResult = await sendRegistrationOtpEmail({
    to: normalizedEmail,
    fullName: fullName || 'Trainer',
    otp,
    eventTitle,
  });

  return sendResponse(res, 200, true, 'Verification OTP sent to your university email', {
    email: normalizedEmail,
    expiresIn: 600,
    provider: mailResult.provider,
  });
}
