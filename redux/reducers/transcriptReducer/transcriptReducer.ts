import ActionObject from '../../types/reduxTypes';

const STORE_TRANSCRIPT_SPEAKERS = 'STORE_TRANSCRIPT_SPEAKERS';
const STORE_IS_SPEAKER_NAME_CHANGED = 'STORE_IS_SPEAKER_NAME_CHANGED';

interface ITranscriptState {
  transcriptSpeakers?: [],
  isSpeakerNameChanged: boolean
}

const initialState: ITranscriptState = {
  'transcriptSpeakers': undefined,
  'isSpeakerNameChanged': false
};

export function doStoreTranscriptSpeakers (transcriptSpeakers: any) {
  return {
    'type': STORE_TRANSCRIPT_SPEAKERS,
    'payload': transcriptSpeakers
  };
}

export function doStoreIsSpeakerNameChanged (isSpeakerNameChanged: any) {
  return {
    'type': STORE_IS_SPEAKER_NAME_CHANGED,
    'payload': isSpeakerNameChanged
  };
}

export default function transcriptReducer (state: ITranscriptState = initialState, action: ActionObject): ITranscriptState {
  switch (action.type) {
    
    case STORE_TRANSCRIPT_SPEAKERS:
      return {
        ...state,
        'transcriptSpeakers': action.payload
      }; 
    case STORE_IS_SPEAKER_NAME_CHANGED:
      return {
        ...state,
        'isSpeakerNameChanged': action.payload
      };    
    
    default:
      return state;
  }
}
