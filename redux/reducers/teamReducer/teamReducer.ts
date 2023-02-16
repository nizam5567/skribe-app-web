import ActionObject from '../../types/reduxTypes';

const STORE_TEAM_MEMBERS = 'STORE_TEAM_MEMBERS';
const STORE_TEAM_MEMBER = 'STORE_TEAM_MEMBER';
const CREATE_TEAM_MEMBER = 'CREATE_TEAM_MEMBER';
const UPDATE_TEAM_MEMBER = 'UPDATE_TEAM_MEMBER';
const DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER';
const ENABLE_DISABLE_TEM_MEMBER = 'ENABLE_DISABLE_TEM_MEMBER';

interface ITeamMemberState {
  teamMembers?: any[]
  teamMember?: any
}

const initialState: ITeamMemberState = {
  'teamMembers': undefined,
  'teamMember': undefined
};

export function doStoreTeamMembers (teamMembers: any[]) {
  return {
    'type': STORE_TEAM_MEMBERS,
    'payload': teamMembers
  };
}

export function doCreateTeamMember (teamMember: any) {
  return {
    'type': CREATE_TEAM_MEMBER,
    'payload': teamMember
  };
}

export function doUpdateTeamMember (teamMember: any) {
  return {
    'type': UPDATE_TEAM_MEMBER,
    'payload': teamMember
  };
}

export function doDeleteTeamMember (id: any) {
  return {
    'type': DELETE_TEAM_MEMBER,
    'payload': id
  };
}

export function doStoreTeamMember (teamMember: any) {
  return {
    'type': STORE_TEAM_MEMBER,
    'payload': teamMember
  };
}

export function doEnableDisableTeamMember (id: number, status: boolean) {
  return {
    'type': ENABLE_DISABLE_TEM_MEMBER,
    'payload': {
      id,
      status
    }
  };
}

export default function teamMembersReducer (state: ITeamMemberState = initialState, action: ActionObject): ITeamMemberState {
  switch (action.type) {
    case STORE_TEAM_MEMBERS:
      return {
        ...state,
        'teamMembers': action.payload
      };
    case CREATE_TEAM_MEMBER:
      return {
        ...state,
        'teamMembers': state.teamMembers ? [action.payload, ...state.teamMembers] : [action.payload]
      };
    case UPDATE_TEAM_MEMBER:
      return {
        ...state,
        'teamMembers': state.teamMembers?.map((member) => (member.id === action.payload.id ? { ...member, ...action.payload } : member))
      };
    case DELETE_TEAM_MEMBER:
      return {
        ...state,
        'teamMember': state.teamMembers?.filter((member) => member.id !== action.payload)
      };
    case ENABLE_DISABLE_TEM_MEMBER:
      return {
        ...state,
        'teamMember': state.teamMembers?.map((member) => {
          if (member.id === action.payload.id) {
            member.disablestatus = action.payload.status;
          }
          return member;
        })
      };
    case STORE_TEAM_MEMBER:
      return {
        ...state,
        'teamMember': action.payload
      };
    default:
      return state;
  }
}
