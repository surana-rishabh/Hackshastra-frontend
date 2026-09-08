import { applyCors, sendResponse } from '../_utils/cors.js';
import { verifyOtp } from '../_utils/otpStore.js';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendResponse(res, 405, false, 'Method Not Allowed');
  }

  const { email, otp } = req.body || {};
  if (!email || !otp) {
    return sendResponse(res, 400, false, 'Email and OTP code are required');
  }

  const result = verifyOtp(email, otp);
  if (!result.success) {
    return sendResponse(res, result.statusCode || 400, false, result.message, {
      attemptsLeft: result.attemptsLeft,
    });
  }

  return sendResponse(res, 200, true, 'Email successfully verified.', {
    email: email.trim().toLowerCase(),
    verified: true,
    verificationToken: result.verificationToken,
  });
}
