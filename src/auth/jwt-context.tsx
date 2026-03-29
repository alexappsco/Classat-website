 

'use client';

import Cookies from 'js-cookie';
import { VerifyLoginOtp } from 'src/actions/auth';
import { SharedApiClient } from 'src/utils/axios';
// import { SharedApiClient } from 'src/api/shared-api-client';

// Helper function to check if we're in the browser
const isBrowser = () => typeof window !== 'undefined';

// ------------------ SESSION UTILS ------------------
export const setSession = ({
  accessToken,
  refreshToken,
  accessTokenExpireAt,
  refreshTokenExpireAt,
}: {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpireAt?: string;
  refreshTokenExpireAt?: string;
}) => {
  if (accessToken) {
    // ✅ ضبط Authorization header لأي request جاي بعد كده
    SharedApiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken || '');
    Cookies.set('accessTokenExpireAt', accessTokenExpireAt || '');
    Cookies.set('refreshTokenExpireAt', refreshTokenExpireAt || '');

    // Keep a copy in localStorage for client-side usage (non-authoritative)
    if (isBrowser()) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('accessTokenExpireAt', accessTokenExpireAt || '');
      localStorage.setItem('refreshTokenExpireAt', refreshTokenExpireAt || '');
    }
  } else {
    delete SharedApiClient.defaults.headers.common.Authorization;
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('accessTokenExpireAt');
    Cookies.remove('refreshTokenExpireAt');
    if (isBrowser()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpireAt');
      localStorage.removeItem('refreshTokenExpireAt');
    }
  }
};

// ------------------ HOOK ------------------
export const useJwtAuth = () => {
  const loginWithOtp = async (data: {
    channel: 'Email' | 'Phone';
    value: string;
    otp: string;
  }) => {
    const res = await VerifyLoginOtp(data);

    if (res?.error) {
      throw new Error(res.error);
    }

    // ✅ هنا نستخدم setSession
    setSession({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      accessTokenExpireAt: res.accessTokenExpireAt,
      refreshTokenExpireAt: res.refreshTokenExpireAt,
    });


    return res;
  };

  const logout = () => {
    setSession({}); // يمسح كل حاجة
  };

  return { loginWithOtp, logout };
};
