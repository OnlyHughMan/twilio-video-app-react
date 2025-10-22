import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import ToggleAudioButton from './buttons/ToggleAudioButton';
import ToggleVideoButton from './buttons/ToggleVideoButton';
import ToggleScreenShareButton from './buttons/ToggleScreenShareButton';
import ToggleCaptionsButton from './buttons/ToggleCaptionsButton';
import EndCallButton from './buttons/EndCallButton';

export default function ModernMenuBar() {
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const participants = useParticipants();
  const { room, isSharingScreen } = useVideoContext();

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm">
      {isSharingScreen && (
        <Alert
          severity="info"
          className="mx-auto mb-3 max-w-4xl flex-row items-center justify-between gap-4 bg-brand/20 text-white"
          icon={false}
        >
          <Box className="flex flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <Typography variant="subtitle1" className="font-semibold text-white">
              You are sharing your screen
            </Typography>
            <div className="flex justify-end">
              <ToggleScreenShareButton />
            </div>
          </Box>
        </Alert>
      )}

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-white md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col text-sm text-gray-200">
          <span className="font-semibold text-white">{room?.name ?? 'Room'}</span>
          <span>
            {participants.length + 1} participant{participants.length ? 's' : ''}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <ToggleAudioButton disabled={isReconnecting} />
          <ToggleVideoButton disabled={isReconnecting} />
          <ToggleCaptionsButton disabled={isReconnecting} />
          <ToggleScreenShareButton disabled={isReconnecting || isSharingScreen} />
        </div>

        <div className="flex justify-end">
          <EndCallButton />
        </div>
      </div>
    </footer>
  );
}
