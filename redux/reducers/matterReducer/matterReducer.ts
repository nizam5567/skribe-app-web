import { EventResponse, MatterResponse } from '../../../openapi';
import ActionObject from '../../types/reduxTypes';

const STORE_MATTERS = 'STORE_MATTERS';
const STORE_MATTER = 'STORE_MATTER';
const STORE_SEARCH_MATTER = 'STORE_SEARCH_MATTER';
const CLEAR_SEARCH_MATTER = 'CLEAR_SEARCH_MATTER';
const CREATE_MATTER = 'CREATE_MATTER';
const UPDATE_MATTER = 'UPDATE_MATTER';
const DELETE_MATTER = 'DELETE_MATTER';
const CLEAR_MATTERS = 'CLEAR_MATTERS';
const STORE_EVENT_UNDER_MATTER = 'STORE_EVENT_UNDER_MATTER';
const UPDATE_EVENT_UNDER_MATTER = 'UPDATE_EVENT_UNDER_MATTER';
const STORE_MATTER_ID = 'STORE_MATTER_ID';
const INCREASE_EXHIBIT_COUNT = 'INCREASE_EXHIBIT_COUNT';
const DECREASE_EXHIBIT_COUNT = 'DECREASE_EXHIBIT_COUNT';
const INCREASE_INVITED_COUNT = 'INCREASE_INVITED_COUNT';
const ADD_CALENDAR_ID_INTO_EVENT = 'ADD_CALENDAR_ID_INTO_EVENT';

interface MattersState {
  matters?: MatterResponse[]
  matter?: MatterResponse
  searchMatter?: MatterResponse
  matterId?: number
}

const initialState: MattersState = {
  'matters': undefined,
  'matter': undefined,
  'searchMatter': undefined,
  'matterId': undefined
};
export function doAddCalendarIdIntoEvent (matterEventCalendarIds: any) {
  return {
    'type': ADD_CALENDAR_ID_INTO_EVENT,
    'payload': matterEventCalendarIds
  };
}
export function doIncreaseInvitedCount (matterAndEventId: any) {
  return {
    'type': INCREASE_INVITED_COUNT,
    'payload': matterAndEventId
  };
}

export function doIncreaseExhibitCount (matterAndEventId: any) {
  return {
    'type': INCREASE_EXHIBIT_COUNT,
    'payload': matterAndEventId
  };
}

export function doDecreaseExhibitCount (matterAndEventId: any) {
  return {
    'type': DECREASE_EXHIBIT_COUNT,
    'payload': matterAndEventId
  };
}

export function doStoreMatters (matters: MatterResponse[]) {
  return {
    'type': STORE_MATTERS,
    'payload': matters
  };
}

export function doStoreMatterId (id: number) {
  return {
    'type': STORE_MATTER_ID,
    'payload': id
  };
}

export function doCreateMatter (matter: MatterResponse) {
  return {
    'type': CREATE_MATTER,
    'payload': matter
  };
}

export function doUpdateMatter (matter: any) {
  return {
    'type': UPDATE_MATTER,
    'payload': matter
  };
}

export function doDeleteMatter (id: MatterResponse['id']) {
  return {
    'type': DELETE_MATTER,
    'payload': id
  };
}

export function doClearStore () {
  return {
    'type': CLEAR_MATTERS,
    'payload': undefined
  };
}

export function doStoreMatter (matter: MatterResponse) {
  return {
    'type': STORE_MATTER,
    'payload': matter
  };
}

export function doStoreSearchMatter (matter: MatterResponse) {
  return {
    'type': STORE_SEARCH_MATTER,
    'payload': matter
  };
}

export function doClearSearchMatter () {
  return {
    'type': CLEAR_SEARCH_MATTER,
    'payload': undefined
  };
}

export function doStoreEventUnderMatter (event: EventResponse) {
  return {
    'type': STORE_EVENT_UNDER_MATTER,
    'payload': event
  };
}

export function doUpdateEventUnderMatter (event: EventResponse) {
  return {
    'type': UPDATE_EVENT_UNDER_MATTER,
    'payload': event
  };
}

