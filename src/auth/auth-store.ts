import { create } from 'zustand';
import { Profile } from 'src/types/prof';
import { paths } from 'src/routes/paths';

import { login, verifyOtpApi } from './auth-actions';
import { LoginCretentials,VerifyCretentials } from './types';
import { saveSession, removeSession, restoreSession } from './auth-utils';

type AuthStore = {
  loading: boolean;
  authenticated: boolean;
  user: any | null;
  login: (credentials: LoginCretentials) => Promise<void | { error: string } | { redirectTo: string }>;

  verifyOtp: (VerifyCretentials: VerifyCretentials) => Promise<void | { error: string }>;
  init: () => Promise<void | { accessTokenExp: number }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => void;
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  loading: true,
  authenticated: false,
  user: null,

  // login: async ({ channel,value, role }) => {
  //   try {
  //     const credentials = {
  //       channel,
  //       value,
  //       role
  //     };

  //     const { user, accessToken, refreshToken } = await login(credentials.channel, credentials.value,credentials.role);

  //     await saveSession({ user, accessToken, refreshToken });

  //     set({ authenticated: true, user });
  //   } catch (error) {
  //     return {
  //       error: error.message,
  //     };
  //   }
  // },
  login: async (credentials: LoginCretentials) => {
    const res = await login(credentials);

    if (!res.success) {
      return { error: res.message, message: res.message };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('phoneNumber', credentials.value);
      localStorage.setItem('verifyReferrer', paths.auth.login);
    }

    return { redirectTo: '/auth/verify' };
  },

  verifyOtp: async (credentials: VerifyCretentials) => {
    try {
      if (typeof window === 'undefined') {
        return { error: 'المتصفح غير متاح' };
      }

      const { accessToken, refreshToken, user } = await verifyOtpApi(credentials);

      await saveSession({ accessToken, refreshToken, user });
      set({
        authenticated: true,
        user,
        loading: false,
      });

      // Clean up localStorage after successful verification
      if (typeof window !== 'undefined') {
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('verifyReferrer');
      }
    } catch (error: any) {
      return { error: error.message || 'OTP verification failed' };
    }
  },


  init: async () => {
    const errorFunc = async () => {
      await removeSession();
      set({ loading: false });
    };

    // const refreshToken = await restoreSession();
    // if (refreshToken) {
    //   try {
    //     const { user, accessToken, refreshToken } = await refreshSession();

    //     await saveSession({ user, accessToken, refreshToken });
    //     set({ loading: false, authenticated: true, user });
    //     return {
    //       accessTokenExp: new Date(accessToken.expire).getTime() - new Date().getTime() - 60 * 1000,
    //     };
    //   } catch (error) {
    //     // eslint-disable-next-line no-console
    //     console.log(error);
    //     errorFunc();
    //   }
    // } else {
    //   errorFunc();
    // }
  },


  logout: async () => {
    const { user } = get();
    // Clean up temporary image URLs using image property
    if (user?.image?.startsWith('blob:')) {
      URL.revokeObjectURL(user.image);
    }

    await removeSession();
    set({ authenticated: false, user: null, loading: false });
  },
  updateProfile: (updates) => {
    set((state) => {
      if (!state.user) return state;

      // Handle image cleanup
      const currentImage = state.user.image;
      const newImage = updates.image;

      // Revoke old temporary URL if being replaced
      if (currentImage?.startsWith('blob:') && currentImage !== newImage) {
        URL.revokeObjectURL(currentImage);
      }

      return {
        user: {
          ...state.user,
          ...updates,
          image: newImage || currentImage,
        }
      };
    });
  },
  //  updateProfile: (updates) =>
  //   set((state) => ({
  //     user: state.user ? { ...state.user, ...updates } : null
  //   })),
}));