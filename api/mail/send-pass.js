import { applyCors, sendResponse } from '../_utils/cors.js';
import { sendPassEmail } from '../_utils/emailService.js';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendResponse(res, 405, false, 'Method Not Allowed');
  }

  const { email, fullName, eventTitle = 'Beyond the Screen', passId, pokemonName } = req.body || {};
  const normalizedEmail = (email || '').trim().toLowerCase();

  if (!normalizedEmail) {
    return sendResponse(res, 400, false, 'Email is required');
  }

  const resolvedPassId = passId || 'BTS-CONFIRMED';
  const mailResult = await sendPassEmail({
    to: normalizedEmail,
    fullName: fullName || 'Trainer',
    eventTitle,
    passId: resolvedPassId,
    pokemonName: pokemonName || 'Starter Partner',
  });

  return sendResponse(res, 200, true, 'Trainer pass successfully emailed to user', {
    email: normalizedEmail,
    passId: resolvedPassId,
    provider: mailResult.provider,
  });
}
