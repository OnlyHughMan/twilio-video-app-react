import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import { useAppState } from '../../../state';

type Props = {
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
};

export default function ToggleCaptionsButton({ disabled, variant = 'contained' }: Props) {
  const { isCaptionsEnabled, setIsCaptionsEnabled } = useAppState();

  const toggleCaptions = useCallback(() => {
    setIsCaptionsEnabled(enabled => !enabled);
  }, [setIsCaptionsEnabled]);

  const tooltipTitle = isCaptionsEnabled
    ? 'Hide real-time captions'
    : 'Show captions (requires Real-Time Transcriptions)';

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <span>
        <Button
          onClick={toggleCaptions}
          disabled={disabled}
          startIcon={isCaptionsEnabled ? <ClosedCaptionIcon /> : <ClosedCaptionDisabledIcon />}
          variant={variant}
          color={isCaptionsEnabled ? 'primary' : 'secondary'}
          sx={{ textTransform: 'none' }}
          data-cy="toggle-captions"
        >
          {isCaptionsEnabled ? 'Hide Captions' : 'Show Captions'}
        </Button>
      </span>
    </Tooltip>
  );
}