export default function mattersReducer (state: MattersState = initialState, action: ActionObject): MattersState {
  switch (action.type) {
    case STORE_MATTERS:
      return {
        ...state,
        'matters': action.payload
      };
    case STORE_SEARCH_MATTER:
      return {
        ...state,
        'searchMatter': action.payload
      };
    case STORE_MATTER_ID:
      return {
        ...state,
        'matterId': action.payload
      };
    case CREATE_MATTER:
      return {
        ...state,
        'matters': state.matters ? [action.payload, ...state.matters] : [action.payload]
      };
    case UPDATE_MATTER:
      return {
        ...state,
        'matters': state.matters?.map((matter: MatterResponse) => (matter.id === action.payload.id ? { ...matter, ...action.payload } : matter))
      };
    case DELETE_MATTER:
      return {
        ...state,
        'matters': state.matters?.filter((matter: MatterResponse) => matter.id !== action.payload)
      };
    case STORE_MATTER:
      return {
        ...state,
        'matter': action.payload
      };
    case STORE_EVENT_UNDER_MATTER:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterid) {
            if (matter.events && matter.events.length !== 0) {
              return { ...matter, 'events': [action.payload, ...matter.events] };
            }
            return { ...matter, 'events': [action.payload] };
          }
          return matter;
        })
      };

    case ADD_CALENDAR_ID_INTO_EVENT:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterId) {
            if (matter?.events && matter?.events.length !== 0) {
              const events = matter.events.map((event: EventResponse) => {
                if (event.id === action.payload.eventId) {
                  const { calenderid } = action.payload;
                  return { ...event, calenderid };
                }
                return event;
              });
              return { ...matter, events };
            }
          } else {
            return matter;
          }
        })
      };
    case INCREASE_INVITED_COUNT:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterId) {
            if (matter?.events && matter?.events.length !== 0) {
              const events = matter.events.map((event: EventResponse) => {
                if (event.id === action.payload.eventId) {
                  let invitedCount = Number(event.invited);
                  if (invitedCount) {
                    invitedCount++;
                  } else {
                    invitedCount = 1;
                  }
                  return { ...event, 'invited': invitedCount };
                }
                return event;
              });
              return { ...matter, events };
            }
          } else {
            return matter;
          }
        })
      };
    case INCREASE_EXHIBIT_COUNT:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterId) {
            if (matter?.events && matter?.events.length !== 0) {
              const events = matter.events.map((event: EventResponse) => {
                if (event.id === action.payload.eventId) {
                  let exhibitCount = Number(event.exhibit);
                  if (exhibitCount) {
                    ++exhibitCount;
                  } else {
                    exhibitCount = 1;
                  }
                  return { ...event, 'exhibit': exhibitCount };
                }
                return event;
              });
              return { ...matter, events };
            }
          } else {
            return matter;
          }
        })
      };
    case DECREASE_EXHIBIT_COUNT:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterId) {
            if (matter?.events && matter?.events.length !== 0) {
              const events = matter.events.map((event: EventResponse) => {
                if (event.id === action.payload.eventId) {
                  let exhibitCount = Number(event.exhibit);
                  if (exhibitCount) {
                    --exhibitCount;
                  } else {
                    exhibitCount = 0;
                  }
                  return { ...event, 'exhibit': exhibitCount };
                }
                return event;
              });
              return { ...matter, events };
            }
          } else {
            return matter;
          }
        })
      };
    case UPDATE_EVENT_UNDER_MATTER:
      return {
        ...state,
        'matters': state.matters?.map((matter: any) => {
          if (matter.id === action.payload.matterid) {
            if (matter?.events && matter?.events.length !== 0) {
              const events = matter.events.map((event: EventResponse) => {
                if (event.id === action.payload.id) {
                  return { ...event, ...action.payload };
                }
                return event;
              });
              return { ...matter, events };
            }
            return { ...matter, 'events': [action.payload] };
          }
          return matter;
        })
      };
    case CLEAR_MATTERS:
      return initialState;
    case CLEAR_SEARCH_MATTER:
      return {
        ...state,
        'searchMatter': undefined
      };
    default:
      return state;
  }
}
