import { Box, CircularProgress, Stack } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ArchiveRecordSection from '../../../../components/aNewRecordProcess/ArchiveRecordSection';
import RecordSection from '../../../../components/v2/archive-section/RecordSection';
import ArchiveEventDetails from '../../../../components/v2/event-details/ArchiveEventDetails';
import EventDetails from '../../../../components/v2/event-details/EventDetails';
import ArchieveRecord from '../../../../components/v2/exhibits/ArchieveRecord';
import DeleteExhibitModal from '../../../../components/v2/exhibits/DeleteExhibitModal';
import PreviewExhibitModal from '../../../../components/v2/exhibits/PreviewExhibitModal';
import UploadExhibit from '../../../../components/v2/exhibits/UploadExhibit';
import InvitePartyModal from '../../../../components/v2/invite-party/InvitePartyModal';
import TopNavigation from '../../../../components/v2/navigation/TopNavigation';
import PostMatterDisplaySection from '../../../../components/v2/post-event/PostMatterDisplaySection';
import ArchiveEventBasicInformation from '../../../../components/v2/schedule-event/ArchiveEventBasicInformation';
import ArchiveExhibitSection from '../../../../components/v2/schedule-event/ArchiveExhibitSection';
import ArchiveMatterDisplaySection from '../../../../components/v2/schedule-event/ArchiveMatterDisplaySection';
import EventBasicInformation from '../../../../components/v2/schedule-event/EventBasicInformation';
import ExhibitSection from '../../../../components/v2/schedule-event/ExhibitSection';
import MatterDisplaySection from '../../../../components/v2/schedule-event/MatterDisplaySection';
import PartySection from '../../../../components/v2/schedule-event/PartySection';
import StipulationSection from '../../../../components/v2/schedule-event/StipulationSection';
import StipulationModal from '../../../../components/v2/stipulation/StipulationModal';
import TheRecord from '../../../../components/v2/the-record/TheRecord';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getCalendarService, getEventService, getExhibitService, getMatterService, getPartyService } from '../../../../helpers/api-helper';
import { EventResponse, EventStatus, MatterResponse, PartyResponse } from '../../../../openapi';
import { boundEventsActions } from '../../../../redux/reducers/eventReducer/eventAction';
import { boundExhibitsActions } from '../../../../redux/reducers/exhibitReducer/exhibitAction';
import { boundMattersActions } from '../../../../redux/reducers/matterReducer/matterAction';
import { boundPartiesExhibitsOfEventsReducer } from '../../../../redux/reducers/partyExhibitReducer/partyExhibitAction';
import { boundPartysActions } from '../../../../redux/reducers/partyReducer/partyAction';
import { boundSnackbarActions } from '../../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../../redux/store/hooks';
import { RootState } from '../../../../redux/store/store';
import { handleApiError } from '../../../../util/error-handlers';

