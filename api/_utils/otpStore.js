import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || process.env.OTP_SECRET || 'hackshastra-registration-secret';
const OTP_COOLDOWN_MS = (parseInt(process.env.OTP_COOLDOWN_SECONDS, 10) || 45) * 1000;
const OTP_TTL_MS = (parseInt(process.env.OTP_TTL_SECONDS, 10) || 600) * 1000;

// Global in-memory cache for serverless invocation lifecycle
const globalStore = globalThis.__HACKSHASTRA_OTP_STORE__ || new Map();
globalThis.__HACKSHASTRA_OTP_STORE__ = globalStore;

export function storeOtp(email, otp) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = globalStore.get(normalizedEmail);

  if (existing && existing.lastRequestedAt && Date.now() - existing.lastRequestedAt < OTP_COOLDOWN_MS) {
    const waitSec = Math.ceil((OTP_COOLDOWN_MS - (Date.now() - existing.lastRequestedAt)) / 1000);
    return {
      allowed: false,
      waitSec,
      message: `Please wait ${waitSec}s before requesting a new OTP`,
    };
  }

  const expiresAt = Date.now() + OTP_TTL_MS;
  globalStore.set(normalizedEmail, {
    otp,
    expiresAt,
    attempts: 0,
    lastRequestedAt: Date.now(),
    verified: false,
  });

  return { allowed: true, expiresAt };
}

export function verifyOtp(email, inputOtp) {
  const normalizedEmail = email.trim().toLowerCase();
  const record = globalStore.get(normalizedEmail);

  if (!record) {
    return {
      success: false,
      statusCode: 400,
      message: 'OTP has expired or was not requested. Please request a new verification code.',
    };
  }

  if (Date.now() > record.expiresAt) {
    globalStore.delete(normalizedEmail);
    return {
      success: false,
      statusCode: 400,
      message: 'OTP code has expired. Please request a new code.',
    };
  }

  if (record.attempts >= 5) {
    globalStore.delete(normalizedEmail);
    return {
      success: false,
      statusCode: 429,
      message: 'Too many invalid attempts. Please request a new OTP.',
    };
  }

  if (record.otp !== String(inputOtp).trim()) {
    record.attempts += 1;
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid OTP code. Please check and try again.',
      attemptsLeft: 5 - record.attempts,
    };
  }

  // Success
  globalStore.delete(normalizedEmail);

  const verificationProofToken = jwt.sign(
    { email: normalizedEmail, type: 'registration_otp_verified' },
    JWT_SECRET,
    { expiresIn: '30m' }
  );

  const contactVerificationToken = jwt.sign(
    { email: normalizedEmail, purpose: 'contact_submission' },
    JWT_SECRET,
    { expiresIn: '30m' }
  );

  return {
    success: true,
    verificationProofToken,
    verificationToken: contactVerificationToken,
  };
}

export function generateRandomOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

export function getJwtSecret() {
  return JWT_SECRET;
}
