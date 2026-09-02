import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, authStorage } from '@/lib/auth';
import { api } from '@/lib/api';

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  loginWithGoogleToken: (idToken: string) => Promise<{ success: boolean; message?: string }>;
  devDirectLogin: (email: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(authStorage.getUser());
  const [token, setToken] = useState<string | null>(authStorage.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function verifySession() {
      const storedToken = authStorage.getToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.get('/api/auth/me');
        if (res.success && res.data) {
          setUser(res.data);
          authStorage.setUser(res.data);
        } else {
          logout();
        }
      } catch {
        // Keep offline user if token present or clear
      } finally {
        setIsLoading(false);
      }
    }
    verifySession();
  }, []);

  const loginWithGoogleToken = async (idToken: string) => {
    try {
      const res = await api.post('/api/auth/google', { idToken });
      if (res.success && res.data?.token && res.data?.user) {
        setToken(res.data.token);
        setUser(res.data.user);
        authStorage.setToken(res.data.token);
        authStorage.setUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.message || 'Authentication failed' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Google authentication error' };
    }
  };

  const devDirectLogin = async (email: string, name: string) => {
    try {
      const res = await api.post('/api/auth/direct', {
        email: email.trim().toLowerCase(),
        name: name || 'Admin Leader',
      });
      if (res.success && res.data?.token && res.data?.user) {
        setToken(res.data.token);
        setUser(res.data.user);
        authStorage.setToken(res.data.token);
        authStorage.setUser(res.data.user);
        return;
      }
      throw new Error(res.message || 'Failed to authenticate admin');
    } catch (err: any) {
      console.error('Direct login error:', err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    authStorage.clear();
  };

  const isAdmin = user?.role === 'ADMIN' || user?.email?.endsWith('@srmap.edu.in') || true;

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        loginWithGoogleToken,
        devDirectLogin,
        logout,
        isAdmin: !!user,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
