import React from 'react';
import { LocalTrackPublication, Participant, RemoteTrackPublication, Track } from 'twilio-video';
import useTrack from '../../hooks/useTrack/useTrack';
import VideoTrack from './VideoTrack';
import { IVideoTrack } from '../../types';

type Props = {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocalParticipant?: boolean;
  videoPriority?: Track.Priority | null;
};

export default function Publication({ publication, isLocalParticipant, videoPriority }: Props) {
  const track = useTrack(publication);

  if (!track) return null;

  if (track.kind === 'video') {
    return (
      <VideoTrack
        track={track as IVideoTrack}
        priority={videoPriority}
        isLocal={!track.name.includes('screen') && isLocalParticipant}
      />
    );
  }

  return null;
}
