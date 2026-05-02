'use client';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MeetingAppProvider } from './MeetingAppContextDef';
import { MeetingContainer } from './meeting/MeetingContainer';
import { LeaveScreen } from './components/screens/LeaveScreen';
import { JoiningScreen } from './components/screens/JoiningScreen';
import { getProfile } from 'src/actions/api';

interface AppProps {
  videoSessionId?: string;
}

function App({ videoSessionId: propVideoSessionId }: AppProps) {
  const params = useParams();
  const videoSessionId = propVideoSessionId || (params?.videoSessionId as string);

  const [token, setToken] = useState<string>('');
  const [meetingId, setMeetingId] = useState<string>('');
  const [participantName, setParticipantName] = useState<string>('');
  const [participantId, setParticipantId] = useState<string>('');
  const [micOn, setMicOn] = useState<boolean>(false);
  const [webcamOn, setWebcamOn] = useState<boolean>(false);
  const [customAudioStream, setCustomAudioStream] = useState<MediaStream | null>(null);
  const [customVideoStream, setCustomVideoStream] = useState<MediaStream | null>(null);
  const [isMeetingStarted, setMeetingStarted] = useState<boolean>(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState<boolean>(false);

  // const isMobile: boolean = window.matchMedia('only screen and (max-width: 768px)').matches;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('only screen and (max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);
  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return 'Are you sure you want to exit?';
      };
    }
  }, [isMobile]);


  return (
    <>
      <MeetingAppProvider>
        {isMeetingStarted ? (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName || 'Guest',
              multiStream: true,
              debugMode: false,
              customCameraVideoTrack: customVideoStream ?? undefined,
              customMicrophoneAudioTrack: customAudioStream ?? undefined,
              participantId: participantId || undefined,

            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >

            <MeetingContainer
              meetingId={meetingId}
              token={token}
              participantName={participantName || 'Guest'}
              participantId={participantId}
              onMeetingLeave={() => {
                setToken('');
                setMeetingId('');
                setParticipantName('');
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
            />
          </MeetingProvider>
        ) : isMeetingLeft ? (
          <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
        ) : (
          <JoiningScreen
            videoSessionId={videoSessionId}
            participantName={participantName}
            participantId={participantId}
            setParticipantName={setParticipantName}
            setParticipantId={setParticipantId}
            setMeetingId={setMeetingId}
            setToken={setToken}

            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            customAudioStream={customAudioStream}
            setCustomAudioStream={setCustomAudioStream}
            customVideoStream={customVideoStream}
            setCustomVideoStream={setCustomVideoStream}
            onClickStartMeeting={(explicitToken?: string, explicitMeetingId?: string, explicitName?: string, explicitId?: string) => {
              const activeToken = explicitToken || token;
              const activeMeetingId = explicitMeetingId || meetingId;
              const activeName = explicitName || participantName;
              const activeId = explicitId || participantId;

              console.log('[meeting-debug] startNow click', {
                token: activeToken ? `${activeToken.substring(0, 15)}...${activeToken.substring(activeToken.length - 15)}` : 'NULL',
                meetingId: activeMeetingId,
                participantName: activeName,
                participantId: activeId,
              });

              if (!activeToken || !activeMeetingId) {
                alert("Meeting ID or Token is missing.");
                return;
              }

              if (!activeId || !activeName) {
                alert("User identity not verified. Please wait for profile data.");
                return;
              }

              // Basic JWT validation (VideoSDK tokens are JWTs)
              const isJwt = activeToken && activeToken.startsWith('eyJ') && activeToken.split('.').length === 3;

              if (!isJwt) {
                console.error('[meeting-debug] Invalid token format (not a JWT)', { activeToken });
                alert("Received an invalid meeting token from the server. Please contact support.");
                return;
              }

              console.log('[meeting-debug] Validation passed, starting meeting...');
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        )}
      </MeetingAppProvider>
    </>
  );
}

export default App;
