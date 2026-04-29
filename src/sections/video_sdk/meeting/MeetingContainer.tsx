// import React, { useState, useEffect, useRef, createRef, memo } from 'react';
// import { Constants, useMeeting, useParticipant, usePubSub, useWhiteboard } from '@videosdk.live/react-sdk';
// import { BottomBar } from './components/BottomBar';
// import { SidebarContainer } from '../components/sidebar/SidebarContainer';
// import MemorizedParticipantView from './components/ParticipantView';
// import { PresenterView } from '../components/PresenterView';
// import { nameTructed, trimSnackBarText } from 'src/utils/helper';
// import WaitingToJoinScreen from '../components/screens/WaitingToJoinScreen';
// import ConfirmBox from '../components/ConfirmBox';
// import useIsMobile from 'src/hooks/useIsMobile';
// import useIsTab from 'src/hooks/useIsTab';
// import { useMediaQuery } from 'react-responsive';
// import { toast } from 'react-toastify';
// import { useMeetingAppContext } from '../MeetingAppContextDef';
// import { Box } from '@mui/material';

// interface ParticipantMicStreamProps {
//   participantId: string;
// }

// interface MeetingError {
//   code: number;
//   message: string;
// }

// interface MeetingContainerProps {
//   onMeetingLeave: () => void;
//   setIsMeetingLeft: (value: boolean) => void;
//   meetingId: string;
//   token: string;
//   participantName: string;
//   participantId?: string;
// }

// const ParticipantMicStream = memo(({ participantId }: ParticipantMicStreamProps) => {
//   const { micStream, isLocal } = useParticipant(participantId);

//   useEffect(() => {
//     if (micStream && !isLocal) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(micStream.track);

//       const audio = new Audio();
//       audio.srcObject = mediaStream;
//       audio.play().catch((err) => console.log('micStream.play() failed', err));
//     }
//   }, [micStream, isLocal]);

//   return null;
// });

// ParticipantMicStream.displayName = 'ParticipantMicStream';

// export function MeetingContainer({
//   onMeetingLeave,
//   setIsMeetingLeft,
//   meetingId,
//   token,
//   participantName,
//   participantId,
// }: MeetingContainerProps) {
//   const {
//     setSelectedMic,
//     setSelectedWebcam,
//     setSelectedSpeaker,
//     useRaisedHandParticipants,
//     sideBarMode,
//     setUnreadChatCount,
//     setChatMessages,
//     canDraw,
//     setCanDraw,
//   } = useMeetingAppContext();

//   const [participantsData, setParticipantsData] = useState<string[]>([]);
//   const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] = useState<boolean | null>(
//     null
//   );
//   const [meetingErrorVisible, setMeetingErrorVisible] = useState(false);
//   const [meetingError, setMeetingError] = useState<MeetingError>({ code: 0, message: '' });

//   const bottomBarHeight = 60;
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [containerWidth, setContainerWidth] = useState(0);

//   const mMeetingRef = useRef<any>(null);
//   const containerRef = createRef<HTMLDivElement>();
//   const containerHeightRef = useRef(containerHeight);
//   const containerWidthRef = useRef(containerWidth);

//   useEffect(() => {
//     containerHeightRef.current = containerHeight;
//     containerWidthRef.current = containerWidth;
//   }, [containerHeight, containerWidth]);

//   const isMobile = useIsMobile();
//   const isTab = useIsTab();
//   const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
//   const isXLDesktop = useMediaQuery({ minWidth: 1440 });

//   const sideBarContainerWidth = isXLDesktop
//     ? 400
//     : isLGDesktop
//       ? 360
//       : isTab
//         ? 320
//         : isMobile
//           ? 280
//           : 240;

//   useEffect(() => {
//     if (containerRef.current) {
//       setContainerHeight(containerRef.current.offsetHeight);
//       setContainerWidth(containerRef.current.offsetWidth);
//     }

//     const handleResize = () => {
//       if (containerRef.current) {
//         setContainerHeight(containerRef.current.offsetHeight);
//         setContainerWidth(containerRef.current.offsetWidth);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [containerRef]);

