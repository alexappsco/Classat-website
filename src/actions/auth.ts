'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import axiosInstance, { endpoints, getErrorMessage, SharedApiClient } from 'src/utils/axios';

import { HOST_API_SHARED } from 'src/config-global';
import { IRegister } from 'src/types/regester';

const getServerLanguage = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('Language')?.value || 'ar';
};

export const Login = async (data: { email: string; password: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await SharedApiClient.post(`${endpoints.auth.sendOtp}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });

    return res.data;
  } catch (e) {
    return { error: getErrorMessage(e) };
  }
};

// Backward-compatible alias for existing imports
export const LoginWithEmail = Login;

export const Register = async (data: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  projectName: string;
  role?: string;
}) => {
  const lang = await getServerLanguage();
  try {
    const payload = {
      ...data,
      role: data.role || 'Student',
    };
    const res = await axiosInstance.post(`${endpoints.auth.register}`, payload, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.data;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const ForgetPassword = async (data: { email: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await axiosInstance.post(`${endpoints.auth.sendOtp}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.status;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const ResetPassword = async (data: { email: string; code: string; newPassword: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await axiosInstance.post(`${endpoints.auth.verifyOtpLogin}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.status;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const VerifyOtpLogin = async (data: { phone: string; code: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await SharedApiClient.post(`${endpoints.auth.verifyOtpLogin}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.data;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};


export const RegisterStudent = async (data: IRegister) => {
  const lang = await getServerLanguage();
      const formatPhoneNumber = (phone: string) => {
      if (!phone) return phone; // Return early if phone is undefined/null/empty
      if (phone.startsWith('+')) {
        return phone; // Already has country code
      }
      return '+966' + phone;
    };
  try {
    const payload = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber ? formatPhoneNumber(data.phoneNumber) : undefined,
      guardianPhoneNumber: data.guardianPhoneNumber ? formatPhoneNumber(data.guardianPhoneNumber) : undefined,
      countryId: data.countryId,   
      learningPreference: data.learningPreference ,
    };
    const res = await axiosInstance.post(endpoints.auth.register, payload, {
      
      headers: {
        'Accept-Language': lang,
      },
    });
        console.log('REGISTRATION SUCCESS 👉', res?.data);
     return res?.data;
  } catch (e: any) {
    console.log('REGISTRATION ERROR 👉', e?.response?.data);
    return {
      error: getErrorMessage(e),
    };
  }
};

export const RefreshToken = async () => {
  const lang = await getServerLanguage();
  const cookieStore = await cookies();
  const refresh = cookieStore.get('refreshToken')?.value;

  try {
    const res = await axios.post(
      HOST_API_SHARED?.replace('admin', 'refresh-token')!,
      {
        refreshToken: refresh,
      },
      {
        headers: {
          'Accept-Language': lang,
        },
      }
    );

    return res?.data;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const getServerUser = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;
  if (!userCookie) {
    return null;
  }
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

export const LoginWithPhone = async (data: { phoneNumber: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await SharedApiClient.post(`/users/send-phone-login`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res.data;
  } catch (e) {
    return { error: getErrorMessage(e) };
  }
};



export async function SendLoginOtp(data: {
  channel: 'Email' | 'Phone';
  value: string;
  role: string;
}) {
  const lang = await getServerLanguage();
  console.log(
  'BASE URL 👉',
  SharedApiClient.defaults.baseURL
);
  
  // Prepare the payload based on channel type
const payload = {
  channel: data.channel,
  value: data.value,
  role: data.role,
};

  
  try {
    const res = await SharedApiClient.post(
      endpoints.auth.sendOtp,
      payload,
      { 
        headers: {
          'Accept-Language': lang,
        }
      }
    );
    
    return {
      ...res.data,
      channel: data.channel,
      value: data.value,
    };
  } catch (e: any) {
    console.log('SEND OTP ERROR FULL 👉', e?.response?.data);
    console.log('FINAL URL 👉', SharedApiClient.defaults.baseURL + endpoints.auth.sendOtp);
    console.log('PAYLOAD SENT 👉', payload);
    return {
      error:
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        'Failed to send OTP',
    };
  }
}


export const VerifyLoginOtp = async (data: {
  channel: 'Email' | 'Phone';
  value: string;
  otp: string;
}) => {
  const lang = await getServerLanguage();

  // Prepare the payload based on channel type
const payload = {
    channel: data.channel,
    value: data.value,
    otp: data.otp,
    role: 'Student',
  };

  console.log('VERIFY OTP PAYLOAD 👉', payload);

  try {
    const res = await SharedApiClient.post(
      endpoints.auth.verifyOtp,
      payload,
      {
        headers: { 'Accept-Language': lang ,
                    // 'Content-Type': 'application/json',

        },
      }
    );

    return res.data;
  } catch (e) {
        console.log('VERIFY OTP ERROR 👉', e?.response?.data);

    return {  error:
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        'Invalid OTP', };
  }
};

