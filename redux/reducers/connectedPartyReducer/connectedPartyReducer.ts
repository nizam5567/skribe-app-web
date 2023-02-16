import { PartyResponse } from '../../../openapi';
import ActionObject from '../../types/reduxTypes';

const STORE_PARTIES = 'STORE_PARTIES';
const CREATE_PARTY = 'CREATE_PARTY';
const UPDATE_PARTY = 'UPDATE_PARTY';
const DELETE_PARTY = 'DELETE_PARTY';
const CLEAR_PARTIES = 'CLEAR_PARTIES';
interface PartiesState {
  party?: any[]
}

const initialState: PartiesState = {
  'party': undefined
};

export function doStoreParties (party: any[]) {
  return {
    'type': STORE_PARTIES,
    'payload': party
  };
}

export function doCreateParty (party: any) {
  return {
    'type': CREATE_PARTY,
    'payload': party
  };
}

export function doUpdateParty (party: any) {
  return {
    'type': UPDATE_PARTY,
    'payload': party
  };
}

export function doDeleteParty (partyId: any['partyId']) {
  return {
    'type': DELETE_PARTY,
    'payload': partyId
  };
}

export function doClearStore () {
  return {
    'type': CLEAR_PARTIES,
    'payload': undefined
  };
}

export default function partyReducer (state: PartiesState = initialState, action: ActionObject): PartiesState {
  switch (action.type) {
    case STORE_PARTIES:
      return {
        ...state,
        'party': action.payload
      };
    case CREATE_PARTY:
      return {
        ...state,
        'party': state.party ? [...state.party, action.payload] : [action.payload]
      };
    case UPDATE_PARTY:
      return {
        ...state,
        'party': state.party?.map((party) => (party.partyId === action.payload.partyId ? { ...party, ...action.payload } : party))
      };
    case DELETE_PARTY:
      return {
        ...state,
        'party': state.party?.filter((party) => party.partyId !== action.payload)
      };
    case CLEAR_PARTIES:
      return initialState;
    default:
      return state;
  }
}