//   const { participantRaisedHand } = useRaisedHandParticipants();

//   const handleMeetingLeft = () => {
//     setIsMeetingLeft(true);
//   };

//   const handleOnRecordingStateChanged = ({ status }: { status: string }) => {
//     if (
//       status === Constants.recordingEvents.RECORDING_STARTED ||
//       status === Constants.recordingEvents.RECORDING_STOPPED
//     ) {
//       toast(
//         `${status === Constants.recordingEvents.RECORDING_STARTED
//           ? 'Meeting recording is started'
//           : 'Meeting recording is stopped.'
//         }`,
//         {
//           position: 'bottom-left',
//           autoClose: 4000,
//           hideProgressBar: true,
//           closeButton: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'light',
//         }
//       );
//     }
//   };

//   const onParticipantJoined = (participant: any) => {
//     participant && participant.setQuality('high');
//   };

//   const onEntryResponded = ({
//     participantId,
//     decision,
//   }: {
//     participantId: string;
//     decision: string;
//   }) => {
//     if (mMeetingRef.current?.localParticipant?.id === participantId) {
//       if (decision === 'allowed') {
//         setLocalParticipantAllowedJoin(true);
//       } else {
//         setLocalParticipantAllowedJoin(false);
//         setTimeout(() => {
//           handleMeetingLeft();
//         }, 3000);
//       }
//     }
//   };

//   const onMeetingJoined = () => {
//     console.log('[meeting-debug] onMeetingJoined', {
//       meetingId: (mMeetingRef.current as any)?.meetingId,
//       localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
//       localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
//     });
//     setLocalParticipantAllowedJoin(true);
//   };

//   const onMeetingLeft = () => {
//     console.log('[meeting-debug] onMeetingLeft', {
//       meetingId: (mMeetingRef.current as any)?.meetingId,
//       localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
//       localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
//     });
//     setSelectedMic({ id: null, label: null });
//     setSelectedWebcam({ id: null, label: null });
//     setSelectedSpeaker({ id: null, label: null });
//     onMeetingLeave();
//   };

//   const handleOnError = (data: { code: number; message: string }) => {
//     const { code, message } = data;
//     console.log('[meeting-debug] meetingErr', {
//       code,
//       message,
//       meetingId: (mMeetingRef.current as any)?.meetingId,
//       localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
//       localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
//     });

//     const joiningErrCodes = [4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];

//     const isJoiningError = joiningErrCodes.findIndex((c) => c === code) !== -1;
//     const isCriticalError = `${code}`.startsWith('500');

//     new Audio(
//       isCriticalError
//         ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
//         : `https://static.videosdk.live/prebuilt/notification_err.mp3`
//     ).play();

//     setMeetingErrorVisible(true);
//     setMeetingError({
//       code,
//       message: isJoiningError ? 'Unable to join meeting!' : message,
//     });
//   };

//   const mMeeting = useMeeting({
//     onParticipantJoined,
//     onEntryResponded,
//     onMeetingJoined,
//     onMeetingStateChanged: ({ state }: { state: string }) => {
//       toast(`Meeting is in ${state} state`, {
//         position: 'bottom-left',
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeButton: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });
//     },
//     onMeetingLeft,
//     onError: (err: { code: string | number; message: string }) =>
//       handleOnError({ code: Number(err.code), message: err.message }),
//     onRecordingStateChanged: handleOnRecordingStateChanged,
//   });

//   // أضف useRef لتتبع المشاركين السابقين
//   const prevParticipantCountRef = useRef(0);
//   const hasJoinedRef = useRef(false);

//   useEffect(() => {
//     let decodedPayload = null;
//     try {
//       if (token && token.includes('.')) {
//         decodedPayload = JSON.parse(atob(token.split('.')[1]));
//       }
//     } catch (e) { }

//     if (decodedPayload && decodedPayload.permissions) {
//       setCanDraw(decodedPayload.permissions.includes("allow_whiteboard"));
//     }

