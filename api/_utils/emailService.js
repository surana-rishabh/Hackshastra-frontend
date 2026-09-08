import dns from 'dns';
import nodemailer from 'nodemailer';

let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 465;

  if (smtpUser && smtpPass) {
    const ipv4Lookup = (hostname, options, callback) => {
      dns.lookup(hostname, { family: 4 }, callback);
    };

    if (smtpHost.includes('gmail') || smtpUser.includes('gmail')) {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        lookup: ipv4Lookup,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });
    } else {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        lookup: ipv4Lookup,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });
    }
  } else {
    transporter = nodemailer.createTransport({ jsonTransport: true });
  }

  return transporter;
};

export const dispatchMail = async ({ to, subject, html, attachments = [] }) => {
  const mailFrom = process.env.MAIL_FROM || 'HackShastra <supporthackshastra@gmail.com>';
  const resendApiKey = process.env.RESEND_API_KEY;
  const brevoApiKey = process.env.BREVO_API_KEY;

  // 1. Preferred Cloud Delivery: Resend HTTPS API
  if (resendApiKey && !resendApiKey.includes('xxxx') && resendApiKey.startsWith('re_')) {
    try {
      const resendPayload = {
        from: mailFrom.includes('@resend.dev') ? mailFrom : 'HackShastra <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      };

      if (attachments && attachments.length > 0) {
        resendPayload.attachments = attachments.map((att) => ({
          filename: att.filename,
          content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : att.content,
        }));
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendPayload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`[Resend API] Email dispatched to ${to}`, data.id);
        return { success: true, messageId: data.id, provider: 'resend' };
      }
      console.warn('[Resend API] Failed with response:', data);
    } catch (err) {
      console.error('[Resend API Error]:', err.message);
    }
  }

  // 2. Preferred Brevo HTTPS API
  if (brevoApiKey) {
    try {
      const brevoPayload = {
        sender: {
          name: 'HackShastra',
          email: process.env.SMTP_USER || 'supporthackshastra@gmail.com',
        },
        to: (Array.isArray(to) ? to : [to]).map((email) => ({ email })),
        subject,
        htmlContent: html,
      };

      if (attachments && attachments.length > 0) {
        brevoPayload.attachment = attachments.map((att) => ({
          name: att.filename,
          content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : att.content,
        }));
      }

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(brevoPayload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`[Brevo API] Email dispatched to ${to}`, data.messageId);
        return { success: true, messageId: data.messageId, provider: 'brevo' };
      }
      console.warn('[Brevo API] Failed with response:', data);
    } catch (err) {
      console.error('[Brevo API Error]:', err.message);
    }
  }

  // 3. SMTP Transport Fallback
  try {
    const activeTransporter = createTransporter();
    const info = await activeTransporter.sendMail({
      from: mailFrom,
      to,
      subject,
      html,
      attachments,
    });
    console.log(`[SMTP] Email dispatched to ${to}`, info.messageId);
    return { success: true, messageId: info.messageId, provider: 'smtp' };
  } catch (smtpErr) {
    console.warn(`[SMTP Delivery Warning] Failed to ${to}: ${smtpErr.message}`);
    return { success: false, error: smtpErr.message, provider: 'none' };
  }
};

/**
 * Send 6-digit verification OTP email for Event Registration
 */
