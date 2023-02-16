import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreParties, doCreateParty, doUpdateParty, doDeleteParty, doClearStore } from './connectedPartyReducer';

export const boundPartiesActions = bindActionCreators(
  {
    'storeParties': doStoreParties,
    'createParty': doCreateParty,
    'updateParty': doUpdateParty,
    'deleteParty': doDeleteParty,
    'clearStore': doClearStore
  },
  store.dispatch
);