//     console.log('[meeting-debug] container.mounted', {
//       meetingIdProp: meetingId,
//       participantName,
//       token,
//       tokenPayload: decodedPayload ? {
//         apikey: decodedPayload.apikey,
//         permissions: decodedPayload.permissions,
//         version: decodedPayload.version
//       } : 'Invalid JWT'
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // قم بتعديل useEffect الخاص بـ participants
//   useEffect(() => {
//     // فقط قم بالتحديث إذا تغير عدد المشاركين
//     const currentCount = mMeeting.participants.size;
//     if (currentCount !== prevParticipantCountRef.current) {
//       prevParticipantCountRef.current = currentCount;
//       const participantIds = Array.from(mMeeting.participants.keys());
//       const participantsSummary = participantIds.map((id) => {
//         const p = (mMeeting.participants.get(id) as any) ?? {};
//         return { id, displayName: p.displayName, isLocal: p.isLocal };
//       });
//       console.log('[meeting-debug] participants.changed', {
//         meetingId: (mMeeting as any)?.meetingId,
//         localParticipantId: (mMeeting as any)?.localParticipant?.id,
//         localDisplayName: (mMeeting as any)?.localParticipant?.displayName,
//         count: currentCount,
//         participantIds,
//         participantsSummary,
//       });
//       setParticipantsData(participantIds);
//     }
//   }, [mMeeting.participants.size]); // استخدم .size بدلاً من الـ Map كاملاً
//   const isPresenting = !!mMeeting.presenterId;

//   // useEffect(() => {
//   //   const debounceTimeout = setTimeout(() => {
//   //     const participantIds = Array.from(mMeeting.participants.keys());
//   //     console.log('Debounced participantIds', participantIds);
//   //     setParticipantsData(participantIds);
//   //     console.log('Setting participants');
//   //   }, 500);

//   //   return () => clearTimeout(debounceTimeout);
//   // }, [mMeeting.participants]);

//   useEffect(() => {
//     mMeetingRef.current = mMeeting;
//   }, [mMeeting]);

//   useEffect(() => {
//     // With joinWithoutUserInteraction={true}, the SDK handles join() internally.
//     // We just need to track the progress.
//     console.log('[meeting-debug] auto-join.initiation');
//   }, []);

//   usePubSub('RAISE_HAND', {
//     onMessageReceived: (data: { senderId: string; senderName: string }) => {
//       const localParticipantId = mMeeting?.localParticipant?.id;
//       const { senderId, senderName } = data;
//       const isLocal = senderId === localParticipantId;

//       new Audio(`https://static.videosdk.live/prebuilt/notification.mp3`).play();

//       toast(`${isLocal ? 'You' : nameTructed(senderName, 15)} raised hand 🖐🏼`, {
//         position: 'bottom-left',
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeButton: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });

//       participantRaisedHand(senderId);
//     },
//   });

//   const { whiteboardUrl: sdkWhiteboardUrl } = useWhiteboard();

//   const { messages: pubSubMessages } = usePubSub('CHAT', {
//     onMessageReceived: (data: { senderId: string; senderName: string; message: string }) => {
//       const localParticipantId = mMeeting?.localParticipant?.id;
//       const { senderId, senderName, message } = data;
//       const isLocal = senderId === localParticipantId;

//       if (!isLocal) {
//         new Audio(`https://static.videosdk.live/prebuilt/notification.mp3`).play();

//         // Only show toast if chat panel is NOT open
//         if (sideBarMode !== 'CHAT') {
//           setUnreadChatCount((prev) => prev + 1);
//           toast(`${trimSnackBarText(`${nameTructed(senderName, 15)} says: ${message}`)}`, {
//             position: 'bottom-left',
//             autoClose: 4000,
//             hideProgressBar: true,
//             closeButton: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'light',
//           });
//         }
//       }
//     },
//   });

//   // Sync VideoSDK messages with Global Context
//   useEffect(() => {
//     if (pubSubMessages) {
//       setChatMessages(pubSubMessages);
//     }
//   }, [pubSubMessages, setChatMessages]);

//   const showWaitingScreen =
//     !meetingErrorVisible &&
//     typeof localParticipantAllowedJoin !== 'boolean' &&
//     (mMeeting as { isMeetingJoined?: boolean }).isMeetingJoined !== true;

