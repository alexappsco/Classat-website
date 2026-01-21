// import axios from 'axios';
// import { HOST_API } from 'src/config-global';
import Cookie from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HOST_API, HOST_API_SHARED } from 'src/config-global';

import { ACCESS_TOKEN } from '../auth/constants';
// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers['Content-Type'] = 'application/json';

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add a response interceptor (optional)
// axiosInstance.interceptors.response.use(
//   (response) => response?.data,
//   (error) => {
//     const status = error.response?.status || 500;
//     const message = getErrorMessage(error.response.data);
//     // Handle errors
//     return Promise.reject({ message, status });
//   }
// );
// export { axiosInstance };


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

// export const getErrorMessage = (error: unknown): string => {
//   let message: string;
//   if (error instanceof Error) {
//     // eslint-disable-next-line prefer-destructuring
//     message = error.message;
//   } else if (error && typeof error === 'object' && 'message' in error) {
//     message = String(error.message);
//   } else if (typeof error === 'string') {
//     message = error;
//   } else {
//     message = 'Something went wrong';
//   }
//   return message;
// };
/* eslint-disable prefer-destructuring */


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
// axios.interceptors.request.use(
//   (config) => {
//     config.headers['Accept-Language'] = Cookie.get('Language');
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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
    // sendOtp: '/shared/auth/send-otp',
    // verifyOtp: '/shared/auth/verify-otp',
    forgetPassword: '/shared/users/request-forget-password',
    // verifyforgetPassword: '/shared/users/verify-forget-password',
    // sendQuestions: '/shared/users/questions',
  },
  country:{
    get: '/shared/location/countries',
  },
  EducationApproach:
  {
    type:'/shared/education/approach-types',
    typeMap:'/shared/education/mappings/approach-type',
    typeStage:'/shared/education/mappings/approach-type-stages',
    typeStageGrade:'/shared/education/mappings/approach-type-stage-grades',

  },
  profile: {
    get: '/students/profile',
    update: '/students/profile/update',
  },
};
