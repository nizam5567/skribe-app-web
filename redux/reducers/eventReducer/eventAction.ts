import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreEvents, doCreateEvent, doUpdateEvent, doDeleteEvent, doClearStore, doStoreEvent, doStoreInvitedEvents, doStoreCalendarInformation, doUpdateInvitedEvent } from './eventReducer';

export const boundEventsActions = bindActionCreators(
  {
    'storeEvents': doStoreEvents,
    'storeEvent': doStoreEvent,
    'storeCalendarInformation': doStoreCalendarInformation,
    'storeInvitedEvents': doStoreInvitedEvents,
    'createEvent': doCreateEvent,
    'updateEvent': doUpdateEvent,
    'updateInvitedEvent': doUpdateInvitedEvent,
    'deleteEvent': doDeleteEvent,
    'clearStore': doClearStore
  },
  store.dispatch
);