//   return (
//     <Box sx={{ height: "100vh", inset: 0 }}>
//       <Box
//         ref={containerRef}
//         sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1c23' }}
//       >
//         {typeof localParticipantAllowedJoin === 'boolean' ? (
//           localParticipantAllowedJoin ? (
//             <>
//               <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', bgcolor: '#1a1c23' }}>
//                 {isPresenting ? (
//                   <>
//                     <Box
//                       sx={{
//                         flex: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <PresenterView height={containerHeight - bottomBarHeight} />
//                     </Box>
//                     <Box
//                       sx={{
//                         flex: 1,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'flex-start',
//                         p: 1,
//                       }}
//                     >
//                       <MemorizedParticipantView isPresenting={isPresenting} />
//                     </Box>
//                   </>
//                 ) : sdkWhiteboardUrl ? (
//                   <>
//                     <Box
//                       sx={{
//                         flex: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         bgcolor: 'white',
//                         borderRadius: 1,
//                         m: 1,
//                         overflow: 'hidden',
//                         position: 'relative',
//                       }}
//                     >
//                       <iframe
//                         src={sdkWhiteboardUrl}
//                         title="Whiteboard"
//                         width="100%"
//                         height="100%"
//                         style={{
//                           border: 'none',
//                           pointerEvents: canDraw ? 'auto' : 'none',
//                         }}
//                       />
//                     </Box>
//                     <Box
//                       sx={{
//                         flex: 1,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'flex-start',
//                         p: 1,
//                       }}
//                     >
//                       <MemorizedParticipantView isPresenting={isPresenting} />
//                     </Box>
//                   </>
//                 ) : (
//                   <Box sx={{ display: 'flex', flex: 1 }}>
//                     <MemorizedParticipantView isPresenting={isPresenting} />
//                   </Box>
//                 )}

//                 <SidebarContainer
//                   height={containerHeight - bottomBarHeight}
//                   sideBarContainerWidth={sideBarContainerWidth}
//                 />
//               </Box>

//               <BottomBar bottomBarHeight={bottomBarHeight} setIsMeetingLeft={setIsMeetingLeft} />
//             </>
//           ) : null
//         ) : showWaitingScreen ? (
//           <WaitingToJoinScreen />
//         ) : null}

//         <ConfirmBox
//           open={meetingErrorVisible}
//           successText="OKAY"
//           onSuccess={() => setMeetingErrorVisible(false)}
//           title={`Error Code: ${meetingError.code}`}
//           subTitle={meetingError.message}
//         />
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect, useRef, createRef, memo } from 'react';
import { Constants, useMeeting, useParticipant, usePubSub, useWhiteboard } from '@videosdk.live/react-sdk';
import { BottomBar } from './components/BottomBar';
import { SidebarContainer } from '../components/sidebar/SidebarContainer';
import MemorizedParticipantView from './components/ParticipantView';
import { PresenterView } from '../components/PresenterView';
import { nameTructed, trimSnackBarText } from 'src/utils/helper';
import WaitingToJoinScreen from '../components/screens/WaitingToJoinScreen';
import ConfirmBox from '../components/ConfirmBox';
import useIsMobile from 'src/hooks/useIsMobile';
import useIsTab from 'src/hooks/useIsTab';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useMeetingAppContext } from '../MeetingAppContextDef';
import { sideBarModes } from 'src/utils/common';
import { Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

interface ParticipantMicStreamProps {
  participantId: string;
}

interface MeetingError {
  code: number;
  message: string;
}

interface MeetingContainerProps {
  onMeetingLeave: () => void;
  setIsMeetingLeft: (value: boolean) => void;
  meetingId: string;
  token: string;
  participantName: string;
  participantId?: string;
  videoSessionId?: string;
}

const ParticipantMicStream = memo(({ participantId }: ParticipantMicStreamProps) => {
  const { micStream, isLocal } = useParticipant(participantId);

  useEffect(() => {
    if (micStream && !isLocal) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      const audio = new Audio();
      audio.srcObject = mediaStream;
      audio.play().catch((err) => console.log('micStream.play() failed', err));
    }
  }, [micStream, isLocal]);

  return null;
});

