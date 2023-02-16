import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreParties, doCreateParty, doUpdateParty, doDeleteParty, doClearStore, doStoreParty, doStoreConnectedParties, doStoreConnectedParty, doStoreSchedulingPartyId, doCreateConnectedParty } from './partyReducer';

export const boundPartysActions = bindActionCreators(
  {
    'storeParties': doStoreParties,
    'storeConnectedParties': doStoreConnectedParties,
    'storeSchedulingPartyId': doStoreSchedulingPartyId,
    'storeConnectedParty': doStoreConnectedParty,
    'storeParty': doStoreParty,
    'createParty': doCreateParty,
    'createConnectedParty': doCreateConnectedParty,
    'updateParty': doUpdateParty,
    'deleteParty': doDeleteParty,
    'clearStore': doClearStore
  },
  store.dispatch
);
