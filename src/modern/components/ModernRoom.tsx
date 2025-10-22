import React, { useMemo } from 'react';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import ParticipantTile from './ParticipantTile';
import ModernMenuBar from './ModernMenuBar';
import { ParticipantAudioTracks } from '../../components/ParticipantAudioTracks/ParticipantAudioTracks';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

export default function ModernRoom() {
  const { room, isSharingScreen } = useVideoContext();
  const roomState = useRoomState();
  const participants = useParticipants();
  const screenShareParticipant = useScreenShareParticipant();
  const localParticipant = room?.localParticipant ?? null;

  const allParticipants = useMemo(() => {
    const remoteParticipants = participants.map(participant => ({
      participant,
      highlight: participant === screenShareParticipant,
    }));

    return [
      ...(localParticipant ? [{ participant: localParticipant, highlight: isSharingScreen }] : []),
      ...remoteParticipants,
    ];
  }, [participants, localParticipant, screenShareParticipant, isSharingScreen]);

  if (!room || roomState === 'disconnected') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-white">
        <p className="text-lg font-semibold">Connect to a room to start collaborating.</p>
        <p className="max-w-xl text-sm text-gray-300">
          You can join a Twilio Video room from the pre-join screen. Once connected, all participants and screen shares
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="grid flex-1 gap-4 overflow-y-auto px-6 pb-44 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {allParticipants.map(({ participant, highlight }) => (
          <ParticipantTile
            key={participant.sid}
            participant={participant}
            isLocal={participant === localParticipant}
            highlight={highlight}
          />
        ))}
      </div>
      <ParticipantAudioTracks />
      <ModernMenuBar />
    </div>
  );
}
