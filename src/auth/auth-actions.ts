 
'use server';

import { cookies } from 'next/headers';
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';

import { REFRESH_TOKEN } from './config';
import { User, UserSession, LoginCretentials, VerifyCretentials } from './types';

export interface LoginRes extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: Date;
  refreshTokenExpireAt: Date;
}

// Step 1: Request OTP
export async function login(credentials: LoginCretentials) {
  try {
    const res = await axiosInstance.post(endpoints.auth.sendOtp, credentials);
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Login failed',
    };
  }
}

// Step 2: Verify OTP and get Tokens
export async function verifyOtpApi(credentials: VerifyCretentials): Promise<UserSession> {
  try {
    const res = await axiosInstance.post(endpoints.auth.verifyOtpLogin, credentials);
    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res.data as LoginRes;

    return {
      user,
      accessToken: { value: accessToken, expire: accessTokenExpireAt },
      refreshToken: { value: refreshToken, expire: refreshTokenExpireAt },
    };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'OTP verification failed');
  }
}

// Step 3: Refresh Session (Used by Init)
export async function refreshSession(): Promise<UserSession> {
  try {
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get(REFRESH_TOKEN);

    if (!refreshTokenCookie?.value) {
      throw new Error('No refresh token found');
    }

    const res = await axiosInstance.post(endpoints.auth.refreshToken, {
      refreshToken: refreshTokenCookie.value,
    });

    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res.data as LoginRes;

    return {
      user,
      accessToken: { value: accessToken, expire: accessTokenExpireAt },
      refreshToken: { value: refreshToken, expire: refreshTokenExpireAt },
    };
  } catch (error: any) {
    throw new Error('Session expired. Please login again.');
  }
}