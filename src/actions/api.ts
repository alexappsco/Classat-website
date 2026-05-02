'use server';


import { cookies } from "next/headers";
import axiosInstance, { apiClient, endpoints } from "src/utils/axios";

// Types
export interface MeetingResponse {
  token: string | null;
  roomId: string | null;
  participantName?: string | null;
  message?: string | null;
}

interface CreateMeetingParams {
  videoSessionId: string;
}

interface JoinMeetingParams {
  videoSessionId: string;
}

/**
 * Fetch user profile to get the participant name
 */
export const getProfile = async (): Promise<{ id: string | null, name: string | null }> => {
  const url = endpoints.profile.get;
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log(`[API Request] Fetching profile data`, { url });

  try {
    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    const data = response.data;
    const profileData = data.data || data;
    return {
      name: profileData?.name || null,
      id: (profileData?.userId || profileData?.teacherId || profileData?.id)?.toString() || null
    };
  } catch (error: any) {
    return { name: null, id: null };
  }
};


/**
 * Create a new meeting room via backend
 * @param params - Object containing videoSessionId
 * @returns Meeting details (token and roomId) or error
 * 
 */


// export const createMeeting = async ({
//   videoSessionId,
// }: CreateMeetingParams): Promise<MeetingResponse> => {
//   const url = endpoints.sdk.create(videoSessionId);
//   const cookieStore = await cookies();
//   const token = cookieStore.get('accessToken')?.value;
//   console.log(`[API Request] Creating meeting for session: ${videoSessionId}`, { url });

//   try {
//     const response = await axiosInstance.post(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     const data = response.data;

//     console.log("[API Response] Create meeting success:", data);

//     if (data.roomId && data.token) {
//       return { roomId: data.roomId, token: data.token, error: null };
//     } else {
//       return { roomId: null, token: null, error: data.message || "Invalid response from server" };
//     }
//   } catch (error: any) {
//     // console.error("[API Error] Creating meeting failed:", error);
//     return {
//       roomId: null,
//       token: null,
//       error: error.message || "Failed to create meeting",
//     };
//   }
// };

export const createMeeting = async ({
  videoSessionId,
}: CreateMeetingParams): Promise<MeetingResponse> => {
  const url = endpoints.sdk.create(videoSessionId);
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  console.log(`[API Request] Creating meeting for session: ${videoSessionId}`, { url });

  try {
    const response = await axiosInstance.post(
      url,
      {}, // مهم جدًا
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    console.log("[API Response] Create meeting success:", data);

    if (data.roomId && data.token) {
      return { roomId: data.roomId, token: data.token, message: null };
    } else {
      return {
        roomId: null,
        token: null,
        message: data.message || "Invalid response from server",
      };
    }
  } catch (error: any) {
    return {
      roomId: null,
      token: null,
      message: error.message || "Failed to create meeting",
    };
  }
};
/**
 * Join an existing meeting room via backend
 * @param params - Object containing videoSessionId
 * @returns Meeting details (token and roomId) or error
 */
export const joinMeeting = async ({
  videoSessionId,
}: JoinMeetingParams): Promise<MeetingResponse> => {
  const url = endpoints.sdk.join(videoSessionId);
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  console.log(`[API Request] Joining meeting for session: ${videoSessionId}`, { url });

  try {
    const response = await axiosInstance.post(
      url,
      {}, // مهم جدًا
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;

    console.log("[API Response] Join meeting success:", data);

    if (data.roomId && data.token) {
      return { roomId: data.roomId, token: data.token, message: null };
    } else {
      return { roomId: null, token: null, message: data.message || "Invalid response from server" };
    }
  } catch (error: any) {
    console.error("[API Error] Joining meeting failed:", error);
    return {
      roomId: null,
      token: null,
      message: error.message || "Failed to join meeting",
    };
  }
};


// Keeping these for backward compatibility if needed, but they should be phased out
export const getToken = async () => {
  console.warn("getToken() is deprecated. Token is now provided by createMeeting/joinMeeting backend calls.");
  return undefined;
};

export const validateMeeting = async ({ roomId }: { roomId: string, token: string }) => {
  console.warn("validateMeeting() is deprecated. Validation is handled by the joinMeeting backend call.");
  return { meetingId: roomId, err: null };
};