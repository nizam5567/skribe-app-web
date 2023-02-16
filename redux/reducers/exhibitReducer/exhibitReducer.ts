import { IExhibit } from '../../../interface/IExhibit';
import { ExhibitResponse } from '../../../openapi';
import ActionObject from '../../types/reduxTypes';

const STORE_EXHIBITS = 'STORE_EXHIBITS';
const STORE_EXHIBIT = 'STORE_EXHIBIT';
const STORE_PUBLIC_EXHIBITS = 'STORE_PUBLIC_EXHIBITS';
const STORE_PUBLIC_EXHIBIT = 'STORE_PUBLIC_EXHIBIT';
const CREATE_EXHIBIT = 'CREATE_EXHIBIT';
const UPDATE_EXHIBIT = 'UPDATE_EXHIBIT';
const DELETE_EXHIBIT = 'DELETE_EXHIBIT';
const CLEAR_EXHIBITS = 'CLEAR_EXHIBITS';
const READY_TO_UPLOAD_TEMP_EXHIBIT = 'READY_TO_UPLOAD_TEMP_EXHIBIT';
const CLEAR_READY_TO_UPLOAD_TEMP_EXHIBIT = 'CLEAR_READY_TO_UPLOAD_TEMP_EXHIBIT';
const STORE_TEMP_EXHIBITS = 'STORE_TEMP_EXHIBITS';
const CREATE_TEMP_EXHIBIT = 'CREATE_TEMP_EXHIBIT';
const DELETE_TEMP_EXHIBIT = 'DELETE_TEMP_EXHIBIT';
const CLEAR_TEMP_EXHIBITS = 'CLEAR_TEMP_EXHIBITS';
const VISIBLE_TO_ONLY_PARTY_EXHIBITS = 'VISIBLE_TO_ONLY_PARTY_EXHIBITS';
const VISIBLE_TO_ALL_EXHIBITS = 'VISIBLE_TO_ALL_EXHIBITS';

interface ExhibitsState {
  publicExhibits?: ExhibitResponse[] | undefined
  publicExhibit?: ExhibitResponse | undefined
  exhibits?: ExhibitResponse[] | undefined
  exhibit?: ExhibitResponse | undefined
  tempExhibits?: IExhibit[] | undefined
  tempExhibit?: IExhibit | undefined
  readyToUploadTempExhibit?: boolean | undefined
  visibleToPartyExhibits: ExhibitResponse[] | undefined
  visibleToAllExhibits: ExhibitResponse[] | undefined
}

const initialState: ExhibitsState = {
  'publicExhibits': undefined,
  'publicExhibit': undefined,
  'exhibits': undefined,
  'exhibit': undefined,
  'tempExhibits': undefined,
  'tempExhibit': undefined,
  'readyToUploadTempExhibit': undefined,
  'visibleToPartyExhibits': undefined,
  'visibleToAllExhibits': undefined
};

export function doReadyToUploadTempExhibit (decision: boolean) {
  return {
    'type': READY_TO_UPLOAD_TEMP_EXHIBIT,
    'payload': decision
  };
}

export function doClearReadyToUploadTempExhibit () {
  return {
    'type': CLEAR_READY_TO_UPLOAD_TEMP_EXHIBIT,
    'payload': undefined
  };
}
export function doStorePublicExhibits (exhibits: ExhibitResponse[]) {
  return {
    'type': STORE_PUBLIC_EXHIBITS,
    'payload': exhibits
  };
}
export function doStorePublicExhibit (exhibit: ExhibitResponse) {
  return {
    'type': STORE_PUBLIC_EXHIBIT,
    'payload': exhibit
  };
}
export function doStoreExhibits (exhibits: ExhibitResponse[]) {
  return {
    'type': STORE_EXHIBITS,
    'payload': exhibits
  };
}
export function doStoreVisibleToAllExhibits (exhibits: ExhibitResponse[]) {
  return {
    'type': VISIBLE_TO_ALL_EXHIBITS,
    'payload': exhibits
  };
}
export function doStoreVisibleToPartyExhibits (exhibits: ExhibitResponse[]) {
  return {
    'type': VISIBLE_TO_ONLY_PARTY_EXHIBITS,
    'payload': exhibits
  };
}
export function doStoreTempExhibits (exhibits: IExhibit[]) {
  return {
    'type': STORE_TEMP_EXHIBITS,
    'payload': exhibits
  };
}

