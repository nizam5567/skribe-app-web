import { CLOSE_MODAL, OPEN_MODAL } from './modalTypes';

const initialState = { 'modalStatus': false, 'modalName': '' };

export const modalReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        'modalStatus': true,
        'modalName': action.payload
      };
    case CLOSE_MODAL:
      return {
        ...state,
        'modalStatus': false,
        'modalName': ''
      };
    default:
      return {
        ...state
      };
  }
};
