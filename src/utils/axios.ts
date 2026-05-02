
import Cookie from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HOST_API, HOST_API_SHARED } from 'src/config-global';

import { ACCESS_TOKEN } from '../auth/constants';
// ----------------------------------------------------------------------



const axiosInstance = axios.create({
  baseURL: HOST_API,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // خلي Axios يحدد النوع تلقائيًا
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    // ضيف التوكن لو موجود
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // رجّع الـ response كامل
  (error) => {
    // سيب الـ error زي ما هو
    return Promise.reject(error);
  }
);

export { axiosInstance };

// ----------------------------------------------------------------------




export interface Params {
  page: number;
  limit: number;
  status?: string;
  filters?: string;
  created_at?: string;
  headers?: { access_token: string };
}
const apiClient: AxiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': Cookie.get('Language') ? Cookie.get('Language') : 'en',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

const SharedApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API_SHARED,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': Cookie.get('Language') ? Cookie.get('Language') : 'en',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

SharedApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default apiClient;
export { apiClient, SharedApiClient };


export const baseUrl = HOST_API;
export const sharedBaseUrl = HOST_API_SHARED;

export const fetcher = async ({ url, config }: { url: string; config?: AxiosRequestConfig }) => {
  const response = await apiClient.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
      'Accept-Language': Cookie.get('Language') || 'en',
    },
  });

  return response.data;
};

export const fetcherAuth = async ({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}) => {
  const response = await SharedApiClient.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
      'Accept-Language': Cookie.get('Language') || 'en',
    },
  });

  return response.data;
};
export const getErrorMessage = (error: any): string => {
  const toReadable = (value: unknown): string | null => {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    const normalized = raw.replace(/[_-]+/g, ' ');
    const lower = normalized.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // Prefer explicit validation error message when present
  const validationMsg = error?.validationErrors?.[0]?.message;
  const candidates: Array<string | null> = [
    toReadable(validationMsg),
    toReadable(error?.error?.message),
    toReadable(error?.message),
    toReadable(error?.error?.code),
    toReadable(error?.code),
    toReadable(error?.error && typeof error.error === 'string' ? error.error : null),
    toReadable(error && typeof error === 'string' ? error : null),
  ];

  const first = candidates.find((m) => m && m.length > 0);
  return first || 'Something went wrong';
};




export const endpoints = {
  auth: {
    logout: '/shared/auth/logout',
    sendOtp: '/shared/auth/otp/send',
    verifyOtp: '/shared/auth/otp/verify',
    verifyOtpLogin: '/shared/auth/otp/verify',
    register: '/students/register',
    refreshToken: '/shared/auth/refresh-token',
    forgetPassword: '/shared/users/request-forget-password',
    // sendOtp: '/shared/auth/send-otp',
    // verifyOtp: '/shared/auth/verify-otp',

  },
  country: {
    get: '/shared/location/countries',
  },
  EducationApproach:
  {
    type: '/shared/education/approaches',
    typeMap: '/shared/education/mappings/approach-type',
    typeStage: '/shared/education/mappings/approach-type-stages',
    typeStageGrade: '/shared/education/mappings/approach-type-stage-grades',

  },
  profile: {
    get: '/students/profile',
    update: '/students/profile/update',
  },
  post_payment: '/shared/payment-methods',
  get_payment: '/shared/payment-methods',
  liveCourse: {
    get: "/students/live-session-courses"
  },
  sdk: {
    create: (videoSessionId: string) => `/students/video-sessions/${videoSessionId}/start`,
    join: (videoSessionId: string) => `/students/video-sessions/${videoSessionId}/join`,
    leave: (videoSessionId: string) => `/students/video-sessions/${videoSessionId}/leave`,
    end: (videoSessionId: string) => `/students/video-sessions/${videoSessionId}/end`,
    chat: '/shared/file-upload',

  }

};
