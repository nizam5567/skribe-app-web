import { v4 as uuidv4 } from 'uuid';

const mockEventsData: any = [];

const mockPartiesData: any = [];

const mockParticipantsData: any = [];

const mockWitnessData: any = [];

const mockGuestData: any = [];

let personalInformation: any = {};

let organizationInformation: any = {};

export function eventMockService () {
  return {
    'getEvents': async () => await Promise.resolve({
      'data': {
        'events': mockEventsData
      }
    }),
    'createEvent': async (params: any) => {
      const { title, matterName, type, sharableLink, dateStart, startTime, endTime, timeZone } = params;
      const id = uuidv4();

      mockEventsData.unshift({
        id,
        'status': 'schedule',
        ...params
      });

      return await Promise.resolve({
        'data': {
          id,
          'status': 'schedule',
          ...params
        }
      });
    },

    'updateEvent': async (params: any) => {
      const { id, title, matterName, type, sharableLink, dateStart, startTime, endTime, timeZone } = params;

      const mockData = mockEventsData.find((item: any) => item.id === params.id);

      mockData.title = params.title;
      mockData.matterName = params.matterName;
      mockData.type = params.type;
      mockData.sharableLink = params.sharableLink;
      mockData.dateStart = params.dateStart;
      mockData.startTime = params.startTime;
      mockData.endTime = params.endTime;
      mockData.timeZone = params.timeZone;

      return await Promise.resolve({
        'data': {
          'id': params.id,
          'title': params.title,
          'matterName': params.matterName,
          'type': params.type,
          'sharableLink': params.sharableLink,
          'dateStart': params.dateStart,
          'startTime': params.startTime,
          'endTime': params.endTime,
          'timeZone': params.timeZone
        }
      });
    },

    'getEventById': async (id: string) => {
      const mockData = mockEventsData.find((item: any) => item.id === id);

      return await Promise.resolve({
        'data': {
          'title': mockData.title,
          'matterName': mockData.matterName,
          'type': mockData.type,
          'sharableLink': mockData.sharableLink,
          'dateStart': mockData.dateStart,
          'startTime': mockData.startTime,
          'endTime': mockData.endTime,
          'timeZone': mockData.timeZone
        }
      });
    }
  };
}

export function partyMockService () {
  return {
    'getPartyById': async (eventId: any, partyId: any) => {
      const selectedParty = mockPartiesData.filter((item: any) => {
        if (item.eventId === eventId && item.partyId === partyId) {
          return true;
        }
        return false;
      });

      return await Promise.resolve({
        'data': {
          'party': selectedParty
        }
      });
    },

    'getAllParty': async (id: any) => {
      const filterData = mockPartiesData.filter((item: any) => item.eventId === id);
      return await Promise.resolve({
        'data': {
          'parties': filterData
        }
      });
    },

    // in the params, along with witness data, we need to provide event id as well
    'createParties': async (paramsArr: any) => {
      for (const params of paramsArr) {
        mockPartiesData.push({
          'id': uuidv4(),
          ...params
        });
      }

      // returning all parties of the same event
      const filterData = mockPartiesData.filter((item: any) => item.eventId === paramsArr[0].eventId);

      return await Promise.resolve({
        'data': {
          'parties': filterData
        }
      });
    }
  };
}

export function participantMockService () {
  return {
    'getParticipantsById': async (id: any) => {
      const filterData = mockParticipantsData.filter((item: any) => item.id === id);
      return await Promise.resolve({
        'data': {
          'participants': filterData
        }
      });
    },
    'getAllParticipantsByEventId': async (eventId: any) => {
      const filterData = mockParticipantsData.filter((item: any) => item.eventId === eventId);
      return await Promise.resolve({
        'data': {
          'participants': filterData
        }
      });
    },
    'getAllParticipantsByEventIdAndPartyId': async (eventId: any, partyId: any) => {
      const filterData = mockParticipantsData.filter((item: any) => item.eventId === eventId && item.partyId === partyId);
      console.log('filterData', filterData);
      return await Promise.resolve({
        'data': {
          'participants': filterData
        }
      });
    },
    'createParticipants': async (paramsArr: any) => {
      for (const params of paramsArr) {
        mockParticipantsData.push({
          'id': uuidv4(),
          ...params
        });
      }

      const filterData = mockParticipantsData.filter((item: any) => item.eventId === paramsArr[0].eventId);

      return await Promise.resolve({
        'data': {
          'participants': filterData
        }
      });
    },
    'deleteParticipant': async (id: any) => {
      mockParticipantsData.splice(
        mockParticipantsData.findIndex((i: any) => i.id === id),
        1
      );

      return await Promise.resolve({
        'data': {
          'partipants': mockParticipantsData
        }
      });
    }
  };
}

