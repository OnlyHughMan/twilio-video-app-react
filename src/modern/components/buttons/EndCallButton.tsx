import React from 'react';
import Button from '@mui/material/Button';
import CallEndIcon from '@mui/icons-material/CallEnd';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function EndCallButton() {
  const { room } = useVideoContext();

  return (
    <Button
      onClick={() => room?.disconnect()}
      color="error"
      variant="contained"
      startIcon={<CallEndIcon />}
      sx={{ textTransform: 'none' }}
      data-cy-disconnect
    >
      Leave Room
    </Button>
  );
}
