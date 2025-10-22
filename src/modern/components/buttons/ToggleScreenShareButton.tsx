import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ToggleScreenShareButton({ disabled }: { disabled?: boolean }) {
  const screenShareParticipant = useScreenShareParticipant();
  const { toggleScreenShare, isSharingScreen } = useVideoContext();
  const isScreenShareSupported = Boolean(navigator.mediaDevices?.getDisplayMedia);
  const isAnotherSharing = Boolean(screenShareParticipant && !isSharingScreen);
  const isDisabled = disabled || !isScreenShareSupported || isAnotherSharing;

  const tooltipMessage = !isScreenShareSupported
    ? 'Screen sharing is not supported with this browser'
    : isAnotherSharing
    ? 'Cannot share screen when another user is sharing'
    : isSharingScreen
    ? 'Stop sharing your screen'
    : 'Share your screen with the room';

  return (
    <Tooltip title={tooltipMessage} placement="top">
      <span>
        <Button
          onClick={toggleScreenShare}
          disabled={isDisabled}
          startIcon={isSharingScreen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
          variant="contained"
          color={isSharingScreen ? 'error' : 'primary'}
          sx={{ textTransform: 'none' }}
          data-cy-share-screen
        >
          {isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
        </Button>
      </span>
    </Tooltip>
  );
}
