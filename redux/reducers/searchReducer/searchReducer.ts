import { switchClasses } from '@mui/material';
import { GET_SEARCH_MATTER_ID, GET_SEARCH_TEXT, SAVE_SEARCH_MATTER_ID, SAVE_SEARCH_TEXT } from './searchTypes';

const initialState = { 'searchText': '', 'searchMatterId': null };

export const searchReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_SEARCH_TEXT:
      return {
        ...state,
        'searchText': action.payload
      };
    case SAVE_SEARCH_MATTER_ID:
      return {
        ...state,
        'searchMatterId': action.payload
      };
    case GET_SEARCH_MATTER_ID:
      return {
        ...state
      };
    case GET_SEARCH_TEXT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
