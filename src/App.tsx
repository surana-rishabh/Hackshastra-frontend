import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { AdminAuthProvider } from '@/lib/AdminAuthContext';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEventsPage } from '@/pages/admin/AdminEventsPage';
import { AdminTeamPage } from '@/pages/admin/AdminTeamPage';
import { AdminContactPage } from '@/pages/admin/AdminContactPage';
import { AdminContentPage } from '@/pages/admin/AdminContentPage';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { EventsPage } from '@/pages/EventsPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { TeamPage } from '@/pages/TeamPage';
import { ContactPage } from '@/pages/ContactPage';
import { JoinPage } from '@/pages/JoinPage';
import { BeyondTheScreenRegister } from '@/pages/BeyondTheScreenRegister';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  // Check if current hostname is an admin subdomain (e.g. admin.hackshastra.org or admin.localhost)
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isAdminSubdomain = host.startsWith('admin.') || host.includes('admin-hackshastra');

  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <BrowserRouter>
          {isAdminSubdomain ? (
            /* Subdomain Mode (admin.hackshastra.org) */
            <Routes>
              <Route path="/login" element={<AdminLoginPage />} />
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/" element={<AdminDashboardPage />} />
                <Route path="/events" element={<AdminEventsPage />} />
                <Route path="/team" element={<AdminTeamPage />} />
                <Route path="/contact" element={<AdminContactPage />} />
                <Route path="/content" element={<AdminContentPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            /* Standard Main Site + /admin Route */
            <Routes>
              {/* Admin Portal via /admin route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<ProtectedAdminRoute />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="team" element={<AdminTeamPage />} />
                <Route path="contact" element={<AdminContactPage />} />
                <Route path="content" element={<AdminContentPage />} />
              </Route>

              {/* Standalone Immersive Registration Deck (No Navbar / No Footer / Full-Bleed Video Experience) */}
              <Route path="/events/beyond-the-screen/register" element={<BeyondTheScreenRegister />} />
              <Route path="/events/beyond-the-screen" element={<BeyondTheScreenRegister />} />
              <Route path="/beyond-the-screen-register" element={<BeyondTheScreenRegister />} />
              <Route path="/register/beyond-the-screen" element={<BeyondTheScreenRegister />} />
              <Route path="/events/register" element={<BeyondTheScreenRegister />} />

              {/* Public Website */}
              <Route
                path="*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/events" element={<EventsPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/team" element={<TeamPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/join" element={<JoinPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          )}
        </BrowserRouter>
      </AdminAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
