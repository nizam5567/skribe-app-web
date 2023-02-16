import ActionObject from '../../types/reduxTypes';

const SET_ROLE = 'SET_ROLE';
const CLEAR_STORE = 'CLEAR_STORE';

interface RoomParticipantState {
  role: any
}

const initialState: RoomParticipantState = {
  'role': undefined
};

export function setRole (role: string) {
  return {
    'type': SET_ROLE,
    'payload': role
  };
}

export function doClearStore () {
  return {
    'type': CLEAR_STORE,
    'payload': undefined
  };
}

export default function roomParticipantReducer (state: RoomParticipantState = initialState, action: ActionObject): RoomParticipantState {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        'role': action.payload
      };
    case CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
}
