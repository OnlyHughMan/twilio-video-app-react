import React from 'react';
import Typography from '@mui/material/Typography';
import { Participant, Track } from 'twilio-video';
import usePublications from '../../hooks/usePublications/usePublications';
import Publication from './Publication';

type Props = {
  participant: Participant;
  isLocal?: boolean;
  highlight?: boolean;
};

export default function ParticipantTile({ participant, isLocal, highlight }: Props) {
  const publications = usePublications(participant);
  const sortedPublications = publications.filter(pub => pub.kind === 'video');

  return (
    <div
      className={`relative flex h-64 w-full flex-col overflow-hidden rounded-xl border border-white/20 bg-zinc-900 shadow-lg ${
        highlight ? 'ring-2 ring-brand' : ''
      }`}
    >
      <div className="flex-1 overflow-hidden">
        {sortedPublications.map(publication => (
          <Publication
            key={publication.trackSid ?? publication.trackName}
            publication={publication}
            participant={participant}
            isLocalParticipant={isLocal}
            videoPriority={'standard' as Track.Priority}
          />
        ))}
      </div>
      <div className="bg-black/60 px-3 py-2 text-sm text-white">
        <Typography variant="body2" className="truncate text-white">
          {participant.identity}
          {isLocal ? ' (You)' : ''}
        </Typography>
      </div>
    </div>
  );
}
