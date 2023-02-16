import * as process from 'process';
import { fetchWrapper } from '../helpers';

const mockBaseUrl = 'https://virtserver.swaggerhub.com/nizam2/skribe-public_api/1.0.0';

const login = async (token: string, recaptcha: string) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/auth/login`, {
    token,
    recaptcha
  });
  return res;
};

const logout = async () => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/auth/logout`, {});
  return res;
};

const status = async (token: string) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/auth/status`, { token });
  return res;
};

const getTenantsByEmail = async (email: string) => await fetchWrapper.get(`${process.env.BASE_URL}/auth/tenant?email=${email}`);

const onboard = async (onboardSchema: object) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/auth/onboard`, onboardSchema);
  // const res = await fetchWrapper.post(`${mockBaseUrl}/users`, onboardSchema);
  console.log('ONBOARD', res);
  // return "auth/onboard post call";
  return res;
};

export const userService = {
  login,
  logout,
  status,
  getTenantsByEmail,
  onboard
};
