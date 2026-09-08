import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

// Load .env variables for local serverless execution in Vite dev
if (fs.existsSync(path.resolve(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

function serverlessDevPlugin() {
  const ROUTE_MAP: Record<string, string> = {
    '/api/otp/request': './api/otp/request.js',
    '/api/otp/verify': './api/otp/verify.js',
    '/api/registrations/otp': './api/otp/request.js',
    '/api/registrations/verify-otp': './api/otp/verify.js',
    '/api/registrations/send-pass': './api/mail/send-pass.js',
    '/api/mail/send-pass': './api/mail/send-pass.js',
    '/api/contact/otp': './api/contact/otp.js',
    '/api/contact/verify': './api/contact/verify.js',
    '/api/contact/notify': './api/contact/notify.js',
  };

  return {
    name: 'vite-serverless-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const urlPath = (req.url || '').split('?')[0];
        const handlerFile = ROUTE_MAP[urlPath];

        if (!handlerFile) {
          return next();
        }

        try {
          // Read request body
          let bodyStr = '';
          for await (const chunk of req) {
            bodyStr += chunk;
          }

          let bodyObj: any = {};
          if (bodyStr) {
            try {
              bodyObj = JSON.parse(bodyStr);
            } catch {
              bodyObj = bodyStr;
            }
          }
          req.body = bodyObj;

          // Parse query params
          const parsedUrl = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          req.query = Object.fromEntries(parsedUrl.searchParams.entries());

          // Shim Vercel / Express response helpers
          res.status = (statusCode: number) => {
            res.statusCode = statusCode;
            return res;
          };
          res.json = (data: any) => {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json');
            }
            res.end(JSON.stringify(data));
            return res;
          };
          res.send = (data: any) => {
            res.end(data);
            return res;
          };

          const filePath = path.resolve(__dirname, handlerFile);
          const fileUrl = `${pathToFileURL(filePath).href}?t=${Date.now()}`;
          const mod = await import(fileUrl);
          const handler = mod.default || mod;
          await handler(req, res);
        } catch (err: any) {
          console.error(`[Serverless Dev Error] ${urlPath}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: err.message || 'Internal Serverless Error' }));
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serverlessDevPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api/events': {
        target: 'https://hackshastra-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/api/admin': {
        target: 'https://hackshastra-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
          three: ['three'],
          pdf: ['jspdf', 'html-to-image', 'qrcode'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
