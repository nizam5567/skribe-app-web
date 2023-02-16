import { PartyResponse, TenantResponse } from '../../../openapi';
import ActionObject from '../../types/reduxTypes';

const STORE_PARTIES = 'STORE_PARTIES';
const STORE_CONNECTED_PARTIES = 'STORE_CONNECTED_PARTIES';
const STORE_CONNECTED_PARTY = 'STORE_CONNECTED_PARTY';
const CREATE_CONNECTED_PARTY = 'CREATE_CONNECTED_PARTY';
const SCHEDULING_PARTY_ID = 'SCHEDULING_PARTY_ID';
const STORE_PARTY = 'STORE_PARTY';
const CREATE_PARTY = 'CREATE_PARTY';
const UPDATE_PARTY = 'UPDATE_PARTY';
const DELETE_PARTY = 'DELETE_PARTY';
const CLEAR_PARTIES = 'CLEAR_PARTIES';

interface PartysState {
  parties?: PartyResponse[]
  party?: PartyResponse
  connectedParties?: TenantResponse[]
  connectedParty?: TenantResponse
  schedulingPartyId: number | undefined
}

const initialState: PartysState = {
  'parties': undefined,
  'party': undefined,
  'connectedParties': undefined,
  'connectedParty': undefined,
  'schedulingPartyId': undefined
};

export function doStoreParties (parties: PartyResponse[]) {
  return {
    'type': STORE_PARTIES,
    'payload': parties
  };
}
export function doStoreSchedulingPartyId (partyid: number) {
  return {
    'type': SCHEDULING_PARTY_ID,
    'payload': partyid
  };
}

export function doStoreConnectedParties (parties: TenantResponse[]) {
  return {
    'type': STORE_CONNECTED_PARTIES,
    'payload': parties
  };
}

export function doStoreConnectedParty (party: TenantResponse[]) {
  return {
    'type': STORE_CONNECTED_PARTY,
    'payload': party
  };
}

export function doCreateParty (party: PartyResponse) {
  return {
    'type': CREATE_PARTY,
    'payload': party
  };
}

export function doCreateConnectedParty (party: TenantResponse) {
  return {
    'type': CREATE_CONNECTED_PARTY,
    'payload': party
  };
}

export function doUpdateParty (party: PartyResponse) {
  return {
    'type': UPDATE_PARTY,
    'payload': party
  };
}

export function doDeleteParty (partyId: PartyResponse['id']) {
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

export function doStoreParty (party: PartyResponse) {
  return {
    'type': STORE_PARTY,
    'payload': party
  };
}

export default function partiesReducer (state: PartysState = initialState, action: ActionObject): PartysState {
  switch (action.type) {
    case STORE_PARTIES:
      return {
        ...state,
        'parties': action.payload
      };
    case SCHEDULING_PARTY_ID:
      return {
        ...state,
        'schedulingPartyId': action.payload
      };
    case STORE_CONNECTED_PARTIES:
      return {
        ...state,
        'connectedParties': action.payload
      };
    case STORE_PARTY:
      return {
        ...state,
        'party': action.payload
      };
    case STORE_CONNECTED_PARTY:
      return {
        ...state,
        'connectedParty': action.payload
      };
    case CREATE_PARTY:
      return {
        ...state,
        'parties': state.parties ? [...state.parties, action.payload] : [action.payload]
      };
    case CREATE_CONNECTED_PARTY:
      return {
        ...state,
        'connectedParties': state.connectedParties ? [...state.connectedParties, action.payload] : [action.payload]
      };
    case UPDATE_PARTY:
      return {
        ...state,
        'parties': state.parties?.map((party) => (party.id === action.payload.partyId ? { ...party, ...action.payload } : party))
      };
    case DELETE_PARTY:
      return {
        ...state,
        'parties': state.parties?.filter((party) => party.id !== action.payload)
      };
    case CLEAR_PARTIES:
      return initialState;
    default:
      return state;
  }
}
