import { GET_ROOMS_PARTICIPANT_ZOOM_DATA, SAVE_ROOMS_PARTICIPANT_ZOOM_DATA } from './roomsParticipantZoomDataTypes';

export const saveRoomsParticipantZoomData = (roomsParticipantZoomData: any) => ({
  'type': SAVE_ROOMS_PARTICIPANT_ZOOM_DATA,
  'payload': roomsParticipantZoomData
});

export const getRoomsParticipantZoomData = () => ({
  'type': GET_ROOMS_PARTICIPANT_ZOOM_DATA
});
