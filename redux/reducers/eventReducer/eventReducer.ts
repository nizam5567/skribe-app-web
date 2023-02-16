import { CalendarResponse, EventResponse } from '../../../openapi';
import ActionObject from '../../types/reduxTypes';

const STORE_EVETNS = 'STORE_EVETNS';
const STORE_EVENT = 'STORE_EVENT';
const STORE_INVITED_EVENTS = 'STORE_INVITED_EVENTS';
const STORE_CALENDAR_INFORMATION = 'STORE_CALENDAR_INFORMATION';
const CREATE_EVETN = 'CREATE_EVETN';
const UPDATE_EVENT = 'UPDATE_EVENT';
const UPDATE_INVITED_EVENT = 'UPDATE_INVITED_EVENT';
const DELETE_EVETN = 'DELETE_EVETN';
const CLEAR_EVETNS = 'CLEAR_EVETNS';

interface EventsState {
  events?: any// EventResponse[];
  event?: any// EventResponse;
  invitedEvents?: EventResponse[]
  calendar?: CalendarResponse | undefined
}

const initialState: EventsState = {
  'events': undefined,
  'event': undefined,
  'invitedEvents': undefined,
  'calendar': undefined
};

export function doStoreEvents (events: EventResponse[]) {
  return {
    'type': STORE_EVETNS,
    'payload': events
  };
}

export function doStoreCalendarInformation (calendar: CalendarResponse) {
  return {
    'type': STORE_CALENDAR_INFORMATION,
    'payload': calendar
  };
}

export function doStoreInvitedEvents (invitedEvents: EventResponse[]) {
  return {
    'type': STORE_INVITED_EVENTS,
    'payload': invitedEvents
  };
}

export function doCreateEvent (event: EventResponse) {
  return {
    'type': CREATE_EVETN,
    'payload': event
  };
}

export function doUpdateEvent (event: EventResponse) {
  return {
    'type': UPDATE_EVENT,
    'payload': event
  };
}

export function doUpdateInvitedEvent (event: EventResponse) {
  return {
    'type': UPDATE_INVITED_EVENT,
    'payload': event
  };
}

export function doDeleteEvent (eventId: EventResponse['id']) {
  return {
    'type': DELETE_EVETN,
    'payload': eventId
  };
}

export function doClearStore () {
  return {
    'type': CLEAR_EVETNS,
    'payload': undefined
  };
}

export function doStoreEvent (event: EventResponse) {
  return {
    'type': STORE_EVENT,
    'payload': event
  };
}

export default function eventsReducer (state: EventsState = initialState, action: ActionObject): EventsState {
  switch (action.type) {
    case STORE_EVETNS:
      return {
        ...state,
        'events': action.payload
      };
    case STORE_CALENDAR_INFORMATION:
      return {
        ...state,
        'calendar': action.payload
      };
    case STORE_INVITED_EVENTS:
      return {
        ...state,
        'invitedEvents': action.payload
      };
    case STORE_EVENT:
      return {
        ...state,
        'event': action.payload
      };
    case CREATE_EVETN:
      return {
        ...state,
        'events': state.events ? [...state.events, action.payload] : [action.payload]
      };
    case UPDATE_EVENT: {
      return {
        ...state,
        'events': state.events?.map((event: EventResponse) => (event.id === action.payload.id ? { ...event, ...action.payload } : event))
      };
    }
    case UPDATE_INVITED_EVENT:
      return {
        ...state,
        'invitedEvents': state.invitedEvents?.map((event: EventResponse) => (event.id === action.payload.id ? { ...event, ...action.payload, 'accepted': 1 } : event))
      };
    case DELETE_EVETN:
      return {
        ...state,
        'events': state.events?.filter((event: EventResponse) => event.id !== action.payload)
      };
    case CLEAR_EVETNS:
      return initialState;
    default:
      return state;
  }
}
