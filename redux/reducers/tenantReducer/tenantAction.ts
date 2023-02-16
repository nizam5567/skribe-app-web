import { GET_TENANT, SAVE_TENANT } from './tenantTypes';

export const saveTenantId = (tenantId: string | null) => ({
  'type': SAVE_TENANT,
  'payload': tenantId
});

export const getTenantId = () => ({
  'type': GET_TENANT
});
