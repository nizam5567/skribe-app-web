import ActionObject from '../../types/reduxTypes';

const STORE_CLIPS = 'STORE_CLIPS';
const CREATE_CLIP = 'CREATE_CLIP';
const UPDATE_CLIP = 'UPDATE_CLIP';
const DELETE_CLIP = 'DELETE_CLIP';
const STORE_CLIP = 'STORE_CLIP';

interface IClipsState {
  clips?: any[]
  clip: any
}

const initialState: IClipsState = {
  'clips': undefined,
  'clip': undefined
};

export function doStoreClips (clips: any[]) {
  return {
    'type': STORE_CLIPS,
    'payload': clips
  };
}

export function doStoreClip (clip: any) {
  return {
    'type': STORE_CLIP,
    'payload': clip
  };
}

export function doCreateClip (clip: any) {
  return {
    'type': CREATE_CLIP,
    'payload': clip
  };
}

export function doUpdateClip (clip: any) {
  return {
    'type': UPDATE_CLIP,
    'payload': clip
  };
}

export function doDeleteClip (id: any) {
  return {
    'type': DELETE_CLIP,
    'payload': id
  };
}

export default function clipsReducer (state: IClipsState = initialState, action: ActionObject): IClipsState {
  switch (action.type) {
    case STORE_CLIPS:
      return {
        ...state,
        'clips': action.payload
      };
    case STORE_CLIP:
      return {
        ...state,
        'clip': action.payload
      };
    case CREATE_CLIP:
      return {
        ...state,
        'clips': state.clips ? [action.payload, ...state.clips] : [action.payload]
      };
    case UPDATE_CLIP:
      return {
        ...state,
        'clips': state.clips?.map((clip: any) => (clip.clipId === action.payload.clipId ? { ...clip, ...action.payload } : clip))
      };
    case DELETE_CLIP:
      return {
        ...state,
        'clips': state.clips?.filter((item) => item.clipId !== action.payload)
      };
    default:
      return state;
  }
}
