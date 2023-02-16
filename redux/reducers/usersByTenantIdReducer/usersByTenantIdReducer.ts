import { GET_USERS_BY_TENANTID, SAVE_USERS_BY_TENANTID } from './usersByTenantIdTypes';

const initialState = {
  'users': []
};

export const usersByTenantId = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_USERS_BY_TENANTID:
      return {
        ...state,
        'users': action.payload
      };
    case GET_USERS_BY_TENANTID:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
