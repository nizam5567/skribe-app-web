import * as process from 'process';
import { fetchWrapper } from '../helpers';

const mockBaseUrl = 'https://virtserver.swaggerhub.com/nizam2/skribe-public_api/1.0.0';

const createEvent = async (eventSchema: object) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/events`, eventSchema);
  // const res = await fetchWrapper.post(`${process.env.BASE_URL}/api/v1/events`, eventSchema);
  console.log('event', res);
  // return "auth/onboard post call";
  return res;
};

const updateEvent = async (eventSchema: object) => {
  const res = await fetchWrapper.put(`${process.env.BASE_URL}/api/v1/events`, eventSchema);
  console.log('event', res);
  // return "auth/onboard post call";
  return res;
};

const createParties = async (partySchema: object) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/parties`, partySchema);
  // const res = await fetchWrapper.post(`${baseUrl}/api/v1/events`, eventSchema);
  console.log('party', res);
  // return "auth/onboard post call";
  return res;
};

const getPartiesByEventID = async (event: string) => await fetchWrapper.get(`${process.env.BASE_URL}/parties/getByEventId?eventId=${event}`);

const createWitness = async (witnessSchema: object) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/witnesses`, witnessSchema);
  console.log('witness', res);
  return res;
};

const createParticipant = async (participantSchema: object) => {
  const res = await fetchWrapper.post(`${process.env.BASE_URL}/participants`, participantSchema);
  console.log('Participant', res);
  return res;
};

export const eventService = {
  createEvent,
  updateEvent,
  createParties,
  getPartiesByEventID,
  createWitness,
  createParticipant
};
