import type { NextPage } from 'next';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import { Box, Button, CircularProgress, FilledInput, FormControl, FormControlLabel, FormLabel, Link, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Theme, useTheme, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { textAlign } from '@mui/system';
import moment from 'moment';
import styles from '../../styles/Join.module.scss';
import SkribeLogo from '../../components/svg-components/SkribeLogo';
import CalenderIcon from '../../components/svg-components/CalenderIcon';
import AudioV2Icon from '../../components/svg-components/AudioV2Icon';
import PartyV2Icon from '../../components/svg-components/PartyV2Icon';
import ExhibitV2Icon from '../../components/svg-components/ExhibitV2Icon';
import GoogleV2Icon from '../../components/svg-components/GoogleV2Icon';
import OutlookV2Icon from '../../components/svg-components/OutlookV2Icon';
import YahooV2Icon from '../../components/svg-components/YahooV2Icon';
import CalenderV2Icon from '../../components/svg-components/CalenderV2Icon';
import { getStorageItem, setStorageItem } from '../../util/common';
import { getEventService, getMatterService, getParticipantService, getTenantService } from '../../helpers/api-helper';
import { IS_ANONYMOUS_USER, TOKEN_KEY } from '../../consts/consts';
import { useAuthContext } from '../../contexts/AuthContext';
import { getEventInfoByEventCode, getEventInformation, getParticipantData } from '../../services/meetingRoom.service';
import { handleApiError } from '../../util/error-handlers';
import { boundEventsActions } from '../../redux/reducers/eventReducer/eventAction';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import Timer from '../../components/v2/Timer';
import { CreateParticipantGuestWitnessRoleEnum, EventStatus } from '../../openapi';
import EventDetailsWrapper from '../../components/v2/schedule-event/EventDetailsWrapper';
import { changeDateFormat, convertToTime, formatDateStr, formatDuration, getShortValue, timeConvert } from '../../components/v2/common';
import { boundRoomParticipantActions } from '../../redux/reducers/roomParticipantReducer/roomParticipantAction';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import AddToCalendar from '../../components/v2/schedule-event/AddToCalendar';
import 'moment-timezone';

const PublicEvent: NextPage = () => {
  const { accessToken, setAccessToken } = useAuthContext();
  const router = useRouter();
  const eventCode = (router.query.eventCode as string) || '';
  const alert = boundSnackbarActions;
  const [readyToShowEventStartJoinButton, setReadyToShowEventStartJoinButton] = useState<boolean>(false);
  const [myRole, setMyRole] = useState<string>('');
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean | undefined>();
  const [participantKey, setParticipantKey] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleContinue = () => {
    if (!myRole) {
      return;
    }
    setIsSubmitting(true);
    boundRoomParticipantActions.setRole(myRole);
    setIsSubmitting(false);
    router.push(
      {
        'pathname': '/meeting-rooms/join',
        'query': { eventCode }
      },
      undefined,
      { 'shallow': false }
    );
  };

  const getEventInfo = async () => {
    if (accessToken) {
      try {
        const eventData = await getEventInfoByEventCode(accessToken, eventCode);
        boundEventsActions.storeEvent(eventData);
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  const getParticipantKey = async (accessToken: string) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getParticipantLink(event.id);
        setParticipantKey(response.data.participantKey);
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  // useEffect(() => {
  //   if (authUser) {
  //     if (authUser.isAnonymous === true) {
  //       setIsUserAnonymous(true);
  //     }

  //     if (authUser.isAnonymous === false) {
  //       setIsUserAnonymous(false);
  //     }
  //   }
  // }, [authUser]);

  useEffect(() => {
    // const isAnonymUser = getStorageItem(IS_ANONYMOUS_USER);
    const isAnonymUser = sessionStorage.getItem(IS_ANONYMOUS_USER);

    if (isAnonymUser) {
      setIsUserAnonymous(true);
    } else {
      setIsUserAnonymous(false);
    }
  }, []);

  const redirectToWaitingOrLive = () => {
    if (event) {
      switch (event?.status) {
        case EventStatus.Scheduled: {
          router.push(`/meeting-rooms/${participantKey}/waiting`);

          break;
        }
        case EventStatus.InProgress: {
        // location.href = `/meeting-rooms/${participantKey}/live`;
          router.push({ 'pathname': `/meeting-rooms/${participantKey}/live` });

          break;
        }
        case EventStatus.Complete: {
          router.push(`/post-event/${participantKey}`);

          break;
        }
      // No default
      }
    }
  };

  // useEffect(() => {
  //   const signInAnony = async () => {
  //     try {
  //       await authService?.signInAnonymous();
  //     } catch (error) {
  //       alert.error("Problem to get the authService");
  //     }
  //   };
  //   console.log("sisgnin", authService, authUser, isUserAnonymous);

  //   if (authService && !accessToken && isUserAnonymous === undefined) {
  //     console.log("signin anonym");
  //     signInAnony();
  //   }
  // }, [authService, accessToken, isUserAnonymous]);
  useEffect(() => {
    const signInAnony = async () => {
      try {
        const tenantService = await getTenantService();
        const response: any = (await tenantService.getGuestToken()).data;
        console.log('response', response);
        setAccessToken(response);
        // setStorageItem(response, "accessToken");
        sessionStorage.setItem('accessToken', response);
        setStorageItem(true, IS_ANONYMOUS_USER);
      } catch (error) {
        alert.error('Problem to get the authService');
      }
    };

    if (!accessToken && isUserAnonymous === undefined) {
      console.log('signin anonym');
      signInAnony();
    }
  }, [accessToken, isUserAnonymous]);

  useEffect(() => {
    if (accessToken && !event) {
      getEventInfo();
    }

    if (isUserAnonymous === false && event && accessToken) {
      getParticipantKey(accessToken);
    }
    if (participantKey) {
      redirectToWaitingOrLive();
    }
  }, [accessToken, isUserAnonymous, event, participantKey]);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datestart = event?.datestart ? changeDateFormat(event.datestart) : null;

  const getDaysHoursMinutes = (days: number, hours: number, minutes: number) => {
    if (days === 0 && hours === 0 && minutes <= 30 && (event?.status === EventStatus.InProgress || event?.status === EventStatus.Scheduled)) {
      setReadyToShowEventStartJoinButton(true);
    }
  };

  const getDate = (dateStr: any, timezone: any) => {
    const eventDate = moment(new Date(`${formatDateStr(dateStr)} ${timezone.toUpperCase()}`))
      .utc()
      .local()
      .format('D MMM');
    return eventDate;
  };

  const getYear = (dateStr: any, timezone: any) => {
    const eventDate = moment(new Date(`${formatDateStr(dateStr)} ${timezone.toUpperCase()}`))
      .utc()
      .local()
      .format('YYYY');
    return eventDate;
  };

  if (!event) {
    return (
      <Box>
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
      </Box>
    );
  }

  if (event?.status === EventStatus.Complete) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Public Event</title>
          <meta name="description" content="Public Event" />
        </Head>
        <main className={styles.main}>
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
                  <Link href="/home">
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
                    {event?.mattertitle}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  'padding': '20px 30px 15px 30px'
                }}
              >
                <Typography>This event is already completed.</Typography>
              </Box>
            </Box>
          </Box>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Public Event</title>
        <meta name="description" content="Public Event" />
      </Head>

      <main className={styles.main}>
        {isUserAnonymous !== undefined ? (
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
                  <Link href="/home">
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
                    {event?.mattertitle}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  'borderBottom': '1px solid #D1D3D5',
                  'padding': '15px 30px 15px 30px'
                }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item xs={'auto'}>
                        <Box sx={{ 'paddingRight': '10px' }}>
                          <CalenderIcon />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            'color': '#01090F',
                            'fontSize': '1.25rem',
                            'fontWeight': 'bold'
                          }}
                        >
                          {/* {datestart && `${datestart.getDate()} ${monthNames[datestart.getMonth()]}`} */}
                          {event?.datestart && event?.timezone && getDate(event.datestart, getShortValue(event.timezone))}
                        </Box>
                        <Box
                          sx={{
                            'color': '#01090F',
                            'fontSize': '1rem',
                            'fontWeight': '500',
                            'paddingTop': '10px'
                          }}
                        >
                          {/* {datestart && datestart.getFullYear()} */}
                          {event?.datestart && event?.timezone && getYear(event.datestart, getShortValue(event.timezone))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} container justifyContent={'center'}>
                    <Box sx={{ 'width': '100px' }}>
                      <Box
                        sx={{
                          'color': '#01090F',
                          'fontSize': '1.25rem',
                          'fontWeight': '500'
                        }}
                      >
                        {/* {datestart && timeConvert(datestart.toLocaleTimeString())}                         */}
                        {event?.datestart && event?.timezone && convertToTime(event.datestart, getShortValue(event.timezone))}

                      </Box>
                      <Box
                        sx={{
                          'color': '#01090F',
                          'fontSize': '1rem',
                          'fontWeight': '500',
                          'paddingTop': '10px'
                        }}
                      >
                        {/* {event?.timezone ? getShortValue(event.timezone) : null} */}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} container justifyContent={'flex-end'}>
                    <Box sx={{ 'width': '142px' }}>
                      <Box
                        sx={{
                          'color': '#01090F',
                          'fontSize': '1.25rem',
                          'fontWeight': '500'
                        }}
                      >
                        {formatDuration(event?.duration)}
                      </Box>
                      <Box
                        sx={{
                          'color': '#01090F',
                          'fontSize': '1rem',
                          'fontWeight': '500',
                          'paddingTop': '10px'
                        }}
                      >
                        Expected Duration
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <AddToCalendar />
                </Box>
              </Box>
              <Box
                sx={{
                  'borderBottom': '1px solid #D1D3D5',
                  'padding': '15px 30px 15px 30px',

                  'display': 'flex',
                  'justifyContent': 'center',
                  'alignItems': 'center',
                  'flexDirection': 'column'
                }}
              >
                <Box
                  sx={{
                    'fontSize': '0.875rem',
                    'fontWeight': '500',
                    'paddingBottom': '25px',
                    'textAlign': 'center'
                  }}
                >
                  Starts in
                </Box>

                <Box
                  sx={{
                    // width: "250px",
                    'fontSize': '0.875rem',
                    'fontWeight': '500',
                    'textAlign': 'center'
                  }}
                >
                  <Timer getDaysHoursMinutes={getDaysHoursMinutes} />
                </Box>
              </Box>

              <Box sx={{ 'padding': '15px 30px 15px 30px' }}>
                <Box
                  sx={{
                    'fontWeight': '500',
                    'fontSize': '1rem',
                    'paddingBottom': '8px'
                  }}
                >
                  What will your role be in the meeting?
                </Box>
                <FormControl className={styles.role}>
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="witness" name="radio-buttons-group" onChange={(e: any) => setMyRole(e.target.value)}>
                    <FormControlLabel value={CreateParticipantGuestWitnessRoleEnum.Witness} control={<Radio />} label="I’m the Witness" />
                    <FormControlLabel value={CreateParticipantGuestWitnessRoleEnum.Guest} control={<Radio />} label="I’m a Guest/Observer" />
                    <FormControlLabel value="skribeUser" control={<Radio />} label="I’m on the legal team and will be part of managing my party’s exhibits" />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !myRole}
                  startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                  sx={{
                    'marginTop': '10px',
                    'background': '#02178c'
                  }}
                  onClick={() => handleContinue()}
                >
                  Continue
                </Button>
              </Box>
            </Box>

            <Box className={styles['circle-bottom']}></Box>
          </Box>
        ) : (
          <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
            <CircularProgress size="2rem" />
          </Stack>
        )}
      </main>
    </div>
  );
};

export default PublicEvent;

export function getServerSideProps (context: any) {
  // add header
  // context.res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  // context.res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  return {
    'props': {}
  };
}
