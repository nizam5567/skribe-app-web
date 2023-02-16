import { Box, CircularProgress } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CompleteEventGuestOrWitness from '../../components/v2/post-event/CompleteEventGuestOrWitness';
import CompleteEventSchedulingOrAttending from '../../components/v2/post-event/CompleteEventSchedulingOrAttending';
import RejoinEvent from '../../components/v2/post-event/RejoinEvent';
import { PARTY_TYPE } from '../../consts';
import { IS_ANONYMOUS_USER } from '../../consts/consts';
import { useAuthContext } from '../../contexts/AuthContext';
import { getEventService, getParticipantService } from '../../helpers/api-helper';
import { EventResponse, EventStatus, ParticipantResponse } from '../../openapi';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { getEventInfoPublic, getParticipantDataPublic } from '../../services/meetingRoom.service';

const PostEvent: NextPage = () => {
  const { authUser } = useAuthContext();
  const router = useRouter();
  const participantkey = (router.query.participantkey as string) || '';

  const alert = boundSnackbarActions;

  const { accessToken } = useAuthContext();

  const [eventInfo, setEventInfo] = useState<EventResponse>();
  const [participantInfo, setParticipantInfo] = useState<ParticipantResponse>();
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean | undefined>();

  const getParticipantInformation = async (participantkey: string) => {
    if (participantkey && accessToken) {
      try {
        const participantService = await getParticipantService(accessToken);
        const response: any = await participantService.getParticipantByKey(participantkey);
        if (Object.keys(response.data).length > 0) {
          setParticipantInfo(response.data);
          getEventInformation(response.data.eventid);
        } else {
          alert.error('Error when loading event information');
          router.push('/home');
        }
      } catch (error: any) {
        alert.error('Error when loading event information');
        router.push('/home');
      }
    } else {
      router.push('/home');
    }
  };

  const getParticipantInformationPublic = async (participantkey: string) => {
    if (participantkey && accessToken) {
      try {
        const participantData = await getParticipantDataPublic(accessToken, participantkey);
        if (Object.keys(participantData).length > 0) {
          setParticipantInfo(participantData);
          getEventInformationPublic(participantData.eventid);
        } else {
          alert.error('Error when loading event information');
        }
      } catch (error: any) {
        alert.error('Error when loading event information');
      }
    }
  };

  const getEventInformation = async (eventId: number) => {
    if (eventId && accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getEventDetail(eventId);
        if (Object.keys(response.data).length > 0) {
          setEventInfo(response.data);
        } else {
          alert.error('Error when loading event information');
          router.push('/home');
        }
      } catch (error: any) {
        alert.error('Error when loading event information');
        router.push('/home');
      }
    } else {
      router.push('/home');
    }
  };

  const getEventInformationPublic = async (eventId: number) => {
    if (eventId && accessToken) {
      try {
        const eventData = await getEventInfoPublic(accessToken, eventId);

        if (Object.keys(eventData).length > 0) {
          setEventInfo(eventData);
        } else {
          alert.error('Error when loading event information');
        }
      } catch (error: any) {
        alert.error('Error when loading event information');
      }
    }
  };

  // useEffect(() => {
  //   if (authUser) {
  //     console.log("authUser", authUser);
  //     if (authUser && authUser.isAnonymous === true) {
  //       setIsUserAnonymous(true);
  //     } else {
  //       setIsUserAnonymous(false);
  //     }
  //   }
  // }, [authUser]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const isAnonymUser = sessionStorage.getItem(IS_ANONYMOUS_USER);

      if (isAnonymUser) {
        setIsUserAnonymous(true);
      } else {
        setIsUserAnonymous(false);
      }
    }
  }, []);

  useEffect((): any => {
    if (!accessToken) {
      router.push('/home');
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    if (!participantInfo && participantkey && isUserAnonymous === false) {
      getParticipantInformation(participantkey);
    }
    if (participantkey && isUserAnonymous === true) {
      getParticipantInformationPublic(participantkey);
    }
  }, [participantkey, participantInfo, isUserAnonymous]);

  // IF EVENT IS COMPLETE AND PARTICIPANT
  if (eventInfo && participantInfo && eventInfo.status === EventStatus.InProgress) {
    return <RejoinEvent title={eventInfo.title} participantkey={participantInfo.participantKey} />;
  }

  // IF EVENT IS IN PROGRESS
  if (eventInfo && participantInfo && eventInfo.status === EventStatus.Complete) {
    if (participantInfo.partytype === PARTY_TYPE.ATTENDING || participantInfo.partytype === PARTY_TYPE.SCHEDULING) {
      return <CompleteEventSchedulingOrAttending title={eventInfo.title} matterId={eventInfo.matterid} eventId={eventInfo.id} />;
    }
    return <CompleteEventGuestOrWitness title={eventInfo.title} />;
  }

  return (
    <>
      <Box height="100vh" width="100%" display="flex" justifyContent={'center'} alignItems="center">
        <CircularProgress color="primary" />
      </Box>
    </>
  );
};

export default PostEvent;
