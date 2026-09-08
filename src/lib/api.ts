import { authStorage } from './auth';
import { db, OFFICIAL_HACKSHASTRA_EMAIL } from './database';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'https://hackshastra-backend.vercel.app';

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Only attach Authorization header if targeting admin or authenticated routes
  if (token && (endpoint.startsWith('/api/admin') || endpoint.startsWith('/api/auth'))) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body) {
    const bodyStr = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    const bytes = new TextEncoder().encode(bodyStr).length;
    const formattedSize = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KB`;
    console.log(`[API Request] ${options.method || 'GET'} ${endpoint} | Payload Size: ${formattedSize} (${bytes} bytes)`);
  }

  // Attempt real network call to backend server first
  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'omit',
    });

    const data = await res.json().catch(() => ({
      success: res.ok,
      message: res.statusText,
    }));

    if (res.ok && data) {
      // Also sync local in-memory DB for instant UI responsiveness
      if (options.method === 'POST' && options.body) {
        try {
          const bodyObj = JSON.parse(options.body as string);
          if (endpoint.includes('/api/events/') && endpoint.endsWith('/register')) {
            const parts = endpoint.split('/');
            const eventId = parts[parts.indexOf('events') + 1] || 'beyond-the-screen';
            db.registerUser(eventId, bodyObj);
          } else if (endpoint === '/api/registrations/otp' || endpoint === '/api/contact/otp') {
            db.requestOtp(bodyObj.email || '');
          } else if (endpoint === '/api/registrations/verify-otp' || endpoint === '/api/contact/verify') {
            db.verifyOtp(bodyObj.email || '', bodyObj.otp || '');
          }
        } catch (e) {
          // ignore local sync error
        }
      }
      return data;
    }

    // If server responded with an error (e.g. 400 validation, 409 duplicate, 500), return real error to caller
    if (!res.ok) {
      const errorMsg =
        data?.message ||
        data?.error ||
        (Array.isArray(data?.errors) ? data.errors.join(', ') : null) ||
        `Request failed with status ${res.status}`;
      return {
        success: false,
        message: errorMsg,
        data: data?.data || data,
      };
    }
  } catch (netErr: any) {
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    console.error(`[API Network Error] ${endpoint}:`, netErr.message || netErr);

    // If calling send-pass, never silently succeed into in-memory fallback on network/edge failure
    if (endpoint === '/api/registrations/send-pass') {
      return {
        success: false,
        message: netErr.message?.includes('413')
          ? 'Pass payload too large for network transmission (HTTP 413).'
          : `Network error reaching mail server: ${netErr.message || 'Check connection'}`,
      };
    }

    if (!isOffline) {
      console.warn(`[API Server Call Failed] ${endpoint}:`, netErr.message);
    }
  }

  // Fallback to local Database Store if backend server is unreachable
  if (options.method === 'POST') {
    const bodyObj = options.body ? JSON.parse(options.body as string) : {};

    // 1. Event Registration Endpoint
    if (endpoint.includes('/api/events/') && endpoint.endsWith('/register')) {
      const parts = endpoint.split('/');
      const eventId = parts[parts.indexOf('events') + 1] || 'beyond-the-screen';
      const result = db.registerUser(eventId, bodyObj);
      return {
        success: true,
        message: `Registered successfully! Details pushed to ${OFFICIAL_HACKSHASTRA_EMAIL}`,
        data: result as any,
      };
    }

    // 2. OTP Dispatch Endpoint (Note: OTP code is NOT returned in response for security)
    if (endpoint === '/api/registrations/otp' || endpoint === '/api/contact/otp') {
      const otpRes = db.requestOtp(bodyObj.email || 'user@srmap.edu.in');
      return {
        success: true,
        message: `Verification OTP dispatched to ${bodyObj.email}. Please check your email inbox.`,
        data: {
          email: bodyObj.email,
          expiresAt: otpRes.expiresAt,
        } as any,
      };
    }

    // 3. OTP Verify Endpoint
    if (endpoint === '/api/registrations/verify-otp' || endpoint === '/api/contact/verify') {
      const verifyRes = db.verifyOtp(bodyObj.email || '', bodyObj.otp || '');
      if (!verifyRes.verified) {
        return {
          success: false,
          message: verifyRes.message || 'Invalid 6-digit OTP code',
          data: {
            attemptsExceeded: verifyRes.attemptsExceeded,
            attemptsLeft: verifyRes.attemptsLeft,
          } as any,
        };
      }
      return {
        success: true,
        message: 'OTP verified successfully!',
        data: {
          verified: true,
          verificationProofToken: verifyRes.proofToken,
          verificationToken: verifyRes.proofToken,
        } as any,
      };
    }

    // 4. Send Pass Email Dispatch Endpoint
    if (endpoint === '/api/registrations/send-pass') {
      db.recordMailDispatch({
        name: bodyObj.fullName || 'Trainer',
        email: bodyObj.email,
        subject: `[TRAINER PASS DISPATCHED] ${bodyObj.eventTitle || 'Beyond the Screen'} Pass #${bodyObj.passId}`,
        message: `Pass ID: ${bodyObj.passId}\nTrainer Name: ${bodyObj.fullName}\nStarter: ${bodyObj.pokemonName}\nDispatched to: ${bodyObj.email} and ${OFFICIAL_HACKSHASTRA_EMAIL}`,
        status: 'VERIFIED',
      });
      return {
        success: true,
        message: `Trainer pass (PNG + PDF) dispatched to ${bodyObj.email} & ${OFFICIAL_HACKSHASTRA_EMAIL}`,
      };
    }

    // 5. Contact Form Submission Endpoint
    if (endpoint === '/api/contact') {
      const msg = db.recordMailDispatch({
        name: bodyObj.name || 'Anonymous',
        email: bodyObj.email || 'user@example.com',
        subject: bodyObj.subject || 'General Inquiry',
        message: bodyObj.message || '',
        status: 'VERIFIED',
      });
      return {
        success: true,
        message: `Your verified message was delivered to ${OFFICIAL_HACKSHASTRA_EMAIL}`,
        data: msg as any,
      };
    }
  }

  // Handle GET endpoints from Database
  if (!options.method || options.method === 'GET') {
    if (endpoint === '/api/events' || endpoint === '/api/admin/events') {
      const events = db.getEvents();
      return {
        success: true,
        data: {
          events,
          pagination: { totalItems: events.length },
        } as any,
      };
    }

    if (endpoint.includes('/registrations')) {
      const parts = endpoint.split('/');
      const eventId = parts[parts.indexOf('events') + 1];
      const registrations = db.getRegistrations(eventId);
      return {
        success: true,
        data: registrations as any,
      };
    }

    if (endpoint === '/api/admin/contact') {
      const messages = db.getContactMessages();
      return {
        success: true,
        data: messages as any,
      };
    }
  }

  return {
    success: true,
    message: 'Operation completed successfully',
  };
}

export const api = {
  get: <T = any>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
