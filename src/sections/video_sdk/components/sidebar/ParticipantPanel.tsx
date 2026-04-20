import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useMemo } from 'react';
import { nameTructed } from 'src/utils/helper';
import { Box, Paper, Typography, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicOnIcon from '../../icons/Bottombar/MicOnIcon';
import MicOffIcon from '../../icons/Bottombar/MicOffIcon';
import WebcamOffIcon from '../../icons/Bottombar/WebcamOffIcon';
import WebcamOnIcon from '../../icons/Bottombar/WebcamOnIcon';
import RaiseHandIcon from '../../icons/Bottombar/RaiseHandIcon';
import { useMeetingAppContext } from '../../MeetingAppContextDef';

interface ParticipantListItemProps {
  participantId: string;
  raisedHand: boolean;
}

interface RaisedHandParticipant {
  participantId: string;
  raisedHandOn: number;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: 8,
  marginLeft: 8,
  marginRight: 8,
  padding: 8,
  backgroundColor: '#3a3d4a',
  borderRadius: 8,
  marginBottom: 0,
}));

const ParticipantListItem: React.FC<ParticipantListItemProps> = ({ participantId, raisedHand }) => {
  const { micOn, webcamOn, displayName, isLocal } = useParticipant(participantId);

  return (
    <StyledPaper>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#757575',
            width: 40,
            height: 40,
            fontSize: '1.25rem',
          }}
        >
          {displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, ml: 1, mr: 0.5 }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '1rem',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
              textOverflow: 'ellipsis',
            }}
          >
            {isLocal ? 'You' : nameTructed(displayName, 15)}
          </Typography>
        </Box>
        {raisedHand && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 0.5, p: 0.5 }}
          >
            <RaiseHandIcon />
          </Box>
        )}
        <Box sx={{ m: 0.5, p: 0.5 }}>{micOn ? <MicOnIcon /> : <MicOffIcon />}</Box>
        <Box sx={{ m: 0.5, p: 0.5 }}>{webcamOn ? <WebcamOnIcon /> : <WebcamOffIcon />}</Box>
      </Box>
    </StyledPaper>
  );
};

export function ParticipantPanel({ panelHeight }: { panelHeight: number }) {
  const { raisedHandsParticipants } = useMeetingAppContext();
  const mMeeting = useMeeting();
  const participants = mMeeting.participants;

  const uniqueParticipantIds = useMemo(() => {
    const participantIds = [...participants.keys()];
    const seenNames = new Set<string>();
    const localId = mMeeting.localParticipant?.id;
    const localName = mMeeting.localParticipant?.displayName?.trim().toLowerCase();

    return participantIds.filter((participantId) => {
      const participant = participants.get(participantId) as any;
      const name = participant?.displayName?.trim().toLowerCase();

      if (participantId === localId) {
        return true;
      }

      if (name && localName && name === localName) {
        return false; // تعليق: تجاهل التكرار الذي يمتلك نفس اسم المستخدم المحلي
      }

      if (name && seenNames.has(name)) {
        return false;
      }

      if (name) {
        seenNames.add(name);
      }
      return true;
    });
  }, [participants, mMeeting.localParticipant]);

  const uniqueIds = useMemo(() => {
    const participantIds = [...participants.keys()];
    const seenNames = new Set<string>();
    const localId = mMeeting.localParticipant?.id;
    const localName = mMeeting.localParticipant?.displayName?.trim().toLowerCase();

    return participantIds.filter((participantId) => {
      const participant = participants.get(participantId) as any;
      const name = participant?.displayName?.trim().toLowerCase();

      if (participantId === localId) {
        return true;
      }

      if (name && localName && name === localName) {
        return false; // تعليق: تجاهل التكرار الذي يمتلك نفس اسم المستخدم المحلي
      }

      if (name && seenNames.has(name)) {
        return false;
      }

      if (name) {
        seenNames.add(name);
      }
      return true;
    });
  }, [participants, mMeeting.localParticipant]);

  const sortedRaisedHandsParticipants = useMemo(() => {
    const notRaised = uniqueIds.filter(
      (pID) =>
        raisedHandsParticipants.findIndex(
          ({ participantId: rPID }: RaisedHandParticipant) => rPID === pID
        ) === -1
    );

    const raisedSorted = [...raisedHandsParticipants].sort(
      (a: RaisedHandParticipant, b: RaisedHandParticipant) => {
        if (a.raisedHandOn > b.raisedHandOn) return -1;
        if (a.raisedHandOn < b.raisedHandOn) return 1;
        return 0;
      }
    );

    const combined = [
      ...raisedSorted
        .map(({ participantId: p }: RaisedHandParticipant) => ({
          raisedHand: true,
          participantId: p,
        }))
        .filter((item) => uniqueParticipantIds.includes(item.participantId)),
      ...notRaised.map((p) => ({ raisedHand: false, participantId: p })),
    ];

    return combined;
  }, [raisedHandsParticipants, uniqueParticipantIds]);

  const part = useMemo(() => sortedRaisedHandsParticipants, [sortedRaisedHandsParticipants]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        bgcolor: '#2a2d3a',
        overflowY: 'auto',
        height: panelHeight,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: panelHeight - 100 }}>
        {uniqueIds.map((participantId: string, index: number) => {
          const item = part[index];
          if (!item) return null;
          const { raisedHand, participantId: peerId } = item;
          return (
            <ParticipantListItem key={peerId} participantId={peerId} raisedHand={raisedHand} />
          );
        })}
      </Box>
    </Box>
  );
}