export function doCreateExhibit (exhibit: ExhibitResponse) {
  return {
    'type': CREATE_EXHIBIT,
    'payload': exhibit
  };
}

export function doCreateTempExhibit (exhibit: IExhibit) {
  return {
    'type': CREATE_TEMP_EXHIBIT,
    'payload': exhibit
  };
}

export function doClearTempExhibits (exhibit: IExhibit) {
  return {
    'type': CLEAR_TEMP_EXHIBITS,
    'payload': undefined
  };
}

export function doUpdateExhibit (exhibit: ExhibitResponse) {
  return {
    'type': UPDATE_EXHIBIT,
    'payload': exhibit
  };
}

export function doDeleteExhibit (exhibitid: ExhibitResponse['id']) {
  return {
    'type': DELETE_EXHIBIT,
    'payload': exhibitid
  };
}

export function doDeleteTempExhibit (exhibitid: IExhibit['exhibitid']) {
  return {
    'type': DELETE_TEMP_EXHIBIT,
    'payload': exhibitid
  };
}

export function doClearStore () {
  return {
    'type': CLEAR_EXHIBITS,
    'payload': undefined
  };
}

export function doStoreExhibit (exhibit: ExhibitResponse) {
  return {
    'type': STORE_EXHIBIT,
    'payload': exhibit
  };
}

export default function exhibitsReducer (state: ExhibitsState = initialState, action: ActionObject): ExhibitsState {
  switch (action.type) {
    case STORE_EXHIBITS:
      return {
        ...state,
        'exhibits': action.payload
      };
    case VISIBLE_TO_ALL_EXHIBITS:
      return {
        ...state,
        'visibleToAllExhibits': action.payload
      };
    case VISIBLE_TO_ONLY_PARTY_EXHIBITS:
      return {
        ...state,
        'visibleToPartyExhibits': action.payload
      };
    case STORE_TEMP_EXHIBITS:
      return {
        ...state,
        'tempExhibits': action.payload
      };
    case STORE_EXHIBIT:
      return {
        ...state,
        'exhibit': action.payload
      };
    case STORE_PUBLIC_EXHIBITS:
      return {
        ...state,
        'publicExhibits': action.payload
      };
    case STORE_PUBLIC_EXHIBIT:
      return {
        ...state,
        'publicExhibit': action.payload
      };
    case CREATE_EXHIBIT:
      return {
        ...state,
        'exhibits': state.exhibits ? [action.payload, ...state.exhibits] : [action.payload]
      };
    case CREATE_TEMP_EXHIBIT:
      return {
        ...state,
        'tempExhibits': state.tempExhibits ? [...state.tempExhibits, action.payload] : [action.payload]
      };
    case UPDATE_EXHIBIT:
      return {
        ...state,
        'exhibits': state.exhibits?.map((exhibit: ExhibitResponse) => (exhibit.id === action.payload.exhibitId ? { ...exhibit, ...action.payload } : exhibit))
      };
    case DELETE_EXHIBIT:
      return {
        ...state,
        'exhibits': state.exhibits?.filter((exhibit: ExhibitResponse) => exhibit.id !== action.payload)
      };
    case DELETE_TEMP_EXHIBIT:
      return {
        ...state,
        'tempExhibits': state.tempExhibits?.filter((exhibit: IExhibit) => exhibit.exhibitid !== action.payload)
      };
    case READY_TO_UPLOAD_TEMP_EXHIBIT:
      return {
        ...state,
        'readyToUploadTempExhibit': action.payload
      };
    case CLEAR_READY_TO_UPLOAD_TEMP_EXHIBIT:
      return {
        ...state,
        'readyToUploadTempExhibit': undefined
      };
    case CLEAR_TEMP_EXHIBITS:
      return {
        ...state,
        'tempExhibits': undefined
      };
    case CLEAR_EXHIBITS:
      return initialState;
    default:
      return state;
  }
}
