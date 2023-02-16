import { GET_ROOMS_CURRENT_PARTICIPANT, SAVE_ROOMS_CURRENT_PARTICIPANT } from './roomsCurrentParticipantTypes';

export const saveRoomsCurrentParticipant = (roomsCurrentParticipant: any) => ({
  'type': SAVE_ROOMS_CURRENT_PARTICIPANT,
  'payload': roomsCurrentParticipant
});

export const getRoomsCurrentParticipant = () => ({
  'type': GET_ROOMS_CURRENT_PARTICIPANT
});
