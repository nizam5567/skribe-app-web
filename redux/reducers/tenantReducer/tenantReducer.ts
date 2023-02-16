import { GET_TENANT, SAVE_TENANT } from './tenantTypes';

const initialState = {
  'tenantId': null
};

export const tenantReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SAVE_TENANT:
      return {
        ...state,
        'tenantId': action.payload
      };
    case GET_TENANT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
