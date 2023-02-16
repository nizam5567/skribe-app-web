import { GET_USERS_BY_TENANTID, SAVE_USERS_BY_TENANTID } from './usersByTenantIdTypes';

export const saveUsersByTenantId = (users: any) => ({
  'type': SAVE_USERS_BY_TENANTID,
  'payload': users
});

export const getUsersByTenantId = () => ({
  'type': GET_USERS_BY_TENANTID
});
