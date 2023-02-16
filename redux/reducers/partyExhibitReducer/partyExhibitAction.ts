import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doCreatePartiesByEventId, doStorePartiesByEventId } from './partyExhibitReducer';

export const boundPartiesExhibitsOfEventsReducer = bindActionCreators(
  {
    'storePartiesByEventId': doStorePartiesByEventId,
    'createPartiesByEventId': doCreatePartiesByEventId
  },
  store.dispatch
);
