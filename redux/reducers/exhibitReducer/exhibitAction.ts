import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreExhibits, doCreateExhibit, doUpdateExhibit, doDeleteExhibit, doClearStore, doStoreExhibit, doStoreTempExhibits, doCreateTempExhibit, doClearTempExhibits, doDeleteTempExhibit, doReadyToUploadTempExhibit, doClearReadyToUploadTempExhibit, doStoreVisibleToAllExhibits, doStoreVisibleToPartyExhibits, doStorePublicExhibit, doStorePublicExhibits } from './exhibitReducer';

export const boundExhibitsActions = bindActionCreators(
  {
    'storeExhibits': doStoreExhibits,
    'storePublicExhibit': doStorePublicExhibit,
    'storePublicExhibits': doStorePublicExhibits,
    'storeVisibleToAllExhibits': doStoreVisibleToAllExhibits,
    'storeVisibleToPartyExhibits': doStoreVisibleToPartyExhibits,
    'storeTempExhibits': doStoreTempExhibits,
    'storeExhibit': doStoreExhibit,
    'createExhibit': doCreateExhibit,
    'createTempExhibit': doCreateTempExhibit,
    'updateExhibit': doUpdateExhibit,
    'deleteExhibit': doDeleteExhibit,
    'deleteTempExhibit': doDeleteTempExhibit,
    'clearTempExhibits': doClearTempExhibits,
    'readyToUploadTempExhibit': doReadyToUploadTempExhibit,
    'clearReadyToUploadTempExhibit': doClearReadyToUploadTempExhibit,
    'clearStore': doClearStore
  },
  store.dispatch
);
