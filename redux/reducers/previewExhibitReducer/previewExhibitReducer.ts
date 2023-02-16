import { GET_EXHIBIT_TO_PREVIEW, SAVE_EXHIBIT_TO_PREVIEW } from './previewExhibitTypes';

const initialState = { 'previewExhibit': {} };

export const previewExhibitReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_EXHIBIT_TO_PREVIEW:
      return {
        ...state,
        'previewExhibit': action.payload
      };
    case GET_EXHIBIT_TO_PREVIEW:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
