import { applyCors, sendResponse } from '../_utils/cors.js';
import { sendContactNotification } from '../_utils/emailService.js';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendResponse(res, 405, false, 'Method Not Allowed');
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return sendResponse(res, 400, false, 'All fields are required');
  }

  const mailResult = await sendContactNotification({ name, email, subject, message });

  return sendResponse(res, 200, true, 'Admin notification dispatched successfully', {
    provider: mailResult.provider,
  });
}