export const sendRegistrationOtpEmail = async ({ to, fullName, otp, eventTitle = 'Beyond the Screen' }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 2px solid #EF4444; border-radius: 12px; background-color: #0A0F14; color: #FFFFFF;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="display: inline-block; background-color: #DC2626; color: #FFFFFF; font-weight: 900; font-size: 13px; padding: 4px 14px; border-radius: 20px; letter-spacing: 2px; text-transform: uppercase;">
          POKÉDEX V2.4 SECURITY
        </div>
        <h2 style="color: #F59E0B; margin: 12px 0 4px 0; font-size: 22px; font-weight: bold; text-transform: uppercase;">
          ${eventTitle}
        </h2>
        <p style="color: #94A3B8; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
          SRM University-AP Trainer Pass Verification
        </p>
      </div>
      
      <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">
        Trainer ${fullName ? `<strong>${fullName}</strong>` : ''},
      </p>
      <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6;">
        Your Pokédex requested an authentication sync code to lock in your Trainer Card and starter companion for <strong>${eventTitle}</strong>. Enter the 6-digit code below into your Pokédex terminal:
      </p>

      <div style="margin: 28px 0; text-align: center;">
        <div style="display: inline-block; background-color: #1E293B; border: 2px solid #F59E0B; border-radius: 8px; padding: 14px 28px; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #FDE68A; font-family: monospace; box-shadow: 0 0 20px rgba(245,158,11,0.25);">
          ${otp}
        </div>
      </div>

      <p style="color: #94A3B8; font-size: 12px; line-height: 1.4; text-align: center;">
        ⏱ This Trainer OTP is valid for <strong>10 minutes</strong>. Do not share this code with rival Trainers.
      </p>

      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.15); margin: 24px 0 16px 0;" />
      <p style="font-size: 11px; color: #64748B; margin: 0; text-align: center;">
        © ${new Date().getFullYear()} HackShastra SRM-AP Chapter • Arena Operations
      </p>
    </div>
  `;

  return await dispatchMail({
    to,
    subject: `[${otp}] Your Trainer Verification Code for ${eventTitle} — HackShastra`,
    html,
  });
};

/**
 * Send confirmed Trainer Pass email with QR code
 */
export const sendPassEmail = async ({
  to,
  fullName,
  eventTitle = 'Beyond the Screen',
  passId,
  pokemonName = 'Starter Partner',
}) => {
  const cleanPokemon = (pokemonName || '').toLowerCase().trim();
  const POKEMON_META = {
    squirtle: {
      name: 'SQUIRTLE',
      type: 'WATER // 007',
      accent: '#1789E5',
      badge: 'Tiny Turtle Pokémon • Hydro Cannon ready',
      artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    },
    charmander: {
      name: 'CHARMANDER',
      type: 'FIRE // 004',
      accent: '#F97316',
      badge: 'Lizard Pokémon • Flamethrower ready',
      artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    },
    bulbasaur: {
      name: 'BULBASAUR',
      type: 'GRASS // 001',
      accent: '#65A30D',
      badge: 'Seed Pokémon • Solar Beam ready',
      artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
  };

  const meta = POKEMON_META[cleanPokemon] || {
    name: (pokemonName || 'STARTER PARTNER').toUpperCase(),
    type: 'POKÉDEX // SYNCED',
    accent: '#38BDF8',
    badge: 'Official Companion Pokémon',
    artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  };

  const resolvedPassId = passId || 'BTS-CONFIRMED';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`HACKSHASTRA-${resolvedPassId}-${cleanPokemon}`)}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0A0F14; border: 2px solid #38BDF8; border-radius: 16px; color: #FFFFFF;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #38BDF8; margin: 0 0 4px 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
          ⚡ HACKSHASTRA ⚡
        </h1>
        <p style="color: #94A3B8; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
          SRM UNIVERSITY-AP • CV 402 • 16 SEP 2026 (2:30 PM)
        </p>
      </div>

      <div style="background-color: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="color: #38BDF8; margin: 0 0 12px 0; font-size: 16px;">Welcome aboard, Trainer ${fullName || 'Challenger'}!</h3>
        <p style="color: #CBD5E1; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
          Your Pokédex registration has been confirmed! Your official partner Pokémon <strong>${meta.name}</strong> is synchronized with your entry pass.
        </p>
        <div style="background: rgba(245, 158, 11, 0.1); border: 1px dashed #F59E0B; border-radius: 8px; padding: 10px 14px; font-size: 14px; font-weight: bold; color: #FDE68A;">
          PASS ID: <span style="font-family: monospace; letter-spacing: 2px;">${resolvedPassId}</span>
        </div>
      </div>

      <div style="text-align: center; margin: 24px 0; background: #0B1118; border: 2px solid ${meta.accent}; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        <span style="background-color: ${meta.accent}; color: #000000; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">${meta.type}</span>
        <h2 style="color: #FFFFFF; margin: 12px 0 4px 0; font-size: 22px; letter-spacing: 2px; font-family: monospace;">${meta.name}</h2>
        <p style="color: #94A3B8; font-size: 13px; margin: 0 0 16px 0;">${meta.badge}</p>
        <img src="${meta.artwork}" alt="${meta.name}" style="width: 170px; height: 170px; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));" />
        <div style="margin-top: 18px; padding-top: 16px; border-top: 1px dashed rgba(255,255,255,0.15);">
          <p style="color: #94A3B8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Official Entry QR Pass</p>
          <img src="${qrCodeUrl}" alt="Entry QR" style="width: 130px; height: 130px; border-radius: 8px; border: 2px solid ${meta.accent}; background: #FFFFFF; padding: 6px;" />
        </div>
      </div>

      <div style="background-color: #1E293B; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 13px; color: #94A3B8; line-height: 1.5; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #E2E8F0;">⚡ Please present this digital pass or your Pass ID at the entrance of CV 402 on event day.</p>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 24px 0 16px 0;" />
      <p style="font-size: 11px; color: #64748B; margin: 0; text-align: center;">
        © ${new Date().getFullYear()} HackShastra SRM-AP Chapter • Beyond The Screen Operations
      </p>
    </div>
  `;

  return await dispatchMail({
    to,
    subject: `Your Official Pass & Collectible Partner Card: ${eventTitle} — HackShastra`,
    html,
  });
};

/**
 * Send contact OTP email
 */
export const sendContactOtpEmail = async ({ to, otp }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px; background-color: #FFFFFF;">
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0DA5F0; margin: 0; font-size: 20px; font-weight: bold;">HACKSHASTRA SRM-AP</h2>
        <span style="color: #64748B; font-size: 12px; text-transform: uppercase;">Security Verification</span>
      </div>
      
      <p style="color: #334155; font-size: 14px; line-height: 1.5;">
        You are sending a contact message to the HackShastra community. Please use the following One-Time Password (OTP) to verify your email address:
      </p>

      <div style="margin: 24px 0; text-align: center;">
        <div style="display: inline-block; background-color: #F8FAFC; border: 2px solid #0DA5F0; border-radius: 8px; padding: 12px 24px; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #0DA5F0; font-family: monospace;">
          ${otp}
        </div>
      </div>

      <p style="color: #64748B; font-size: 12px; line-height: 1.4;">
        ⏱ This OTP is valid for <strong>10 minutes</strong>. If you did not request this verification, please safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0 16px 0;" />
      <p style="font-size: 11px; color: #94A3B8; margin: 0;">
        © ${new Date().getFullYear()} HackShastra SRM-AP Chapter • Secure Dispatch System
      </p>
    </div>
  `;

  return await dispatchMail({
    to,
    subject: `${otp} is your HackShastra Verification Code`,
    html,
  });
};

/**
 * Send admin contact notification
 */
export const sendContactNotification = async ({ name, email, subject, message }) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'hssc2025@srmap.edu.in';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
      <h3>New Contact Request Submitted</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #4F46E5;">
        ${message}
      </blockquote>
    </div>
  `;

  return await dispatchMail({
    to: adminEmail,
    subject: `New Contact Request: ${subject}`,
    html,
  });
};
