import { getEventService, getGuestService, getParticipantService } from '../helpers/api-helper';

export const getParticipantData = async (accessToken: string, participantkey: string) => {
  try {
    // console.log("participantkey", participantkey);
    const participantService = await getParticipantService(accessToken);
    const response: any = await participantService.getParticipantByKey(participantkey);

    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getParticipantDataPublic = async (accessToken: string, participantkey: string) => {
  if (accessToken) {
    try {
      // console.log("participantkey", participantkey);
      const guestService = await getGuestService(accessToken);
      const response: any = await guestService.getParticipantByKeyPublic(participantkey);

      if (response) {
        return response.data;
      }
    } catch (error: any) {
      throw error;
    }
  }
};

export const getEventInformation = async (accessToken: string, eventId: number) => {
  try {
    // console.log("getEventInformation", eventId);
    const eventService = await getEventService(accessToken);
    const response: any = await eventService.getEventDetail(eventId);

    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getParticipantZoomData = async (accessToken: string, participantkey: string) => {
  try {
    const participantService = await getParticipantService(accessToken);
    const response: any = await participantService.getParticipantMeetingInfo(participantkey);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getParticipantZoomDataPublic = async (accessToken: string, participantkey: string) => {
  try {
    const guestService = await getGuestService(accessToken);
    const response: any = await guestService.getParticipantMeetingInfoPublic(participantkey);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getEventParticipantsByEventId = async (accessToken: string, eventId: number) => {
  try {
    const eventService = await getEventService(accessToken);
    const response: any = await eventService.getParticipants(eventId);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getEventParticipantsByEventIdPublic = async (accessToken: string, eventId: number) => {
  try {
    const eventService = await getGuestService(accessToken);
    const response: any = await eventService.getParticipants(eventId);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getEventInfoPublic = async (accessToken: string, eventId: number) => {
  try {
    const guestService = await getGuestService(accessToken);
    const response: any = await guestService.getGuestEvent_1(eventId);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getEventInfoByEventCode = async (accessToken: string, eventCode: string) => {
  try {
    const guestService = await getGuestService(accessToken);
    const response: any = await guestService.getGuestEvent(eventCode);
    if (response) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};
