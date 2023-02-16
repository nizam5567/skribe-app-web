import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreMatters, doCreateMatter, doUpdateMatter, doDeleteMatter, doClearStore, doStoreMatter, doStoreSearchMatter, doClearSearchMatter, doStoreEventUnderMatter, doUpdateEventUnderMatter, doStoreMatterId, doIncreaseExhibitCount, doDecreaseExhibitCount, doIncreaseInvitedCount, doAddCalendarIdIntoEvent } from './matterReducer';

export const boundMattersActions = bindActionCreators(
  {
    'storeMatters': doStoreMatters,
    'storeSearchMatter': doStoreSearchMatter,
    'storeEventUnderMatter': doStoreEventUnderMatter,
    'updateEventUnderMatter': doUpdateEventUnderMatter,
    'clearSearchMatter': doClearSearchMatter,
    'createMatter': doCreateMatter,
    'updateMatter': doUpdateMatter,
    'deleteMatter': doDeleteMatter,
    'storeMatter': doStoreMatter,
    'clearStore': doClearStore,
    'storeMatterId': doStoreMatterId,
    'increaseExhibitCount': doIncreaseExhibitCount,
    'decreaseExhibitCount': doDecreaseExhibitCount,
    'increaseInvitedCount': doIncreaseInvitedCount,
    'addCalendarIdIntoEvent': doAddCalendarIdIntoEvent
  },
  store.dispatch
);
