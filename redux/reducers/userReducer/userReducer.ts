import { GET_USER, SAVE_USER } from './userTypes';

const initialState = { 'user': { 'userId': null, 'firstName': '', 'lastName': '', 'email': '', 'newUser': false } };

export const userReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_USER: {
      const newUserStatus = Object.assign(state.user, { ...action.payload });
      return {
        ...state,
        'user': { ...newUserStatus, 'userId': action.payload.userId, 'firstName': action.payload.firstName, 'lastName': action.payload.lastName, 'email': action.payload.email, 'newUser': action.payload.newUser }
      };
    }
    case GET_USER:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
