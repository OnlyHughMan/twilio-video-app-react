import React from 'react';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

type Props = {
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
};

export default function ToggleVideoButton({ disabled, variant = 'contained' }: Props) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const { localTracks } = useVideoContext();
  const hasVideoTrack = localTracks.some(track => track.kind === 'video');

  const label = !hasVideoTrack ? 'No Video' : isVideoEnabled ? 'Stop Video' : 'Start Video';

  return (
    <Button
      color={isVideoEnabled ? 'primary' : 'warning'}
      onClick={toggleVideoEnabled}
      disabled={!hasVideoTrack || disabled}
      startIcon={isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
      variant={variant}
      sx={{ textTransform: 'none' }}
      data-cy-video-toggle
    >
      {label}
    </Button>
  );
}
