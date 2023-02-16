import { GET_ROOMS_MEETING_DATA, SAVE_ROOMS_MEETING_DATA } from './roomsMeetingDataTypes';

export const saveRoomsMeetingData = (roomsMeetingData: any) => ({
  'type': SAVE_ROOMS_MEETING_DATA,
  'payload': roomsMeetingData
});

export const getRoomsMeetingData = () => ({
  'type': GET_ROOMS_MEETING_DATA
});