ParticipantMicStream.displayName = 'ParticipantMicStream';

export function MeetingContainer({
  onMeetingLeave,
  setIsMeetingLeft,
  meetingId,
  token,
  participantName,
  participantId,
  videoSessionId,
}: MeetingContainerProps) {
  const playAudioSafely = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => {
      if (err?.name === 'AbortError') return;
      console.log('notification audio play failed', err);
    });
  };
  const {
    setSelectedMic,
    setSelectedWebcam,
    setSelectedSpeaker,
    useRaisedHandParticipants,
    sideBarMode,
    whiteboardOpen,
    whiteboardUrl,
    setWhiteboardOpen,
    setWhiteboardUrl,
    setUnreadChatCount,
    setChatMessages,
    setSideBarMode,

  } = useMeetingAppContext();

  const { enqueueSnackbar } = useSnackbar();

  const [participantsData, setParticipantsData] = useState<string[]>([]);
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] = useState<boolean | null>(
    null
  );
  const [meetingErrorVisible, setMeetingErrorVisible] = useState(false);
  const [meetingError, setMeetingError] = useState<MeetingError>({ code: 0, message: '' });
  const [entryRequest, setEntryRequest] = useState<{ participantId: string; name: string } | null>(null);

  const bottomBarHeight = 60;
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const mMeetingRef = useRef<any>(null);
  const containerRef = createRef<HTMLDivElement>();
  const containerHeightRef = useRef(containerHeight);
  const containerWidthRef = useRef(containerWidth);

  useEffect(() => {
    containerHeightRef.current = containerHeight;
    containerWidthRef.current = containerWidth;
  }, [containerHeight, containerWidth]);

  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const defaultSideBarContainerWidth = isXLDesktop
    ? 400
    : isLGDesktop
      ? 360
      : isTab
        ? 320
        : isMobile
          ? 250
          : 200;

  const sideBarContainerWidth =
    sideBarMode === sideBarModes.WHITEBOARD && containerWidth > 0 && !(isMobile || isTab)
      ? Math.round(containerWidth * 0.3)
      : defaultSideBarContainerWidth;

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);

  const { participantRaisedHand, participantLoweredHand } = useRaisedHandParticipants();

  const handleMeetingLeft = () => {
    setIsMeetingLeft(true);
  };

  const handleOnRecordingStateChanged = ({ status }: { status: string }) => {
    if (
      status === Constants.recordingEvents.RECORDING_STARTED ||
      status === Constants.recordingEvents.RECORDING_STOPPED
    ) {
      toast(
        `${status === Constants.recordingEvents.RECORDING_STARTED
          ? 'Meeting recording is started'
          : 'Meeting recording is stopped.'
        }`,
        {
          position: 'bottom-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    }
  };

  const onParticipantJoined = (participant: any) => {
    participant && participant.setQuality('high');
  };

  const onEntryRequested = (participantIdOrData: any, nameStr?: any) => {
    const participantId = typeof participantIdOrData === 'object' ? participantIdOrData.participantId : participantIdOrData;
    const name = typeof participantIdOrData === 'object' ? participantIdOrData.name : nameStr;
    console.log('[meeting-debug] onEntryRequested', { participantId, name });
    setEntryRequest({ participantId, name });

  };

  const onEntryResponded = (participantIdOrData: any, decisionStr?: any) => {
    const participantId = typeof participantIdOrData === 'object' ? participantIdOrData.participantId : participantIdOrData;
    const decision = typeof participantIdOrData === 'object' ? participantIdOrData.decision : decisionStr;

    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (decision === 'allowed') {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        enqueueSnackbar('تم رفض طلب دخولك للمقابلة.', { variant: 'error' });
        setTimeout(() => {
          onMeetingLeave();
        }, 3000);
      }
    }
  };

  const onMeetingJoined = () => {
    console.log('[meeting-debug] onMeetingJoined', {
      meetingId: (mMeetingRef.current as any)?.meetingId,
      localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
      localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
    });
    setLocalParticipantAllowedJoin(true);
  };

  const onMeetingLeft = () => {
    console.log('[meeting-debug] onMeetingLeft', {
      meetingId: (mMeetingRef.current as any)?.meetingId,
      localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
      localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
    });
    setSelectedMic({ id: null, label: null });
    setSelectedWebcam({ id: null, label: null });
    setSelectedSpeaker({ id: null, label: null });
    onMeetingLeave();
  };

  const handleOnError = (data: { code: number; message: string }) => {
    const { code, message } = data;
    console.log('[meeting-debug] meetingErr', {
      code,
      message,
      meetingId: (mMeetingRef.current as any)?.meetingId,
      localParticipantId: (mMeetingRef.current as any)?.localParticipant?.id,
      localDisplayName: (mMeetingRef.current as any)?.localParticipant?.displayName,
    });

    const joiningErrCodes = [4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];

    const isJoiningError = joiningErrCodes.findIndex((c) => c === code) !== -1;
    const isCriticalError = `${code}`.startsWith('500');

    new Audio(
      isCriticalError
        ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
        : `https://static.videosdk.live/prebuilt/notification_err.mp3`
    ).play();

    setMeetingErrorVisible(true);
    setMeetingError({
      code,
      message: isJoiningError ? 'Unable to join meeting!' : message,
    });
  };

  const mMeeting = useMeeting({
    onParticipantJoined,
    onEntryRequested,
    onEntryResponded,
    onMeetingJoined,
    onMeetingStateChanged: ({ state }: { state: string }) => {
      toast(`Meeting is in ${state} state`, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    onMeetingLeft,
    onError: ({ code, message }: { code: string; message: string }) =>
      handleOnError({ code: parseInt(code), message }),
    onRecordingStateChanged: handleOnRecordingStateChanged,
  });

  // أضف useRef لتتبع المشاركين السابقين
  const prevParticipantCountRef = useRef(0);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    let decodedPayload = null;
    try {
      if (token && token.includes('.')) {
        decodedPayload = JSON.parse(atob(token.split('.')[1]));
      }
    } catch (e) { }

    console.log('[meeting-debug] container.mounted', {
      meetingIdProp: meetingId,
      participantName,
      token,
      tokenPayload: decodedPayload ? {
        apikey: decodedPayload.apikey,
        permissions: decodedPayload.permissions,
        version: decodedPayload.version
      } : 'Invalid JWT'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // قم بتعديل useEffect الخاص بـ participants
  useEffect(() => {
    // فقط قم بالتحديث إذا تغير عدد المشاركين
    const currentCount = mMeeting.participants.size;
    if (currentCount !== prevParticipantCountRef.current) {
      prevParticipantCountRef.current = currentCount;
      const participantIds = Array.from(mMeeting.participants.keys());
      const participantsSummary = participantIds.map((id) => {
        const p = (mMeeting.participants.get(id) as any) ?? {};
        return { id, displayName: p.displayName, isLocal: p.isLocal };
      });
      console.log('[meeting-debug] participants.changed', {
        meetingId: (mMeeting as any)?.meetingId,
        localParticipantId: (mMeeting as any)?.localParticipant?.id,
        localDisplayName: (mMeeting as any)?.localParticipant?.displayName,
        count: currentCount,
        participantIds,
        participantsSummary,
      });
      setParticipantsData(participantIds);
    }
  }, [mMeeting.participants.size]); // استخدم .size بدلاً من الـ Map كاملاً
  const isPresenting = !!mMeeting.presenterId;
  const { whiteboardUrl: sdkWhiteboardUrl } = useWhiteboard();

  // Fallback: if SDK exposes the whiteboardUrl on guests, sync it into shared state
  // useEffect(() => {
  //   if (!sdkWhiteboardUrl) return;
  //   if (whiteboardUrl === sdkWhiteboardUrl) return;
  //   setWhiteboardUrl(sdkWhiteboardUrl);
  //   if (!whiteboardOpen) setWhiteboardOpen(true);
  // }, [sdkWhiteboardUrl, whiteboardOpen, whiteboardUrl, setWhiteboardOpen, setWhiteboardUrl]);

  // Share whiteboard OPEN/CLOSE state with everyone in the meeting
  usePubSub('WHITEBOARD_STATE', {
    onMessageReceived: (data: { message: string }) => {
      try {
        const parsed = JSON.parse(data.message || '{}') as { open?: boolean; url?: string | null };
        if (typeof parsed.open === 'boolean') setWhiteboardOpen(parsed.open);
        if (typeof parsed.url === 'string' || parsed.url === null) setWhiteboardUrl(parsed.url ?? null);
      } catch {
        /* ignore */
      }
    },
  });

  // useEffect(() => {
  //   const debounceTimeout = setTimeout(() => {
  //     const participantIds = Array.from(mMeeting.participants.keys());
  //     console.log('Debounced participantIds', participantIds);
  //     setParticipantsData(participantIds);
  //     console.log('Setting participants');
  //   }, 500);

  //   return () => clearTimeout(debounceTimeout);
  // }, [mMeeting.participants]);

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    // With joinWithoutUserInteraction={true}, the SDK handles join() internally.
    // We just need to track the progress.
    console.log('[meeting-debug] auto-join.initiation');
  }, []);

  usePubSub('RAISE_HAND', {
    onMessageReceived: (data: { senderId: string; senderName: string; message: string }) => {
      const localParticipantId = mMeeting?.localParticipant?.id;
      const { senderId, senderName, message } = data;
      const isLocal = senderId === localParticipantId;
      let action: 'raise' | 'lower' = 'raise';

      try {
        const parsed = JSON.parse(message || '{}') as { action?: 'raise' | 'lower' };
        if (parsed.action === 'lower') action = 'lower';
      } catch {
        action = 'raise';
      }

      if (action === 'lower') {
        participantLoweredHand(senderId);
        if (!isLocal) {
          toast(`${nameTructed(senderName, 15)} lowered hand`, {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        return;
      }

      playAudioSafely(`https://static.videosdk.live/prebuilt/notification.mp3`);

      toast(`${isLocal ? 'You' : nameTructed(senderName, 15)} raised hand 🖐🏼`, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      participantRaisedHand(senderId);
    },
  });

  const { messages: pubSubMessages } = usePubSub('CHAT', {
    onMessageReceived: (data: { senderId: string; senderName: string; message: string }) => {
      const localParticipantId = mMeeting?.localParticipant?.id;
      const { senderId, senderName, message } = data;
      const isLocal = senderId === localParticipantId;

      if (!isLocal) {
        new Audio(`https://static.videosdk.live/prebuilt/notification.mp3`).play();

        // Only show toast if chat panel is NOT open
        if (sideBarMode !== 'CHAT') {
          setUnreadChatCount((prev) => prev + 1);
          toast(`${trimSnackBarText(`${nameTructed(senderName, 15)} says: ${message}`)}`, {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
    },
  });

  // Sync VideoSDK messages with Global Context
  useEffect(() => {
    if (pubSubMessages) {
      setChatMessages(pubSubMessages);
    }
  }, [pubSubMessages, setChatMessages]);

  const showWaitingScreen =
    !meetingErrorVisible &&
    typeof localParticipantAllowedJoin !== 'boolean' &&
    (mMeeting as { isMeetingJoined?: boolean }).isMeetingJoined !== true;

  return (
    // <Box sx={{ position: 'fixed', inset: 0 }}>
    <Box sx={{ height: "100vh", mt: 12 }}>

      <Box
        ref={containerRef}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1c23' }}
      //         sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1c23' }}

      >
        {typeof localParticipantAllowedJoin === 'boolean' ? (
          localParticipantAllowedJoin ? (
            <>
              <Box sx={{ display: 'flex', height: '85%', flex: 1, flexDirection: 'row', bgcolor: '#1a1c23' }}>

                {isPresenting ? (
                  <>
                    <Box
                      sx={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PresenterView height={containerHeight - bottomBarHeight} />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        p: 1,
                      }}
                    >
                      <MemorizedParticipantView isPresenting={isPresenting} />
                    </Box>

                    {/* <Box
                      sx={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PresenterView height={containerHeight - bottomBarHeight} />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        p: 1,
                      }}
                    >
                      <MemorizedParticipantView isPresenting={isPresenting} />
                    </Box> */}
                  </>
                ) : whiteboardOpen ? (
                  <>
                    <Box
                      sx={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        p: 1,
                        // height: '100vh',
                      }}
                    >
                      <Paper
                        sx={{
                          flex: 1,
                          bgcolor: '#2a2d3a',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        {sdkWhiteboardUrl ? (
                          <Box
                            sx={{
                              width: '100%',
                              height: containerHeight - bottomBarHeight - 20,
                              bgcolor: 'white',
                            }}
                          >
                            <iframe
                              src={sdkWhiteboardUrl}
                              style={{ width: '100%', height: '90%', border: 0, display: 'block' }}
                              allow="clipboard-read; clipboard-write; fullscreen"
                            />
                          </Box>
                          // <Box
                          //   sx={{
                          //     position: 'relative',
                          //     width: '100%',
                          //     height: containerHeight - bottomBarHeight - 20,
                          //   }}
                          // >
                          //   <iframe
                          //     src={whiteboardUrl}
                          //     style={{
                          //       width: '100%',
                          //       height: '95%',
                          //       border: 0,
                          //     }}
                          //     onLoad={(e) => {
                          //       const iframe = e.currentTarget;

                          //       try {
                          //         const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

                          //         if (iframeDoc) {
                          //           iframeDoc.body.style.userSelect = 'none';
                          //         }
                          //       } catch {
                          //         // غالبًا هيترفض بسبب cross-origin
                          //       }
                          //     }}
                          //   />
                          //   // allow="clipboard-read; clipboard-write; fullscreen"


                          //   {/* طبقة تمنع التفاعل */}
                          //   <Box
                          //     sx={{
                          //       position: 'absolute',
                          //       inset: 0,
                          //       zIndex: 10,
                          //       background: 'transparent',
                          //       cursor: 'not-allowed',
                          //     }}
                          //   />
                          // </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: containerHeight - bottomBarHeight - 16,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'rgba(255,255,255,0.8)',
                            }}
                          >
                            Starting whiteboard…
                          </Box>
                        )}
                      </Paper>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        p: 1,
                      }}
                    >
                      <MemorizedParticipantView isPresenting={false} />
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <MemorizedParticipantView isPresenting={isPresenting} />
                  </Box>
                )}

                <SidebarContainer
                  height={containerHeight - bottomBarHeight}
                  sideBarContainerWidth={sideBarContainerWidth}
                />
              </Box>

              <BottomBar
                bottomBarHeight={bottomBarHeight}
                setIsMeetingLeft={setIsMeetingLeft}
              // videoSessionId={videoSessionId}
              />
            </>
          ) : null
        ) : showWaitingScreen ? (
          <WaitingToJoinScreen />
        ) : null}

        <ConfirmBox
          open={meetingErrorVisible}
          successText="OKAY"
          onSuccess={() => setMeetingErrorVisible(false)}
          title={`Error Code: ${meetingError.code}`}
          subTitle={meetingError.message}
        />

        <ConfirmBox
          open={!!entryRequest}
          successText="ALLOW"
          rejectText="DENY"
          onSuccess={() => {
            if (entryRequest) {
              const respond = (mMeeting as any).respondEntry || mMeetingRef.current?.respondEntry;
              if (respond) respond(entryRequest.participantId, 'allowed');
              setEntryRequest(null);
            }
          }}
          onReject={() => {
            if (entryRequest) {
              const respond = (mMeeting as any).respondEntry || mMeetingRef.current?.respondEntry;
              if (respond) respond(entryRequest.participantId, 'denied');
              setEntryRequest(null);
            }
          }}
          title="Join Request"
          subTitle={`${entryRequest?.name || 'Someone'} is requesting to join the meeting.`}
        />
      </Box>
    </Box>
  );
}
