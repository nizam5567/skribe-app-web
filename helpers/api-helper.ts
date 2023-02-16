import { EventsApi, ExhibitsApi, ParticipantsApi, PartiesApi, MattersApi, UploadsApi, UsersApi, CalendarsApi, TenantsApi, GuestApi } from '../openapi';
import { EventTenantsApi } from '../openapi/api/event-tenants-api';
import { userAuthStateService } from '../services/userAuthState.service';
import ApiConfiguration from '../util/apiConfiguration';
import ApiConfigurationAuth from '../util/apiConfigurationAuth';
import ApiConfigurationGuest from '../util/apiConfigurationGuest';
import { isTokenExpired } from '../util/common';
import { Auth } from 'aws-amplify';

let tenantsApi: TenantsApi;
let eventsApi: EventsApi;
let mattersApi: MattersApi;
let partiesApi: PartiesApi;
let participantsApi: ParticipantsApi;
let exhibitsApi: ExhibitsApi;
let uploadsApi: UploadsApi;
let usersApi: UsersApi;
let calendarsApi: CalendarsApi;
let eventTenantsApi: EventTenantsApi;
let guestApi: GuestApi;

let myServiceConfig: ApiConfiguration;
let authServiceConfig: ApiConfigurationAuth;
let guestServiceConfig: ApiConfigurationGuest;

const getAccessJwtToken = async () => {
  const session = await Auth.currentSession();
  return session.getAccessToken().getJwtToken();
};

const getServiceConfig = async (accessToken: string) => {
  if (isTokenExpired(accessToken)) {
    //Get new token if expired
    accessToken = await getAccessJwtToken();
    sessionStorage.setItem('accessToken', accessToken);
    window.dispatchEvent(new Event("storage"));
  }
  myServiceConfig = new ApiConfiguration(accessToken);
  return myServiceConfig;
};

const getAuthServiceConfig = async () => {
  if (!authServiceConfig) {
    authServiceConfig = new ApiConfigurationAuth();
  }
  return authServiceConfig;
};

const getGuestServiceConfig = async (accessToken: string) => {
  if (!guestServiceConfig) {
    guestServiceConfig = new ApiConfigurationGuest(accessToken);
  }
  return guestServiceConfig;
};

const getTenantService = async () => {
  if (!tenantsApi) tenantsApi = new TenantsApi(await getAuthServiceConfig());
  return tenantsApi;
};

const getMatterService = async (accessToken: string) => {
  mattersApi = new MattersApi(await getServiceConfig(accessToken));
  return mattersApi;
};

const getEventService = async (accessToken: string) => {
  eventsApi = new EventsApi(await getServiceConfig(accessToken));
  return eventsApi;
};

const getPartyService = async (accessToken: string) => {
  partiesApi = new PartiesApi(await getServiceConfig(accessToken));
  return partiesApi;
};

const getParticipantService = async (accessToken: string) => {
  participantsApi = new ParticipantsApi(await getServiceConfig(accessToken));
  return participantsApi;
};

const getExhibitService = async (accessToken: string) => {
  exhibitsApi = new ExhibitsApi(await getServiceConfig(accessToken));
  return exhibitsApi;
};

const getUploadService = async (accessToken: string) => {
  uploadsApi = new UploadsApi(await getServiceConfig(accessToken));
  return uploadsApi;
};

const getUserService = async (accessToken: string) => {
  usersApi = new UsersApi(await getServiceConfig(accessToken));
  return usersApi;
};

const getCalendarService = async (accessToken: string) => {
  calendarsApi = new CalendarsApi(await getServiceConfig(accessToken));
  return calendarsApi;
};

const getEventTenantService = async (accessToken: string) => {
  eventTenantsApi = new EventTenantsApi(await getServiceConfig(accessToken));
  return eventTenantsApi;
};

const getGuestService = async (accessToken: string) => {
  guestApi = new GuestApi(await getGuestServiceConfig(accessToken));
  return guestApi;
};

export { getTenantService, getEventService, getMatterService, getParticipantService, getPartyService, getExhibitService, getUploadService, getUserService, getCalendarService, getEventTenantService, getGuestService };