const Event: NextPage = () => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const { matters, matter } = useAppSelector((state: RootState) => state.mattersReducer);
  const { events, event } = useAppSelector((state: RootState) => state.eventReducer);
  const { partiesByEventId } = useAppSelector((state: RootState) => state.partiesExhibitsOfEventsReducer);
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;
  const alert = boundSnackbarActions;
  const dispatch = useDispatch();
  const [eventDataFound, setEventDataFound] = useState(false);
  const [matterDataFound, setMatterDataFound] = useState(false);
  const [partyDataFound, setPartyDataFound] = useState(false);
  const [privateExhibitFound, setPrivateExhibitFound] = useState(false);
  const [publicExhibitFound, setPublicExhibitFound] = useState(false);
  const [isMatterSavedInStore, setIsMatterSavedInStore] = useState(false);
  const [isEventSavedInStore, setIsEventSavedInStore] = useState(false);

  useEffect(() => {
    const getExhibitsOfAParty = async (eventId: number) => {
      if (accessToken) {
        try {
          const eventService = await getEventService(accessToken);
          const response = await eventService.getExhibitsByParty(eventId);
          boundExhibitsActions.storeExhibits(response?.data?.exhibits);
          setPrivateExhibitFound(true);
        } catch (error: any) {
          handleApiError(error);
        }
      }
    };
    const getParties = async (eventId: number) => {
      if (eventId && accessToken) {
        try {
          const partyService = await getPartyService(accessToken);
          const response: any = await partyService.getPartiesByEvent(eventId);
          if (response.data.parties && response.data.parties.length !== 0) {
            response.data.parties.map((party: PartyResponse) => {
              if (party.partytype && party.partytype.toLowerCase() === 'scheduling') {
                boundPartysActions.storeSchedulingPartyId(party.id);
              }
            });
            boundPartysActions.storeParties(response.data.parties);
            boundPartiesExhibitsOfEventsReducer.storePartiesByEventId({ [eventId]: response.data.parties });
          }
          setPartyDataFound(true);
        } catch (error: any) {
          // alert.error("Error when loading parties information");
          router.push('/home');
        }
      } else {
        router.push('/home');
      }
    };
    const getMatterInformation = async (matterId: number) => {
      if (matterId && accessToken) {
        try {
          const matterService = await getMatterService(accessToken);
          const response: any = await matterService.getMatter(matterId);
          boundMattersActions.storeMatter(response.data);
          setMatterDataFound(true);
          setIsMatterSavedInStore(true);
        } catch (error: any) {
          alert.error('Error when loading matter information');
          router.push('/home');
        }
      } else {
        router.push('/home');
      }
    };
    const getEventInformation = async (eventId: number) => {
      if (eventId && accessToken) {
        try {
          const eventService = await getEventService(accessToken);
          const response: any = await eventService.getEventDetail(eventId);
          if (response && response.data) {
            boundMattersActions.updateEventUnderMatter(response.data);
            boundEventsActions.storeEvent(response.data);
            const matterInfo: MatterResponse = {
              'id': response.data.matterid,
              'title': response.data.mattertitle,
              'description': '',
              'events': []
            };
            matters &&
              matters?.map((matter: any) => {
                if (matter.id === Number(matterId)) {
                  matterInfo.events = [...matter.events, response.data];
                }
              });
            boundMattersActions.storeMatter(matterInfo);
          }
          setEventDataFound(true);
          setIsEventSavedInStore(true);
        } catch (error: any) {
          alert.error('Error when loading event information');
          router.push('/home');
        }
      } else {
        router.push('/home');
      }
    };
    const getPublicExhibits = async (eventId: number) => {
      if (accessToken) {
        try {
          const eventService = await getEventService(accessToken);
          const response: any = await eventService.getExhibitsByEvent(eventId);
          if (response?.status === 200) {
            boundExhibitsActions.storePublicExhibits(response?.data?.exhibits);
          }
          setPublicExhibitFound(true);
        } catch (error: any) {
          router.push('/home');
        }
      }
    };
    const getConnectedParties = async () => {
      if (accessToken) {
        try {
          const partyService = await getPartyService(accessToken);
          const response = await partyService.myConnectionParties();
          if (response.status === 200) {
            const connectedParties = response?.data?.tenants ? response?.data?.tenants : [];
            boundPartysActions.storeConnectedParties(connectedParties);
          }
        } catch (error: any) {
          handleApiError(error);
        }
      }
    };
    const clearReduxStore = () => {
      boundMattersActions.clearSearchMatter();
    };

    const getMatterEventFromStore = (matterId: number, eventId: number) => {
      const matterEvent: any = {
        'matter': undefined,
        'event': undefined
      };

      // find matter and event info from redux
      matters &&
        matters?.map((matter: any) => {
          if (matter.id === Number(matterId)) {
            boundMattersActions.storeMatter(matter);

            setIsMatterSavedInStore(true);

            matterEvent.matter = matter;
            matter.events &&
              matter.events.map((event: EventResponse) => {
                if (event.id === eventId) {
                  boundEventsActions.storeEvent(event);
                  setIsEventSavedInStore(true);

                  matterEvent.event = event;
                }
              });
          }
        });

      return matterEvent;
    };

    const getPartiesFromStore = (eventId: number) => {
      let isEventIdFound = false;
      if (partiesByEventId) {
        for (let i = 0; i < partiesByEventId.length; i++) {
          const item = partiesByEventId[i];
          const key = Object.keys(item)[0];
          if (item.hasOwnProperty(eventId)) {
            boundPartysActions.storeParties(item[key]);
            isEventIdFound = true;
            setPartyDataFound(true);
            break;
          }
        }
      }
      return isEventIdFound;
    };

    if (Number(matterId) && Number(eventId)) {
      const matterEvent = getMatterEventFromStore(Number(matterId), Number(eventId));

      if (!matterEvent?.matter) {
        // getMatterInformation(Number(matterId));
      }

      if (!matterEvent?.event) {
        getEventInformation(Number(eventId));
      }

      if (!getPartiesFromStore(Number(eventId))) {
        getParties(Number(eventId));
      }

      getConnectedParties();
      getExhibitsOfAParty(Number(eventId));
      getPublicExhibits(Number(eventId));
      clearReduxStore();
    }
  }, [eventId]);

  return (
    <Box sx={{ 'background': '#f8f9f9' }}>
      <Fragment>
        <EventDetails />
        <ArchiveEventDetails />
        <InvitePartyModal />

        <StipulationModal />
        <UploadExhibit />
        <ArchieveRecord />
        <PreviewExhibitModal />
        <DeleteExhibitModal />
        <Box minHeight="100vh">
          <TopNavigation />
          <Box minHeight="90vh" sx={{ 'margin': { 'xs': '0 24px 24px', 'md': '0 128px 0' }, 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3} mb={3} pb={15}>
            {isEventSavedInStore && event?.status && event?.status !== EventStatus.Archive && event?.status !== EventStatus.ArchiveComplete && (

              <>
                <MatterDisplaySection />
                <EventBasicInformation />
                {/* <StipulationSection partyDataFound={partyDataFound} /> */}
                {event?.status && event?.status === EventStatus.Complete && <TheRecord eventId={event.id} />}
                <PartySection partyDataFound={partyDataFound} />
                <ExhibitSection publicExhibitFound={publicExhibitFound} privateExhibitFound={privateExhibitFound} />
              </>
            )}

            {isEventSavedInStore && event?.status && (event?.status === EventStatus.Archive || event?.status === EventStatus.ArchiveComplete) && (
              <>
                <ArchiveMatterDisplaySection />
                <ArchiveEventBasicInformation />
                {event?.status && event?.status === EventStatus.Archive && <RecordSection />}
                {event?.status && event?.status === EventStatus.ArchiveComplete && <ArchiveRecordSection eventId={event.id} />}
                <ArchiveExhibitSection publicExhibitFound={publicExhibitFound} privateExhibitFound={privateExhibitFound} />
              </>
            )}
          </Box>
        </Box>
      </Fragment>
    </Box>
  );
};

export default Event;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}