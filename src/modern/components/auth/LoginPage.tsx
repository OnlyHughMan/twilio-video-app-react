import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from '@tanstack/react-router';
import { useAppState } from '../../../state';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, isAuthReady } = useAppState();
  const requiresAuth = Boolean(process.env.REACT_APP_SET_AUTH);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);

  const handleSuccess = useCallback(() => {
    router.navigate({ to: '/' }).catch(() => undefined);
  }, [router]);

  const handleSignIn = useCallback(async () => {
    setAuthError(null);
    try {
      await signIn?.(passcode || undefined);
      handleSuccess();
    } catch (err) {
      setAuthError(err as Error);
    }
  }, [handleSuccess, passcode, signIn]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await handleSignIn();
    },
    [handleSignIn]
  );

  useEffect(() => {
    if (!requiresAuth || user) {
      handleSuccess();
    }
  }, [handleSuccess, requiresAuth, user]);

  if (!requiresAuth || user) {
    return null;
  }

  if (!isAuthReady) {
    return null;
  }

  const isPasscodeFlow = process.env.REACT_APP_SET_AUTH === 'passcode';

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 text-white shadow-2xl backdrop-blur">
        <Stack spacing={3}>
          <Typography variant="h4" className="text-center font-semibold text-white">
            Sign in to continue
          </Typography>
          {isPasscodeFlow ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField
                label="Passcode"
                type="password"
                value={passcode}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPasscode(event.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              {authError && (
                <Alert severity="error" variant="filled">
                  {authError.message}
                </Alert>
              )}
              <Button type="submit" variant="contained" color="primary" disabled={!passcode.length}>
                Enter room
              </Button>
            </form>
          ) : (
            <Stack spacing={2} alignItems="stretch">
              <Typography variant="body1" className="text-gray-300">
                Sign in with your configured provider to access rooms.
              </Typography>
              {authError && (
                <Alert severity="error" variant="filled">
                  {authError.message}
                </Alert>
              )}
              <Button variant="contained" color="primary" onClick={handleSignIn}>
                Continue with your account
              </Button>
            </Stack>
          )}
        </Stack>
      </div>
    </div>
  );
}
