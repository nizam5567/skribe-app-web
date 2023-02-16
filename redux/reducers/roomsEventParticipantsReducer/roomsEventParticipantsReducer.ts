import { GET_ROOMS_EVENT_PARTICIPANTS, SAVE_ROOMS_EVENT_PARTICIPANTS } from './roomsEventParticipantsTypes';

const initialState = {};

export const roomsEventParticipantsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_ROOMS_EVENT_PARTICIPANTS:
      return {
        ...state,
        ...action.payload
      };
    case GET_ROOMS_EVENT_PARTICIPANTS:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
