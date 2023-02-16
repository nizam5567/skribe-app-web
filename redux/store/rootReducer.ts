import { combineReducers } from 'redux';
import snackbarReducer from '../reducers/snackbarReducer/snackbarReducer';
import { searchReducer } from '../reducers/searchReducer/searchReducer';
import { modalReducer } from '../reducers/modalReducer/modalReducer';
import mattersReducer from '../reducers/matterReducer/matterReducer';
import eventReducer from '../reducers/eventReducer/eventReducer';
import partiesReducer from '../reducers/partyReducer/partyReducer';
import { tenantReducer } from '../reducers/tenantReducer/tenantReducer';
import { userReducer } from '../reducers/userReducer/userReducer';
import connectedPartyReducer from '../reducers/connectedPartyReducer/connectedPartyReducer';
import { usersByTenantId } from '../reducers/usersByTenantIdReducer/usersByTenantIdReducer';
import { previewExhibitReducer } from '../reducers/previewExhibitReducer/previewExhibitReducer';
import { roomsEventParticipantsReducer } from '../reducers/roomsEventParticipantsReducer/roomsEventParticipantsReducer';
import { roomsMeetingDataReducer } from '../reducers/roomsMeetingDataReducer/roomsMeetingDataReducer';
import exhibitReducer from '../reducers/exhibitReducer/exhibitReducer';
import partiesExhibitsOfEventsReducer from '../reducers/partyExhibitReducer/partyExhibitReducer';
import { roomsCurrentParticipantReducer } from '../reducers/roomsCurrentParticipantReducer/roomsCurrentParticipantReducer';
import { roomsParticipantZoomDataReducer } from '../reducers/roomsParticipantZoomDataReducer/roomsParticipantZoomDataReducer';
import roomParticipantReducer from '../reducers/roomParticipantReducer/roomParticipantReducer';
import teamMembersReducer from '../reducers/teamReducer/teamReducer';
import clipsReducer from '../reducers/clipsReducer/clipsReducer';
import transcriptReducer from '../reducers/transcriptReducer/transcriptReducer';

const rootReducer = combineReducers({
  snackbarReducer,
  searchReducer,
  modalReducer,
  mattersReducer,
  eventReducer,
  partiesReducer,
  tenantReducer,
  userReducer,
  connectedPartyReducer,
  usersByTenantId,
  exhibitReducer,
  previewExhibitReducer,
  roomsEventParticipantsReducer,
  roomsMeetingDataReducer,
  partiesExhibitsOfEventsReducer,
  roomsCurrentParticipantReducer,
  roomsParticipantZoomDataReducer,
  roomParticipantReducer,
  teamMembersReducer,
  clipsReducer,
  transcriptReducer
});

export default rootReducer;
