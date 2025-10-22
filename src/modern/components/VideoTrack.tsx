import React, { useEffect, useRef } from 'react';
import { Track } from 'twilio-video';
import { IVideoTrack } from '../../types';
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';

type Props = {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
};

export default function VideoTrack({ track, isLocal, priority }: Props) {
  const ref = useRef<HTMLVideoElement>(null!);
  const mediaStreamTrack = useMediaStreamTrack(track);
  const dimensions = useVideoTrackDimensions(track);
  const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return () => {
      track.detach(el);
      el.srcObject = null;
      if (track.setPriority && priority) {
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  const isFrontFacing = mediaStreamTrack?.getSettings().facingMode !== 'environment';
  const style: React.CSSProperties = {
    transform: isLocal && isFrontFacing ? 'scaleX(-1)' : undefined,
    objectFit: isPortrait || track.name.includes('screen') ? 'contain' : 'cover',
  };

  return <video ref={ref} style={style} className="h-full w-full rounded-lg bg-black" />;
}
