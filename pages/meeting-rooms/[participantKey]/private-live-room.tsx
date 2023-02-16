import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/EventRoom.module.scss';
import LiveRoom from '../../../components/Rooms/LiveRoom';
import { EventStatus } from '../../../openapi';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { saveRoomsCurrentParticipant } from '../../../redux/reducers/roomsCurrentParticipantReducer/roomsCurrentParticipantAction';
import { saveRoomsEventParticipants } from '../../../redux/reducers/roomsEventParticipantsReducer/roomsEventParticipantsAction';
import { saveRoomsParticipantZoomData } from '../../../redux/reducers/roomsParticipantZoomDataReducer/roomsParticipantZoomDataAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import {
  getEventInformation,
  getEventParticipantsByEventId,
  getParticipantData,
  getParticipantZoomData
} from '../../../services/meetingRoom.service';
import { handleApiError } from '../../../util/error-handlers';

const PrivateLiveRoom = () => {
  console.log('PrivateLiveRoom');
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
        const participantData = await getParticipantData(
          accessToken,
          participantkey
        );
        // console.log("participantData", participantData);
        dispatch(
          saveRoomsCurrentParticipant({ 'currentParticipant': participantData })
        );
      } catch (error: any) {
        handleApiError(error);
      }
    },

    'getEventInfo': async function (accessToken: string) {
      try {
        const eventData: any = await getEventInformation(
          accessToken,
          currentParticipant.eventid
        );
        // console.log("eventInfoData", eventData);
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
          console.log('response event', eventData);
          alert.error('Problem to get the event');
        }
      } catch (error: any) {
        handleApiError(error);
      }
    },

    'fetchParticipantZoomData': async function (accessToken: string) {
      try {
        const zoomData = await getParticipantZoomData(
          accessToken,
          participantkey
        );
        dispatch(
          saveRoomsParticipantZoomData({ 'participantZoomData': zoomData })
        );
      } catch (error: any) {
        handleApiError(error);
      }
    },

    'getEventParticipants': async function (accessToken: string) {
      try {
        const participantsData = await getEventParticipantsByEventId(
          accessToken,
          currentParticipant.eventid
        );
        dispatch(
          saveRoomsEventParticipants({ 'participants': participantsData })
        );
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Event Room</title>
        <meta name="description" content="Event Room" />
      </Head>
      <main className={styles.main}>
        <LiveRoom zoomApi={zoomApi} />
      </main>
    </div>
  );
};

export default PrivateLiveRoom;
