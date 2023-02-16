import { bindActionCreators } from 'redux';
import store from '../../store/store';
import { doStoreTeamMembers, doStoreTeamMember, doCreateTeamMember, doUpdateTeamMember, doDeleteTeamMember, doEnableDisableTeamMember } from './teamReducer';

export const boundTeamMemberActions = bindActionCreators(
  {
    'storeTeamMembers': doStoreTeamMembers,
    'storeTeamMember': doStoreTeamMember,
    'createTeamMember': doCreateTeamMember,
    'updateTeamMember': doUpdateTeamMember,
    'deleteTeamMember': doDeleteTeamMember,
    doEnableDisableTeamMember
  },
  store.dispatch
);
