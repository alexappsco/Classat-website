// 'use server';

// import { cookies } from 'next/headers';
// import axiosInstance from 'src/utils/axios';
// import { endpoints } from 'src/utils/endpoints';

// import { ACCESS_TOKEN, REFRESH_TOKEN } from './config';
// import { User, UserSession, LoginCretentials } from './types';

// export interface LoginRes extends User {
//   accessToken: string;
//   refreshToken: string;
//   accessTokenExpireAt: Date;
//   refreshTokenExpireAt: Date;
// }

// export async function login(credentials: LoginCretentials): Promise<UserSession> {
//   try {
//     const res = await axiosInstance.post(endpoints.auth.login, credentials);

//     const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
//       res as unknown as LoginRes;
//     return {
//       user,
//       accessToken: {
//         value: accessToken,
//         expire: accessTokenExpireAt,
//       },
//       refreshToken: {
//         value: refreshToken,
//         expire: refreshTokenExpireAt,
//       },
//     };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function refreshSession(): Promise<UserSession> {
//   try {
//     const cookiesStore = await cookies();
//     const refreshTokenCookie = cookiesStore.get(REFRESH_TOKEN);
//     const accessTokenCookie = cookiesStore.get(ACCESS_TOKEN);

//     if (!refreshTokenCookie?.value) {
//       throw new Error('No refresh token found');
//     }

//     const res = await axiosInstance.post(
//       endpoints.auth.refreshToken,
//       {
//         refreshToken: refreshTokenCookie.value,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessTokenCookie?.value}`,
//         },
//       }
//     );

//     const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
//       res as unknown as LoginRes;

//     return {
//       user,
//       accessToken: {
//         value: accessToken,
//         expire: accessTokenExpireAt,
//       },
//       refreshToken: {
//         value: refreshToken,
//         expire: refreshTokenExpireAt,
//       },
//     };
//   } catch (error) {
//     throw error;
//   }
// }

// export async function requestOtp(email: string): Promise<void> {
//   try {
//     await axiosInstance.post(endpoints.auth.sendOtp, { email, isPhone: false });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function verifyOtp(email: string, otp: string): Promise<{ accessToken: string }> {
//   try {
//     const response = await axiosInstance.post(endpoints.auth.verifyOtp, {
//       email,
//       isPhone: false,
//       otp,
//     });
//     return response as unknown as { accessToken: string };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function resetPassword({
//   newPassword,
//   confirmPassword,
//   token,
// }: {
//   newPassword: string;
//   confirmPassword: string;
//   token: string;
// }): Promise<void> {
//   try {
//     await axiosInstance.post(
//       endpoints.auth.changePassword,
//       { newPassword, confirmPassword },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   } catch (error) {
//     throw error;
//   }
// }



'use server';

import { cookies } from 'next/headers';
import axiosInstance, { endpoints, SharedApiClient } from 'src/utils/axios';

import { REFRESH_TOKEN } from './config';
import { User, UserSession } from './types';

export interface LoginRes extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: Date;
  refreshTokenExpireAt: Date;
}

// This function is deprecated since we now use OTP-based login
// Keeping it for reference
export async function login(email: string, phone: string): Promise<UserSession> {
  try {
    // Check if API endpoints are configured
    if (!SharedApiClient.defaults.baseURL) {
      console.error('API base URL is not configured. Please set NEXT_PUBLIC_HOST_API_SHARED in your environment variables.');
      throw new Error('API configuration error. Please contact administrator.');
    }
    
    // Determine whether to send email or phone based on which is provided
    const payload = email ? { email, role: 'Student' } : { phone, role: 'Student' };
    
    const res = await SharedApiClient.post(endpoints.auth.sendOtp, payload);

    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res.data as LoginRes;
    return {
      user,
      accessToken: {
        value: accessToken,
        expire: accessTokenExpireAt,
      },
      refreshToken: {
        value: refreshToken,
        expire: refreshTokenExpireAt,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function refreshSession(): Promise<UserSession> {
  try {
    // Check if API endpoints are configured
    if (!SharedApiClient.defaults.baseURL) {
      console.error('API base URL is not configured. Please set NEXT_PUBLIC_HOST_API_SHARED in your environment variables.');
      throw new Error('API configuration error. Please contact administrator.');
    }
    
    const cookiesStore = await cookies();
    const refreshTokenCookie = cookiesStore.get(REFRESH_TOKEN);

    if (!refreshTokenCookie?.value) {
      throw new Error('No refresh token found');
    }

    const res = await SharedApiClient.post(endpoints.auth.refreshToken, {
      refreshToken: refreshTokenCookie.value,
    });

    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res.data as LoginRes;

    return {
      user,
      accessToken: {
        value: accessToken,
        expire: accessTokenExpireAt,
      },
      refreshToken: {
        value: refreshToken,
        expire: refreshTokenExpireAt,
      },
    };
  } catch (error) {
    throw error;
  }
}

