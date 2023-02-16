import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Alert, CircularProgress, Snackbar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { getDatabase, onValue, ref } from '@firebase/database';
import { useSelector } from 'react-redux';
import TempModal from '../../../components/TempModal';
import styles from '../../../styles/WaitingRoom.module.scss';
import { EVENT_STATUS, PARTY_TYPE } from '../../../consts';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import EmailIcon from '../../../components/svg-components/EmailIcon';
import SkribeLogo from '../../../components/svg-components/SkribeLogo';
import { useMeetingRouter } from '../../../src/hooks/useMeetingRouter';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { EventStatus } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { handleApiError } from '../../../util/error-handlers';

const PreEvent: NextPage = () => {
  const { joining, 'status': currentStatus, eventInfo, currentParticipant } = useMeetingRouter();

  const { accessToken } = useAuthContext();
  const meetingData = useSelector((state: any) => state?.roomsMeetingDataReducer?.meetingData);
  const { event } = useAppSelector((state: RootState) => state.eventReducer);

  const handleClose = () => {};

  const router = useRouter();
  const alert = boundSnackbarActions;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [participantData, setParticipantData] = useState<any>();
  const [eventBasicInfo, setEventBasicInfo] = useState<any>();
  const [currentParty, setCurrentParty] = useState<PARTY_TYPE | undefined>();
  const [isStarting, setIsStarting] = useState(false);
  const [msgTitle, setMsgTitle] = useState<string>('');
  const [msgContent, setMsgContent] = useState<string | ReactNode>('');
  const [isStartedByCurrentUser, setIsStartedByCurrentUser] = useState<boolean>(false);

  const handleError = (error: any) => {
    alert.error(error.message);
  };

  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [modalTitle, setModalTitle] = useState('Button Clicked');
  const [modalDescription, setModalDescription] = useState('This is under construction');

  const getEventInformation = async (eventId: number) => {
    if (eventId && accessToken) {
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
  };

  useEffect(() => {
    if (meetingData && meetingData.eventid && meetingData.participantkey && event) {
      console.log('eventInfo', event);
      setIsLoading(false);
    }
  }, [meetingData, event]);

  useEffect(() => {
    if (meetingData && currentParticipant) {
      setCurrentParty(currentParticipant.partytype.toLowerCase());
    }
  }, [meetingData, currentParticipant]);

  useEffect(() => {
    setMsgTitle("Don't go anywhere!");
    setMsgContent("The event hosts have been notified that you're ready.");
    if (currentParty === PARTY_TYPE.SCHEDULING) {
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
  }, [currentParty]);

  useEffect(() => {
    if (joining && currentStatus === EVENT_STATUS.PREFLIGHT) {
      alert.success('Event is about to begin', { 'timeout': 6000 });
    }
  }, [joining]);

  const handleJoin = async () => {
    try {
      if (meetingData.eventid && accessToken) {
        console.log('Starting event...');
        setIsStarting(true);
        setIsStartedByCurrentUser(true);

        const eventService = await getEventService(accessToken);
        const response: any = await eventService.startEvent({
          'eventid': meetingData.eventid,
          'tenantid': 1,
          'email': meetingData.email
        });
        console.log('response', response);
        if (response) {
          setIsStarting(false);
          router.push(
            {
              'pathname': '/meeting-rooms/[participantkey]/live',
              'query': { 'participantkey': meetingData.participantkey }
            },
            undefined,
            { 'shallow': false }
          );
        }
      }
    } catch (error) {
      console.log('eror', error);
      setIsStarting(false);
    }
  };

  useEffect(() => {
    const intervalGetEvent = setInterval(() => {
      if (!isStartedByCurrentUser && event && meetingData && meetingData.eventid && (event?.status === EventStatus.Scheduled || event?.status === EventStatus.Preflight)) {
        getEventInformation(meetingData.eventid);
      }
    }, 5000);

    if (event?.status === EventStatus.InProgress) {
      console.log('clearing');
      clearInterval(intervalGetEvent);
    }

    return () => clearInterval(intervalGetEvent);
  }, [event, meetingData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pre Event</title>
        <meta name="description" content="Pre Event" />
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
                    <Box
                      sx={{
                        'color': '#7C8286',
                        'fontSize': '0.875rem',
                        'paddingTop': '5px'
                      }}
                    >
                      {event?.title}
                    </Box>
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
                    {currentParty === PARTY_TYPE.SCHEDULING
                      ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleJoin();
                        }}
                        disabled={isStarting || currentStatus !== EVENT_STATUS.SCHEDULED}
                        startIcon={isStarting && <CircularProgress size="1rem" color="inherit" sx={{ 'background': '#02178c' }} />}
                      >
                        Start Event
                      </Button>
                        )
                      : (
                          ''
                        )}

                    <Button
                      // onClick={onSubmit}
                      type="button"
                      variant="outlined"
                      color="secondary"
                      sx={{ 'marginLeft': '10px' }}
                    >
                      Test Mic & Speaker
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
      <TempModal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle} modalDescription={modalDescription} />
    </div>
  );
};

export default PreEvent;

export function getServerSideProps (context: any) {
  // add header
  context.res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  context.res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  return {
    'props': {}
  };
}
