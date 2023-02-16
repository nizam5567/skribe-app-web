import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/EventRoom.module.scss';
import LiveRoom from '../../../components/Rooms/LiveRoom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { EventStatus } from '../../../openapi';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { saveRoomsCurrentParticipant } from '../../../redux/reducers/roomsCurrentParticipantReducer/roomsCurrentParticipantAction';
import { saveRoomsEventParticipants } from '../../../redux/reducers/roomsEventParticipantsReducer/roomsEventParticipantsAction';
import { saveRoomsParticipantZoomData } from '../../../redux/reducers/roomsParticipantZoomDataReducer/roomsParticipantZoomDataAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import {
  getEventInfoPublic,
  getEventParticipantsByEventIdPublic,
  getParticipantDataPublic,
  getParticipantZoomDataPublic
} from '../../../services/meetingRoom.service';
import { handleApiError } from '../../../util/error-handlers';
import { getStorageItem } from '../../../util/common';
import { TOKEN_KEY } from '../../../consts/consts';

const PublicLiveRoom = () => {
  // console.log("LiveEventRoom")
  const { accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const participantkey = router.query.participantKey as string;
  const currentParticipant = useSelector(
    (state: any) => state?.roomsCurrentParticipantReducer.currentParticipant
  );
  const alert = boundSnackbarActions;

  const zoomApi = {
    'getParticipantInfo': async function (accessToken: string) {
      try {
        const participantData = await getParticipantDataPublic(
          accessToken,
          participantkey
        );
        dispatch(
          saveRoomsCurrentParticipant({ 'currentParticipant': participantData })
        );
      } catch (error: any) {
        handleApiError(error);
      }
    },
    'getEventInfo': async function (accessToken: string) {
      try {
        const eventData = await getEventInfoPublic(
          accessToken,
          currentParticipant.eventid
        );
        if (eventData) {
          boundEventsActions.storeEvent(eventData);
          switch (eventData?.status) {
            case EventStatus.Scheduled: {
              router.push(`/meeting-rooms/${participantkey}/waiting`);

              break;
            }
            case EventStatus.Complete: {
              router.push(`/post-event/${participantkey}`);

              break;
            }
          // No default
          }
        } else {
          alert.error('Problem to get the event');
        }
      } catch (error: any) {
        alert.error('Problem to get the event');
        handleApiError(error);
      }
    },
    'fetchParticipantZoomData': async function (accessToken: string) {
      try {
        const zoomData = await getParticipantZoomDataPublic(
          accessToken,
          participantkey
        );
        dispatch(
          saveRoomsParticipantZoomData({ 'participantZoomData': zoomData })
        );
      } catch (error: any) {
        alert.error('Problem to get the Participant ZoomData');
        handleApiError(error);
      }
    },
    'getEventParticipants': async function (accessToken: string) {
      try {
        const participantsData = await getEventParticipantsByEventIdPublic(
          accessToken,
          currentParticipant.eventid
        );
        dispatch(
          saveRoomsEventParticipants({ 'participants': participantsData })
        );
      } catch (error: any) {
        // alert.error("Problem to get the participantsData");
        handleApiError(error);
      }
    }
  };

  // useEffect(() => {
  //   const token = getStorageItem(TOKEN_KEY);
  //   const signInAnony = async () => {
  //     try {
  //       await authService?.signInAnonymous();
  //     } catch (error) {
  //       alert.error("Problem to get the authService");
  //     }
  //   };
  //   if (!accessToken) {
  //     signInAnony();
  //   }
  // }, [accessToken]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <LiveRoom zoomApi={zoomApi} />
      </main>
    </div>
  );
};

export default PublicLiveRoom;
