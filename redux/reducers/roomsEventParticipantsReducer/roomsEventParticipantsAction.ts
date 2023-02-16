import { GET_ROOMS_EVENT_PARTICIPANTS, SAVE_ROOMS_EVENT_PARTICIPANTS } from './roomsEventParticipantsTypes';

export const saveRoomsEventParticipants = (roomsEventParticipants: any) => ({
  'type': SAVE_ROOMS_EVENT_PARTICIPANTS,
  'payload': roomsEventParticipants
});

export const getRoomsEventParticipants = () => ({
  'type': GET_ROOMS_EVENT_PARTICIPANTS
});
