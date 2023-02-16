import ActionObject from '../../types/reduxTypes';

const STORE_PARTIES_BY_EVENT_ID = 'STORE_PARTIES_BY_EVENT_ID';
const CREATE_PARTIES_BY_EVENT_ID = 'CREATE_PARTIES_BY_EVENT_ID';
const STORE_EXHIBITS_BY_EVENT_ID = 'STORE_EXHIBITS_BY_EVENT_ID';
const CREATE_EXHIBITS_BY_EVENT_ID = 'CREATE_EXHIBITS_BY_EVENT_ID';
const DELETE_EXHIBITS_BY_EVENT_ID = 'DELETE_EXHIBITS_BY_EVENT_ID';

interface PartiesExhibitState {
  partiesByEventId?: any
  exhibitsByEventId?: any
}

const initialState: PartiesExhibitState = {
  'partiesByEventId': undefined
};

export function doStorePartiesByEventId (partiesByEventId: any) {
  return {
    'type': STORE_PARTIES_BY_EVENT_ID,
    'payload': partiesByEventId
  };
}

export function doCreatePartiesByEventId (partiesByEventId: any) {
  return {
    'type': STORE_EXHIBITS_BY_EVENT_ID,
    'payload': partiesByEventId
  };
}

export function doStoreExhibitsByEventId (exhibitsByEventId: any) {
  return {
    'type': STORE_EXHIBITS_BY_EVENT_ID,
    'payload': exhibitsByEventId
  };
}

export function doCreateExhibitByEventId (exhibitsByEventId: any) {
  return {
    'type': CREATE_EXHIBITS_BY_EVENT_ID,
    'payload': exhibitsByEventId
  };
}

export function doDeleteExhibitByEventId (exhibitsByEventId: any) {
  return {
    'type': DELETE_EXHIBITS_BY_EVENT_ID,
    'payload': exhibitsByEventId
  };
}

export default function partiesByEventIdReducer (state: PartiesExhibitState = initialState, action: ActionObject): PartiesExhibitState {
  switch (action.type) {
    case STORE_PARTIES_BY_EVENT_ID:
      return {
        ...state,
        'partiesByEventId': state.partiesByEventId ? [action.payload, ...state.partiesByEventId] : [action.payload]
      };
    case CREATE_PARTIES_BY_EVENT_ID: {
      const eventId = Object.keys(action.payload)[0];
      const partyResponse = action.payload[eventId][0];
      let isEventIdFound = false;
      if (state.partiesByEventId) {
        const newPartiesByEventId = state.partiesByEventId;
        for (let i = 0; i < newPartiesByEventId.length; i++) {
          const item = newPartiesByEventId[i];
          const key = Object.keys(item)[0];
          if (item.hasOwnProperty(eventId)) {
            item[key].push(partyResponse);
            isEventIdFound = true;
            break;
          }
        }
        if (!isEventIdFound) {
          newPartiesByEventId.push(action.payload);
        }
        return {
          ...state,
          'partiesByEventId': newPartiesByEventId
        };
      }
      return {
        ...state,
        'partiesByEventId': [action.payload]
      };
    }
    case STORE_EXHIBITS_BY_EVENT_ID:
      return {
        ...state,
        'exhibitsByEventId': state.exhibitsByEventId ? [action.payload, ...state.exhibitsByEventId] : [action.payload]
      };
    case CREATE_EXHIBITS_BY_EVENT_ID: {
      const eventId = Object.keys(action.payload)[0];
      const exhibitResponse = action.payload[eventId][0];
      let isEventIdFound = false;
      if (state.exhibitsByEventId) {
        const newExhibitsByEventId = state.exhibitsByEventId;
        for (let i = 0; i < newExhibitsByEventId.length; i++) {
          const item = newExhibitsByEventId[i];
          const key = Object.keys(item)[0];
          if (item.hasOwnProperty(eventId)) {
            item[key].push(exhibitResponse);
            isEventIdFound = true;
            break;
          }
        }
        if (!isEventIdFound) {
          exhibitResponse.push(action.payload);
        }
        return {
          ...state,
          'exhibitsByEventId': exhibitResponse
        };
      }
      return {
        ...state,
        'exhibitsByEventId': [action.payload]
      };
    }
    default:
      return state;
  }
}
