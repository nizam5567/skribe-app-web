import { GET_ROOMS_MEETING_DATA, SAVE_ROOMS_MEETING_DATA } from './roomsMeetingDataTypes';

const initialState = {};

export const roomsMeetingDataReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_ROOMS_MEETING_DATA:
      return {
        ...state,
        ...action.payload
      };
    case GET_ROOMS_MEETING_DATA:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
