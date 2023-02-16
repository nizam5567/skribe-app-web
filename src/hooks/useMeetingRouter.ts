import { getDatabase, onValue, ref } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EVENT_STATUS, PARTY_TYPE } from '../../consts';
import { MeetingSignature, ParticipantModel, ParticipantStatus, PartyType } from '../types/eventTypes';
import { getStorageItem, setStorageItem } from '../../util/common';
import { useAuthContext } from '../../contexts/AuthContext';
import { getEventService, getParticipantService } from '../../helpers/api-helper';
import { handleApiError } from '../../util/error-handlers';
import { ERROR_MESSAGE_KEY } from '../../consts/consts';
import { saveRoomsEventParticipants } from '../../redux/reducers/roomsEventParticipantsReducer/roomsEventParticipantsAction';
import { saveRoomsMeetingData } from '../../redux/reducers/roomsMeetingDataReducer/roomsMeetingDataAction';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { boundEventsActions } from '../../redux/reducers/eventReducer/eventAction';
import { EventStatus } from '../../openapi';

export const useMeetingRouter = () => {
  const router = useRouter();
  const participantkey = router.query.participantKey as string;
  const dispatch = useDispatch();
  const { authService, accessToken } = useAuthContext();
  const { event } = useAppSelector((state: RootState) => state.eventReducer);

  const [joining, setJoining] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [currentParticipant, setCurrentParticipant] = useState<any>(null);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [meetingData, setMeetingData] = useState<any>(null);
  const [participantZoomData, setParticipantZoomData] = useState<any>(null);
  const [eventPartiesData, setEventPartiesData] = useState<any>(null);

  const getParticipantData = async (participantkey: string) => {
    if (accessToken) {
      if (accessToken) {
        try {
          console.log('participantkey', participantkey);
          const participantService = await getParticipantService(accessToken);
          const response: any = await participantService.getParticipantByKey(participantkey);
          if (response) {
            setMeetingData(response.data);
            dispatch(saveRoomsMeetingData({ 'meetingData': response.data }));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      }
    }
  };

  const getEventInformation = async (eventId: number) => {
    if (accessToken) {
      if (eventId) {
        try {
          const eventService = await getEventService(accessToken);
          const response: any = await eventService.getEventDetail(eventId);
          if (response) {
            boundEventsActions.storeEvent(response.data);
          }
        } catch (error: any) {
          handleApiError(error);
        }
      }
    }
  };

  const getParticipantZoomData = async (participantkey: string) => {
    if (accessToken) {
      try {
        const participantService = await getParticipantService(accessToken);
        const response: any = await participantService.getParticipantMeetingInfo(participantkey);
        if (response) {
          setParticipantZoomData(response.data);
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  const handleRouting = useCallback(
    (meetingStatus: EVENT_STATUS, signature?: MeetingSignature) => {
      console.log('meetingStatus', meetingStatus);
      if (meetingStatus === EVENT_STATUS.IN_PROGRESS && !router.asPath.startsWith(`/meeting-rooms/${participantkey}/live`) && signature) {
        router.push(
          {
            'pathname': `/meeting-rooms/${participantkey}/live`
          },
          undefined,
          { 'shallow': false }
        );
      } else if (meetingStatus === EVENT_STATUS.COMPLETE && !router.asPath.startsWith(`/meeting-rooms/${participantkey}/complete`)) {
        router.push(
          {
            'pathname': `/meeting-rooms/${participantkey}/complete`
          },
          undefined,
          { 'shallow': true }
        );
      } else if (meetingStatus === EVENT_STATUS.SCHEDULED && !router.asPath.startsWith(`/meeting-rooms/${participantkey}/waiting`) && !router.asPath.startsWith(`/meeting-rooms/${participantkey}/live`)) {
        router.push(
          {
            'pathname': `/meeting-rooms/${participantkey}/waiting`
          },
          undefined,
          { 'shallow': false }
        );
      } else if (meetingStatus === EVENT_STATUS.PREFLIGHT) {
        setJoining(true);
        if (!router.asPath.startsWith(`/meeting-rooms/${participantkey}/waiting`) && !router.asPath.startsWith(`/meeting-rooms/${participantkey}/live`)) {
          router.push(
            {
              'pathname': `/meeting-rooms/${participantkey}/waiting`
            },
            undefined,
            { 'shallow': false }
          );
        }
      } else if (meetingStatus === EVENT_STATUS.ERROR && !router.asPath.startsWith('/meeting-rooms/error')) {
        setStorageItem('Event could not be started due to an internal error.', ERROR_MESSAGE_KEY);
        router.push('/meeting-rooms/error', undefined, { 'shallow': true });
      }
    },
    [router]
  );

  useEffect(() => {
    if (status && accessToken && currentParticipant) {
      handleRouting(status, participantZoomData);
    }
  }, [accessToken, status, currentParticipant, participantZoomData]);

  useEffect(() => {
    const signInAnony = async () => {
      // if (!meetingData || !meetingData.token) {
      //   if (tenantId && participantkey && authService) {
      //     try {
      //       await authService.signInAnonymous(
      //         tenantId,
      //         participantkey as string
      //       );
      //     } catch (error) {
      //       console.log("error", error);
      //     }
      //   }
      // }
    };

    if (!accessToken) {
      signInAnony();
    } else {
      console.log('As loggedin user', participantkey);
      if (!meetingData && participantkey) {
        getParticipantData(participantkey);
      }
    }
  }, [participantkey, authService]);

  useEffect(() => {
    if ((!event || event.status === EventStatus.Draft) && meetingData && meetingData.eventid) {
      getEventInformation(meetingData.eventid);
    }
  }, [event, meetingData]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('meetingData', meetingData);
      if (participantkey && meetingData && meetingData.eventid && meetingData.id && accessToken) {
        try {
          if (event) {
            setStatus(event.status);
            setCurrentParticipant(meetingData);
            setEventInfo(event);

            setEventPartiesData([]);
            dispatch(saveRoomsEventParticipants({ 'participants': [] }));
            // setEventData({
            //   ...eventData
            // });
          }

          if (event?.status === EVENT_STATUS.IN_PROGRESS) {
            // setEventData({
            //   ...eventData,
            //   signature: targetParticipant.signature,
            // });
            await getParticipantZoomData(participantkey);
          }
          // else {
          //   setJoining(true);
          // }
        } catch (error) {
          setStorageItem('This event is not properly synchronized, please contact customer support', ERROR_MESSAGE_KEY);
          router.push('/meeting-rooms/error', undefined, { 'shallow': true });
        }
      }
    };
    fetchData();
  }, [participantkey, meetingData, accessToken, router, event]);

  return {
    joining,
    status,
    eventInfo,
    participantZoomData,
    eventPartiesData,
    currentParticipant
  };
};
