import React from 'react';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

type Props = {
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
};

export default function ToggleAudioButton({ disabled, variant = 'contained' }: Props) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

  const label = !hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute';

  return (
    <Button
      color={isAudioEnabled ? 'primary' : 'error'}
      onClick={toggleAudioEnabled}
      disabled={!hasAudioTrack || disabled}
      startIcon={isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
      variant={variant}
      sx={{ textTransform: 'none' }}
      data-cy-audio-toggle
    >
      {label}
    </Button>
  );
}
