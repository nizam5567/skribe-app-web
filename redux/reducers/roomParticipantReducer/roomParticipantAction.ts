import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { setRole, doClearStore } from './roomParticipantReducer';

export const boundRoomParticipantActions = bindActionCreators(
  {
    setRole,
    'clearStore': doClearStore
  },
  store.dispatch
);
