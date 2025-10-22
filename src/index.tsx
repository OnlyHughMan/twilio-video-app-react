import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import AppStateProvider, { useAppState } from './state';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import { ChatProvider } from './components/ChatProvider';
import { ParticipantProvider } from './components/ParticipantProvider';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import ModernApp from './modern/ModernApp';
import theme from './theme';
import './index.css';

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ParticipantProvider>
        <ChatProvider>
          <ModernApp />
          <ErrorDialog dismissError={() => setError(null)} error={error} />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};

const Root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <AppStateProvider>
        <VideoApp />
      </AppStateProvider>
    </UnsupportedBrowserWarning>
  </ThemeProvider>
);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
