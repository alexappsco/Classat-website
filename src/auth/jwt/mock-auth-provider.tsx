'use client';

/**
 * TEMPORARY: Mock Auth Provider for UI Development
 * This is a temporary replacement for the AuthProvider while working on UI.
 *
 * To re-enable authentication:
 * 1. Restore the AuthProvider import in src/app/layout.tsx
 * 2. Remove the MockAuthProvider import and usage
 * 3. Restore AuthGuard and GuestGuard in layout files
 */

import { useMemo, useState, useCallback, useEffect } from 'react';
import { AuthContext } from './auth-context';
import { JWTContextType } from '../context/jwt/types';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// Mock user data for development
const mockUser = {
  id: 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  phoneNumber: '+1234567890',
  role: 'admin',
  completeTeacherProfile: true,
  accessToken: 'mock-access-token',
};

const AUTH_STORAGE_KEY = 'mock-authenticated';

const readAuthState = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

const persistAuthState = (value: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(AUTH_STORAGE_KEY, value ? 'true' : 'false');
};

export function MockAuthProvider({ children }: Readonly<Props>) {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = readAuthState();
    setIsAuthenticated(stored);
    setInitializing(false);
  }, []);

  const updateAuthState = useCallback((value: boolean) => {
    setIsAuthenticated(value);
    persistAuthState(value);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    console.log('🎨 UI Development Mode: Mock login with:', { email });

    // Simulate a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update authentication state
    updateAuthState(true);

    // Simulate successful login by redirecting to dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }

    // Return success (no error)
    return undefined;
  }, []);

  const handleLogout = useCallback(async () => {
    console.log('🎨 UI Development Mode: Mock logout');

    // Update authentication state
    updateAuthState(false);

    // Simulate logout by redirecting to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/jwt/login';
    }
  }, []);

  const handleRegister = useCallback(async () => {
    console.log('🎨 UI Development Mode: Mock register');

    // Simulate a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update authentication state
    updateAuthState(true);

    // Simulate successful registration by redirecting to dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }

    return undefined;
  }, []);

  const handleLoginWithPhone = useCallback(async () => {
    console.log('🎨 UI Development Mode: Mock login with phone');

    // Simulate a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update authentication state
    updateAuthState(true);

    // Simulate successful login by redirecting to dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }

    return undefined;
  }, []);

  const memoizedValue: JWTContextType = useMemo(
    () => ({
      user: isAuthenticated ? mockUser : null,
      method: 'jwt',
      loading: initializing,
      authenticated: isAuthenticated,
      unauthenticated: !isAuthenticated && !initializing,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      loginWithPhone: handleLoginWithPhone,
    }),
    [handleLogin, handleRegister, handleLogout, handleLoginWithPhone, initializing, isAuthenticated]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