export function witnessMockService () {
  return {
    'getWitnessById': async (eventId: any, witnessId: any) => {
      const filterEvent = mockWitnessData.filter((item: any) => {
        if (item.eventId === eventId) {
          return true;
        }
        return false;
      });

      let selectedWitness;
      const filterWitness = filterEvent.filter((item: any) => {
        const witnessArr = item.listOfWitnessToAdd.filter((witness: any) => {
          if (witness.id === witnessId) {
            return true;
          }
          return false;
        });

        if (witnessArr.length === 1) {
          selectedWitness = witnessArr[0];
          return true;
        }
      });

      return await Promise.resolve({
        'data': {
          'witness': selectedWitness
        }
      });
    },

    'getAllWitness': async (eventId: any) => {
      const filterData = mockWitnessData.filter((item: any) => item.eventId === eventId);
      return await Promise.resolve({
        'data': {
          'witness': filterData
        }
      });
    },

    // in the params, along with witness data, we need to provide event id as well
    'createWitness': async (paramsArr: any) => {
      for (const params of paramsArr) {
        mockWitnessData.push({
          'id': uuidv4(),
          ...params
        });
      }

      // returnign all witness of the same event
      const filterData = mockWitnessData.filter((item: any) => item.eventId === paramsArr[0].eventId);

      return await Promise.resolve({
        'data': {
          'witness': filterData
        }
      });
    },

    'updateWitness': async (eventId: any, params: any) => {
      const { id, firstName, lastName, email, title, party } = params;

      const filterEvent = mockWitnessData.filter((item: any) => {
        if (item.eventId === eventId) {
          return true;
        }
        return false;
      });

      let selectedWitness: any;
      const filterWitness = filterEvent.filter((item: any) => {
        const witnessArr = item.listOfWitnessToAdd.filter((witness: any) => {
          if (witness.id === params.id) {
            return true;
          }
          return false;
        });

        if (witnessArr.length === 1) {
          selectedWitness = witnessArr[0];
          return true;
        }
      });

      selectedWitness.firstName = params.firstName;
      selectedWitness.lastName = params.lastName;
      selectedWitness.email = params.email;
      selectedWitness.title = params.title;
      selectedWitness.party = params.party;

      return await Promise.resolve({
        'data': {
          'id': params.id,
          'firstName': params.firstName,
          'lastName': params.lastName,
          'email': params.email,
          'title': params.title,
          'party': params.party
        }
      });
    },

    'deleteWitness': async (id: any) => {
      mockWitnessData.splice(
        mockWitnessData.findIndex((i: any) => i.id === id),
        1
      );

      return await Promise.resolve({
        'data': {
          'witness': mockWitnessData
        }
      });
    }
  };
}

export function guestMockService () {
  return {
    'getAllGuestsByEventId': async (eventId: any) => {
      const filterData = mockGuestData.filter((item: any) => item.eventId === eventId);
      return await Promise.resolve({
        'data': {
          'guests': filterData
        }
      });
    },

    // in the params, along with witness data, we need to provide event id as well
    'createGuest': async (paramsArr: any) => {
      for (const params of paramsArr) {
        mockGuestData.push({
          'id': uuidv4(),
          ...params
        });
      }

      // returnign all witness of the same event
      const filterData = mockGuestData.filter((item: any) => item.eventId === paramsArr[0].eventId);

      return await Promise.resolve({
        'data': {
          'guests': filterData
        }
      });
    }
  };
}

export function userMockService () {
  return {
    'savePersonalInformation': async (param: object) => {
      personalInformation = { ...param };

      return await Promise.resolve({
        'data': {
          'info': personalInformation
        }
      });
    },

    'saveOrganizationInformation': async (param: object) => {
      organizationInformation = { ...param };
      return await Promise.resolve({
        'data': {
          'info': organizationInformation
        }
      });
    }
  };
}
