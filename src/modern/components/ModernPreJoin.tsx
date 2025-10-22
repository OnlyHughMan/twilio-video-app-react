import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../state';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import ToggleAudioButton from './buttons/ToggleAudioButton';
import ToggleVideoButton from './buttons/ToggleVideoButton';
import LocalPreview from './LocalPreview';

export default function ModernPreJoin() {
  const { getToken, isFetching, error, setError, user } = useAppState();
  const { connect: videoConnect, getAudioAndVideoTracks, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const { connect: chatConnect } = useChatContext();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [roomName, setRoomName] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('room') ?? '';
  });
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  useEffect(() => {
    getAudioAndVideoTracks()
      .then(() => setIsPreviewReady(true))
      .catch(previewError => {
        console.error('Error acquiring local media tracks', previewError);
        setError(previewError);
      });
    // We only want to run this once when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const { token } = await getToken(displayName, roomName);
        await videoConnect(token);
        if (process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true') {
          await chatConnect(token);
        }
      } catch (joinError) {
        setError(joinError as Error);
      }
    },
    [chatConnect, displayName, getToken, roomName, setError, videoConnect]
  );

  const disableActions = isFetching || isAcquiringLocalTracks || isConnecting;

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 py-10 text-white">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-2 text-center">
          <Typography variant="h4" className="font-semibold text-white">
            Join your Twilio Video room
          </Typography>
          <Typography variant="subtitle1" className="text-gray-300">
            Configure your audio and video devices before you join the conversation.
          </Typography>
        </header>

        {(isAcquiringLocalTracks || (!isPreviewReady && !error)) && (
          <div className="flex w-full justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <LocalPreview identity={displayName} />
            <div className="flex flex-wrap gap-3">
              <ToggleAudioButton disabled={disableActions} />
              <ToggleVideoButton disabled={disableActions} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl"
          >
            <Stack spacing={3}>
              <TextField
                label="Display name"
                value={displayName}
                onChange={event => setDisplayName(event.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Room name"
                value={roomName}
                onChange={event => setRoomName(event.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>

            {error && (
              <Alert severity="error" variant="filled" onClose={() => setError(null)}>
                {error.message || 'Unable to join the room. Please try again.'}
              </Alert>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="submit" variant="contained" color="primary" disabled={disableActions} data-cy-join-now>
                {disableActions ? 'Connecting…' : 'Join now'}
              </Button>
              <Button variant="text" color="inherit" disabled={disableActions} onClick={() => setDisplayName('')}>
                Clear name
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
