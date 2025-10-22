import React from 'react';
import Typography from '@mui/material/Typography';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from './VideoTrack';

export default function LocalPreview({ identity }: { identity: string }) {
  const { localTracks } = useVideoContext();
  const videoTrack = localTracks.find(
    track => track.kind === 'video' && !track.name.includes('screen')
  ) as LocalVideoTrack;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 pb-[56.25%]">
      <div className="absolute inset-0">
        {videoTrack ? (
          <VideoTrack track={videoTrack} isLocal />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <span className="text-2xl font-semibold">Camera preview unavailable</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1 text-sm text-white">
        <Typography variant="body2" className="text-white">
          {identity || 'You'}
        </Typography>
      </div>
    </div>
  );
}
