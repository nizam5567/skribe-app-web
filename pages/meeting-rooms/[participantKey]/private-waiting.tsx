import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/WaitingRoom.module.scss';
import { EVENT_STATUS, PARTY_TYPE } from '../../../consts';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import EmailIcon from '../../../components/svg-components/EmailIcon';
import SkribeLogo from '../../../components/svg-components/SkribeLogo';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { EventStatus } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getEventInformation, getParticipantData } from '../../../services/meetingRoom.service';
import { handleApiError } from '../../../util/error-handlers';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { saveRoomsCurrentParticipant } from '../../../redux/reducers/roomsCurrentParticipantReducer/roomsCurrentParticipantAction';
import Modal from '../../../components/Modal';
import { MediaOnboardingDialog } from '../../../components/Rooms/MediaOnboardingDialog';
import { RECORDING_STATUS, RECORDING_CURRENT_TIMESTAMP, RECORDING_DURATION, IS_STARTED_MEETING } from '../../../consts/consts';
import { removeStorageItem } from '../../../util/common';

const PrivateWaiting = () => {
  const { authService, accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const participantkey = router.query.participantKey as string;
  const alert = boundSnackbarActions;
  const currentParticipant = useSelector((state: any) => state?.roomsCurrentParticipantReducer.currentParticipant);
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStarting, setIsStarting] = useState(false);
  const [msgTitle, setMsgTitle] = useState<string>('');
  const [msgContent, setMsgContent] = useState<string | ReactNode>('');
  const [isStartedByCurrentUser, setIsStartedByCurrentUser] = useState<boolean>(false);

  const [modalTitle, setModalTitle] = useState('Test Mic and Camera');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [showMicCamPermission, setShowMicCamPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentParticipant && event) {
      // console.log("eventInfo", event);
      setIsLoading(false);
    }
  }, [currentParticipant, event]);

  const getParticipantInfo = async () => {
    if (accessToken) {
      try {
        const participantData = await getParticipantData(accessToken, participantkey);
        // console.log("participantData", participantData);
        dispatch(saveRoomsCurrentParticipant({ 'currentParticipant': participantData }));
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    console.log('As loggedin user', participantkey);
    if (accessToken && !currentParticipant && participantkey) {
      getParticipantInfo();
    }
  }, [accessToken, participantkey, authService]);

  const getEventInfo = async () => {
    if (accessToken) {
      try {
        const eventData: any = await getEventInformation(accessToken, currentParticipant.eventid);
        // console.log("eventInfoData", eventData);
        boundEventsActions.storeEvent(eventData);
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    if (accessToken && !event && currentParticipant && currentParticipant.eventid) {
      getEventInfo();
    }
  }, [accessToken, currentParticipant, event]);

  useEffect(() => {
    setMsgTitle("Don't go anywhere!");
    setMsgContent("The event hosts have been notified that you're ready.");
    if (currentParticipant?.partytype === PARTY_TYPE.SCHEDULING) {
      setMsgTitle('Ready to start the event room?');
      const content = (
        <>
          When you press the Start Event button, you&apos;ll be placed into the meeting as one of the event hosts. <br />
          <br />
          You can approve guests, observers, and the witness to join the meeting.
        </>
      );
      setMsgContent(content);
    }
  }, [currentParticipant]);

  useEffect(() => {
    if (event?.status === EVENT_STATUS.PREFLIGHT) {
      alert.success('Event is about to begin', { 'timeout': 6000 });
    }
  }, []);

  const handleJoin = async () => {
    try {
      if (currentParticipant.eventid && accessToken) {
        console.log('Starting event...');
        setIsStarting(true);
        setIsStartedByCurrentUser(true);
        removeStorageItem(RECORDING_STATUS);
        removeStorageItem(RECORDING_CURRENT_TIMESTAMP);
        removeStorageItem(RECORDING_DURATION);
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.startEvent({
          'eventid': currentParticipant.eventid,
          'tenantid': 1,
          'email': currentParticipant.email
        });
        console.log('response', response);
        if (response) {
          setIsStarting(false);
          removeStorageItem(IS_STARTED_MEETING);
          router.push(
            {
              'pathname': '/meeting-rooms/[participantkey]/live',
              'query': { 'participantkey': currentParticipant.participantKey }
            },
            undefined,
            { 'shallow': false }
          );
        } else {
          console.log('response', response);
          alert.error('Problem to start the event');
        }
      }
    } catch (error) {
      console.log('error', error);
      setIsStarting(false);
    }
  };

  useEffect(() => {
    const intervalGetEvent = setInterval(() => {
      if (!isStartedByCurrentUser && event && currentParticipant && currentParticipant.eventid && (event?.status === EventStatus.Scheduled || event?.status === EventStatus.Preflight)) {
        getEventInfo();
      }
    }, 5000);

    if (event?.status === EventStatus.InProgress) {
      console.log('clearing');
      clearInterval(intervalGetEvent);
      removeStorageItem(IS_STARTED_MEETING);
      router.push(
        {
          'pathname': `/meeting-rooms/${participantkey}/live`
        },
        undefined,
        { 'shallow': false }
      );
    }

    return () => clearInterval(intervalGetEvent);
  }, [event, currentParticipant]);

  const getEventJoinLink = async (eventId: string) => {
    if (eventId && accessToken) {
      try {
        const participantService = await getEventService(accessToken);
        await participantService.getParticipantLink(eventId);
        console.log('send email');
      } catch (error: any) {
        console.log('error', error);
      }
    }
  };

  useEffect(() => {
    if (event) {
      const getEmailSend = sessionStorage.getItem('personalLinkEmail');
      if (!getEmailSend || (getEmailSend && getEmailSend?.split('-')[1] !== event.id.toString())) {
        getEventJoinLink(event.id);
        sessionStorage.setItem('personalLinkEmail', `${Date.now()}-${event.id}`);
      }
    }
  }, [event?.id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Waiting Room</title>
        <meta name="description" content="waiting room" />
      </Head>
      <main className={styles.main}>
        {!isLoading ? (
          <>
            <Box className={styles.content}>
              <Box className={styles['circle-top1']}></Box>
              <Box className={styles['circle-top2']}></Box>
              <Box
                sx={{
                  'zIndex': 2,
                  'overflowY': 'auto',
                  'height': '100%',
                  'position': 'relative',
                  'boxShadow': '0px 23px 162px rgba(0, 0, 0, 0.1)',
                  'backgroundColor': '#FFF',
                  'borderRadius': '5px'
                }}
              >
                <Box
                  sx={{
                    'borderBottom': '1px solid #D1D3D5',
                    'padding': '40px 30px 15px 30px'
                  }}
                >
                  <Box>
                    <Link href="/events">
                      <a>
                        <SkribeLogo />
                      </a>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      'padding': '20px 0 0'
                    }}
                  >
                    <Box
                      sx={{
                        'color': '#01090F',
                        'fontSize': '1.25rem',
                        'fontWeight': '600'
                      }}
                    >
                      {event?.title}
                    </Box>
                    {/* <Box
                      sx={{
                        color: "#7C8286",
                        fontSize: "0.875rem",
                        paddingTop: "5px",
                      }}
                    >
                      {event?.mattertitle}
                    </Box> */}
                  </Box>
                </Box>
                <Box sx={{ 'padding': '40px 30px' }}>
                  <Box
                    sx={{
                      'fontSize': '1.25rem',
                      'fontWeight': '600'
                    }}
                  >
                    {msgTitle}
                  </Box>
                  <Box
                    sx={{
                      'fontSize': '0.875rem',
                      'fontWeight': '400',
                      'padding': '15px 0'
                    }}
                  >
                    {msgContent}
                  </Box>
                  <Box>
                    {currentParticipant?.partytype === PARTY_TYPE.SCHEDULING && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleJoin();
                        }}
                        sx={{ 'background': '#02178c' }}
                        disabled={isStarting || event?.status !== EVENT_STATUS.SCHEDULED}
                        startIcon={isStarting && <CircularProgress size="1rem" color="inherit" />}
                      >
                        Start Event
                      </Button>
                    )}

                    <Button onClick={() => handleModalOpen()} type="button" variant="outlined" color="secondary" sx={{ 'marginLeft': '10px', 'background': '#02178c', 'color': '#fff' }}>
                      Test Mic & Camera
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    'padding': '15px 30px',
                    'margin': '15px 15px',
                    'background': 'rgba(157, 163, 168, 0.07);',
                    'borderRadius': '5px'
                  }}
                >
                  <Box
                    sx={{
                      'fontSize': '1.25rem',
                      'fontWeight': '600',
                      'padding': '0 0 10px'
                    }}
                  >
                    <span>
                      <EmailIcon />
                    </span>{' '}
                    Your Personal Link
                  </Box>
                  <Box
                    sx={{
                      'fontSize': '1rem',
                      'fontWeight': '400'
                    }}
                  >
                    {'We\'ve emailed you this link in case you need to rejoin.'}
                  </Box>
                </Box>
              </Box>
              <Box className={styles['circle-bottom']}></Box>
            </Box>
          </>
        ) : (
          <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
            <CircularProgress size="2rem" />
          </Stack>
        )}
      </main>

      <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
        <Box p={3} pt={0} sx={{ 'width': '100%', 'paddingTop': '20px' }}>
          <MediaOnboardingDialog showMicCamPermissionWindow={setShowMicCamPermission} />
        </Box>
      </Modal>
    </div>
  );
};

export default PrivateWaiting;
