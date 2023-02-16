import { GET_ROOMS_PARTICIPANT_ZOOM_DATA, SAVE_ROOMS_PARTICIPANT_ZOOM_DATA } from './roomsParticipantZoomDataTypes';

const initialState = {};

export const roomsParticipantZoomDataReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_ROOMS_PARTICIPANT_ZOOM_DATA:
      return {
        ...state,
        ...action.payload
      };
    case GET_ROOMS_PARTICIPANT_ZOOM_DATA:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
