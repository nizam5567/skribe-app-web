import { GET_ROOMS_CURRENT_PARTICIPANT, SAVE_ROOMS_CURRENT_PARTICIPANT } from './roomsCurrentParticipantTypes';

const initialState = {};

export const roomsCurrentParticipantReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_ROOMS_CURRENT_PARTICIPANT:
      return {
        ...state,
        ...action.payload
      };
    case GET_ROOMS_CURRENT_PARTICIPANT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
