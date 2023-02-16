import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreClips, doCreateClip, doUpdateClip, doDeleteClip, doStoreClip } from './clipsReducer';

export const boundClipActions = bindActionCreators(
  {
    doStoreClips,
    doCreateClip,
    doUpdateClip,
    doDeleteClip,
    doStoreClip
  },
  store.dispatch
);
