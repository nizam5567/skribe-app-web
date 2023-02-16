import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreIsSpeakerNameChanged, doStoreTranscriptSpeakers } from './transcriptReducer';

export const boundTranscriptActions = bindActionCreators(
  {
    doStoreTranscriptSpeakers,
    doStoreIsSpeakerNameChanged
  },
  store.dispatch
);
