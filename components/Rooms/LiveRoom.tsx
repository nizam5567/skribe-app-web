import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import styles from '../../styles/EventRoom.module.scss';
import { MediaOnboardingDialog } from './MediaOnboardingDialog';
import SkribeLogo from '../svg-components/SkribeLogo';
import MeetingButton from '../Rooms/MeetingButton';
import MuteIcon from '../svg-components/MuteIcon';
import StopVideoIcon from '../svg-components/StopVideoIcon';
import { useTimer } from '../../src/hooks/useTimer';
import { LeaveModal } from './MeetingModal/LeaveModal';
import UnMuteIcon from '../svg-components/UnMuteIcon';
import StartVideoIcon from '../svg-components/StartVideoIcon';
import ParticipantsIcon from '../svg-components/ParticipantsIcon';
import SettingsModal from './SettingsModal';
import { EVENT_STATUS, PARTY_TYPE } from '../../consts';
import ExhibitIcon from '../svg-components/ExhibitIcon';
import { useMeetingWindowSize } from '../../src/hooks/useMeetingWindowSize';
import OffRecordIcon from '../svg-components/OffRecordIcon';
import RecordingStatus from './RecordingStatus';
import InfoIcon from '../svg-components/InfoIcon';
import ParticipantsSidebar from './ParticipantsSidebar/ParticipantsSidebar';
import InfoPopper from './InfoPopper/InfoPopper';
import LiveRoomExhibitComponent from '../v2/exhibits/LiveRoomExhibitComponent';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { EventStatus } from '../../openapi/models';
import { getEventService } from '../../helpers/api-helper';
import { useAuthContext } from '../../contexts/AuthContext';
import { GoOnTheRecordModal } from './MeetingModal/GoOnTheRecordModal';
import { RecordInfoModal } from './MeetingModal/RecordInfoModal';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { IS_ANONYMOUS_USER, IS_STARTED_MEETING, RECORDING_CURRENT_TIMESTAMP, RECORDING_DURATION, RECORDING_STATUS } from '../../consts/consts';
import { getStorageItem, removeStorageItem, setStorageItem } from '../../util/common';

let zoomClient: any;

interface LiveRoomProps {
  zoomApi: any
}

const LiveRoom = ({ zoomApi }: LiveRoomProps) => {
  const { clearAll, accessToken } = useAuthContext();
  const router = useRouter();
  const alert = boundSnackbarActions;

  const participantkey = router.query.participantKey as string;
  const currentParticipant = useSelector((state: any) => state?.roomsCurrentParticipantReducer.currentParticipant);
  const participantZoomData = useSelector((state: any) => state?.roomsParticipantZoomDataReducer.participantZoomData);
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  // const [participantZoomData, setParticipantZoomData] = useState<any>(null);
  const eventParticipants = useSelector((state: any) => state?.roomsEventParticipantsReducer?.participants);

  const meetingWindowSize = useMeetingWindowSize();
  const [showMicCamPermission, setShowMicCamPermission] = useState<boolean | null>(null);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [isLoadingZoomMtg, setIsLoadingZoomMtg] = useState<boolean>(true);
  const [showZoomErrors, setShowZoomErrors] = useState<boolean>(false);
  const [zoomErrors, setZoomErrors] = useState<any>('');
  const [loadingMessage, setLoadingMessage] = useState<any>('Loading Data...');
  const [isRecording, setIsRecording] = useState(false);
  const [isStartedMeeting, setIsStartedMeeting] = useState<boolean>(false);

  const [isAudioConnected, setIsAudioConnected] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean | undefined>(undefined);
  const [isVideoStarted, setIsVideoStarted] = useState<boolean>(false);
  const [isEndingEvent, setIsEndingEvent] = useState<boolean>(false);

  const [isMuteTipVisible, setIsMuteTipVisible] = useState(false);

  const currentRef = useRef();
  const { seconds, start, stop, updateRecordingTime } = useTimer();

  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const handleLeaveModalOpen = () => setOpenLeaveModal(true);
  const [openGoOnTheRecordModal, setOpenGoOnTheRecordModal] = useState(false);
  const handleGoOnTheRecordModalOpen = () => setOpenGoOnTheRecordModal(true);
  const [openRecordInfoModal, setOpenRecordInfoModal] = useState(false);
  const handleRecordInfoModalOpen = () => setOpenRecordInfoModal(true);
  const [firstTry, setFirstTry] = useState(true);
  const [sidebarName, setSidebarName] = useState<'participants' | 'exhibits' | null>(null);
  const lgScreen = useMediaQuery('(min-width:960px)');

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isCheckedZoomDom, setIsCheckedZoomDom] = useState<boolean>(false);
  const [isShowedRecordInfoModal, setIsShowedRecordInfoModal] = useState<boolean | undefined>();
  const [isLoadedParticipantZoomData, setIsLoadedParticipantZoomData] = useState(false);
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean | undefined>();

  useEffect(() => {
    if (accessToken && !currentParticipant && participantkey) {
      zoomApi.getParticipantInfo(accessToken);
    }
  }, [accessToken, participantkey]);

  useEffect(() => {
    if (
      accessToken &&
      !event &&
      currentParticipant &&
      currentParticipant.eventid
    ) {
      zoomApi.getEventInfo(accessToken);
    }
  }, [accessToken, currentParticipant, event]);

  useEffect(() => {
    if (
      accessToken &&
      participantkey &&
      event &&
      event.status === EVENT_STATUS.IN_PROGRESS
    ) {
      zoomApi.fetchParticipantZoomData(accessToken);
      zoomApi.getEventParticipants(accessToken);
    }
  }, [accessToken, participantkey, event]);

  useEffect(() => {
    if (participantZoomData && !isLoadedParticipantZoomData) {
      setIsLoadedParticipantZoomData(true);
    }
  }, [participantZoomData]);

  useEffect(() => {
    const intervalGoOnTheRecord = setInterval(() => {
      if (!isRecording &&
        isLoadedParticipantZoomData &&
        participantZoomData?.role === 1
      ) {
        handleGoOnTheRecordModalOpen();
      }
    }, 30000);

    if (isRecording) {
      console.log('clearing go to on the record');
      clearInterval(intervalGoOnTheRecord);
    }

    return () => clearInterval(intervalGoOnTheRecord);
  }, [isRecording, isLoadedParticipantZoomData]);

  useEffect(() => {
    const intervalRecordInfo = setInterval(() => {
      for (const item of document.querySelectorAll('div[class^="zmwebsdk-MuiPaper-root') as any) {
        if (item.innerText.includes('This meeting is being recorded')) {
          setIsShowedRecordInfoModal(true);
          handleRecordInfoModalOpen();
          break;
        }
      }
    }, 5000);

    if (isShowedRecordInfoModal === false) {
      console.log('clearing record info modal');
      clearInterval(intervalRecordInfo);
    }

    return () => clearInterval(intervalRecordInfo);
  }, [isShowedRecordInfoModal]);

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

  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((open) => !open);
  };

  const handleCloseInfo = () => {
    setOpen(false);
  };

  const handleLeaveModalClose = async () => {
    setOpenLeaveModal(false);
    removeStorageItem(IS_STARTED_MEETING);
    await zoomClient.leaveMeeting();
    router.push(`/post-event/${participantkey}`, undefined, {
      'shallow': true
    });
  };

  const endEvent = async () => {
    try {
      if (
        accessToken &&
        event &&
        event.status === EventStatus.InProgress &&
        currentParticipant.partytype === PARTY_TYPE.SCHEDULING) {
        console.log('Ending event...');
        setIsEndingEvent(true);
        await zoomClient.leaveMeeting();
        removeStorageItem(IS_STARTED_MEETING);

        const eventService = await getEventService(accessToken);
        const response: any = await eventService.endEvent({
          'eventid': currentParticipant.eventid,
          'tenantid': 1,
          'email': currentParticipant.email
        });

        if (response) {
          setIsEndingEvent(false);
          removeStorageItem(RECORDING_STATUS);
          removeStorageItem(RECORDING_CURRENT_TIMESTAMP);
          removeStorageItem(RECORDING_DURATION);
          router.push(`/post-event/${participantkey}`);
        } else {
          console.log('response', response);
          // alert.error("Problem to end the event");
        }
      }
    } catch (error) {
      console.log('error', error);
      setIsEndingEvent(false);
    }
  };

  const handleEndEvent = async () => {
    await endEvent();
  };

  const handleClickGoOnTheRecord = async () => {
    setOpenGoOnTheRecordModal(false);
    start();
    startRecording();
    setIsRecording(true);
  };

  let hideInitialTooltip = false;

  const toggleRecording = () => {
    if (isRecording) {
      stop();
      endRecording();
    } else {
      start();
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const changedDom = () => {
    if (participantZoomData) {
      const element = document.getElementById('suspension-view-tab-thumbnail-gallery');
      if (typeof element !== 'undefined' && element !== null) {
        (element).click();
      }

      const userElm = document.querySelector('div[id^="suspension-view-tabpanel-gallery"] ul') as HTMLElement;

      // Add white background color to user box and transparent for if video is enabled
      if (typeof userElm !== 'undefined' && userElm != null) {
        const { children } = userElm;

        for (const child in children) {
          const childElm = children[child].children;

          if (childElm && childElm.length > 0 && childElm[0].classList.contains('MuiBox-root')) {
            if (childElm[0].querySelector('.MuiTypography-root') !== null) {
              (children[child] as HTMLElement).style.background = 'transparent';
            } else {
              (children[child] as HTMLElement).style.background = '#fff';
            }
          } else if (childElm && childElm.length && !childElm[0].classList.contains('MuiBox-root')) {
            (children[child] as HTMLElement).style.background = '#fff';
            (children[child] as HTMLElement).style.color = '#586071';
          }
        }
      }
    }

    const notificationElm = document.getElementById('notistack-snackbar');
    if (typeof notificationElm !== 'undefined' && notificationElm != null) {
      (notificationElm).closest('.MuiCollapse-root')?.parentElement?.classList.add('notification-container');
    }

    // Hide initial tooltip (app access)
    if (!hideInitialTooltip) {
      const tooltipElm = document.querySelector('div[class*="MuiTooltip-popper"]') as HTMLElement;
      if (typeof tooltipElm !== 'undefined' && tooltipElm != null) {
        tooltipElm.style.zIndex = '-1';
      }
    }
  };

  const startMeeting = async (zoomData: any) => {
    console.log('startMeeting', zoomData);

    try {
      setIsStartedMeeting(true);
      setLoadingMessage('Connecting to the Room...');
      setIsLoadingZoomMtg(true);

      await zoomClient.join({
        'apiKey': zoomData.apiKey,
        'signature': zoomData.signature,
        'meetingNumber': zoomData.meetingNumber,
        'password': zoomData.passWord || '',
        'userName': zoomData.userName || 'Guest',
        'userEmail': zoomData.userEmail || ''
      });
      console.log('joined');

      const element = document.getElementById('suspension-view-tab-thumbnail-gallery');
      if (typeof element !== 'undefined' && element != null && !!element) {
        (element).click();
      }

      // Fix audio issue if live event reload [Start]
      const is_started_meeting = getStorageItem(IS_STARTED_MEETING);
      if (is_started_meeting === true) {
        setTimeout(() => {
          const elementZoomAudioBtn2 = document.getElementById('zoomVideoBtn');
          if (typeof elementZoomAudioBtn2 !== 'undefined' && elementZoomAudioBtn2 !== null && !!elementZoomAudioBtn2) {
            (elementZoomAudioBtn2).click();
          }

          setTimeout(() => {
            startZoomAudio();
          }, 1000);
        }, 2000);
      }
      // Fix audio issue if live event reload [End]

      // await joinInitialAudio();
      if (!is_started_meeting) {
        await joinInitialAudio();
        setStorageItem(true, IS_STARTED_MEETING);
      }
      hideInitialTooltip = true;
      setIsLoadingZoomMtg(false);
      setShowZoomErrors(false);
      setZoomErrors('');
    } catch (err: any) {
      console.log('err start meeting: ', err);

      if (firstTry) {
        setFirstTry(false);
        setIsStartedMeeting(false);
      } else {
        console.log('err details start meeting: ', err.message, err.reason);
        setShowZoomErrors(true);
        if (err.reason) {
          setZoomErrors(err.reason);
        } else if (err.message) {
          setZoomErrors(err.message);
        }
      }
      hideInitialTooltip = true;
      setIsLoadingZoomMtg(false);
    }
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof zoomClient !== 'undefined' &&
      zoomClient !== null &&
      participantZoomData &&
      event &&
      event?.status === EventStatus.InProgress &&
      !isStartedMeeting &&
      showMicCamPermission === false
    ) {
      console.log('Starting event');
      startMeeting(participantZoomData);
    }
  }, [zoomClient, participantZoomData, event, isStartedMeeting, firstTry, showMicCamPermission]);

  const observeZoomDom = () => {
    if (!isCheckedZoomDom) {
      // Select the node that will be observed for mutations
      const targetNode = document.getElementById('event-room-center') as HTMLElement;
      if (targetNode) {
        setIsCheckedZoomDom(true);
        // Options for the observer (which mutations to observe)
        const config = { 'attributes': false, 'childList': true, 'subtree': true };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(changedDom);
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
      } else {
        setTimeout(() => {
          observeZoomDom();
        }, 500);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined' ||
        (typeof zoomClient !== 'undefined' && zoomClient !== null)) {
        return;
      }

      const ZoomMtgEmbedded = (await import('@skribe/zoomsdk/embedded'))?.default;
      zoomClient = ZoomMtgEmbedded.createClient();

      try {
        zoomClient.init({
          'debug': true,
          'zoomAppRoot': document.getElementById('zoom-target') as HTMLElement,
          'language': 'en-US',
          // isSupportChat: false,
          'customize': {
            'meetingInfo': ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
            'isShowJoiningErrorDialog': false,
            'video': {
              'isResizable': true,
              'viewSizes': {
                'default': {
                  'width': meetingWindowSize.width,
                  'height': meetingWindowSize.height
                }
              },
              'popper': {
                'disableDraggable': true
              }
            }
          }
        });
      } catch (error) {
        console.log('zoom init error ', error);
        window.location.reload();
      }

      observeZoomDom();
    })();

    return () => {
      console.log('destroying zoom client');
      if (zoomClient) {
        zoomClient.leaveMeeting();
        zoomClient = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showMicCamPermission) {
      setIsLoadingZoomMtg(false);
    }
  }, [showMicCamPermission]);

  useEffect(() => {
    const intervalGetEvent = setInterval(() => {
      if (
        event &&
        currentParticipant &&
        currentParticipant.eventid &&
        (event?.status === EventStatus.InProgress ||
          event?.status === EventStatus.Preflight ||
          event?.status === EventStatus.Scheduled)
      ) {
        // console.log("interval get event");
        zoomApi.getEventInfo(accessToken);
      }
    }, 5000);

    if (event?.status === EventStatus.Complete) {
      console.log('clearing');
      clearInterval(intervalGetEvent);
      removeStorageItem(IS_STARTED_MEETING);
      zoomClient.leaveMeeting();
      if (isUserAnonymous === true) {
        clearAll();
      }
      router.push(`/post-event/${participantkey}`);
    }

    return () => clearInterval(intervalGetEvent);
  }, [accessToken, event, currentParticipant]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof zoomClient !== 'undefined' &&
      zoomClient !== null &&
      isAudioConnected
    ) {
      setTimeout(async () => {
        const recording_status = getStorageItem(RECORDING_STATUS);
        const recording_duration = getStorageItem(RECORDING_DURATION);

        if (recording_status === 'paused') {
          if (recording_duration) {
            updateRecordingTime(recording_duration);
          }
        } else {
          const recordingCurrentTimestamp = getStorageItem(RECORDING_CURRENT_TIMESTAMP);

          if (recordingCurrentTimestamp) {
            let duration = Math.ceil((Date.now() - recordingCurrentTimestamp) / 1000);
            if (recording_duration) {
              duration += recording_duration;
            }
            updateRecordingTime(duration);
            resumeGoOnTheRecord();
          }
        }
      }, 1000);
    }
  }, [zoomClient, isAudioConnected]);

  const resumeGoOnTheRecord = async () => {
    try {
      await zoomClient.record('start');
      console.log('Resume recording');
      setOpenGoOnTheRecordModal(false);
      start();
      setIsRecording(true);
    } catch (error: any) {
      console.log('resume recording error', error);
    }
  };

  const joinInitialAudio = () => {
    const windowObj: any = window;
    if (currentRef.current) {
      setTimeout(() => {
        if (windowObj.Skribe.zoom.webinar) {
          console.log('windo.Skribe found');
          windowObj.Skribe.zoom.webinar.startAudio().then(() => {
            console.log('audio connected');
            setIsAudioConnected(true);
            // if (currentParticipant?.partytype !== PARTY_TYPE.OBSERVERS) {
            //   windowObj.Skribe.zoom.webinar.unmuteAudio().then(() => {
            //     setIsAudioMuted(false);
            //     console.log("audio is unmuted");
            //   });
            // } else {
            //   windowObj.Skribe.zoom.webinar.muteAudio().then(() => {
            //     setIsAudioMuted(true);
            //     console.log("audio is muted");
            //   });
            // }
            windowObj.Skribe.zoom.webinar.muteAudio().then(() => {
              setIsAudioMuted(true);
              console.log('audio is muted');
            })
              .catch((error: any) => {
                console.log('Error to muted audio!', error);
              });
          }).catch((error: any) => {
            console.log('error to connect audio!', error);
          });
        }
      }, 1000);
      setTimeout(() => {
        console.log('SetTimeout ref clicked');
        const currentRefrence: any = currentRef.current;
        currentRefrence.click();
      }, 2000);
    }
  };

  const startZoomAudio = () => {
    const windowObj: any = window;
    windowObj.Skribe.zoom.webinar.startAudio().then(() => {
      console.log('audio connected');
      setIsAudioConnected(true);

      windowObj.Skribe.zoom.webinar.muteAudio().then(() => {
        setIsAudioMuted(true);
      })
        .catch((error: any) => {
          console.log('Error to muted audio!', error);
        });
    }).catch((error: any) => {
      console.log('error to connect audio!', error);
      const elementZoomAudioBtn2 = document.getElementById('zoomVideoBtn');
      if (typeof elementZoomAudioBtn2 !== 'undefined' && elementZoomAudioBtn2 !== null && !!elementZoomAudioBtn2) {
        (elementZoomAudioBtn2).click();
      }
    });
  };

  const muteAudio = async () => {
    const windowObj: any = window;
    windowObj.Skribe.zoom.webinar.startAudio().then(() => {

      isAudioMuted || isAudioMuted === undefined
        ? windowObj.Skribe.zoom.webinar.unmuteAudio().then(() => {
          setIsAudioMuted(false);
          console.log('audio is unmuted');
        })
        : windowObj.Skribe.zoom.webinar.muteAudio().then(() => {
          setIsAudioMuted(true);
          console.log('audio is muted');
        });
    });
  };

  const startVideo = () => {
    const windowObj: any = window;
    if (!isVideoStarted) {
      const video = document.querySelector('#ZOOM_WEB_SDK_SELF_VIDEO');
      windowObj.Skribe.zoom.webinar
        .startVideo({
          'videoElement': video
        })
        .then(() => {
          setIsVideoStarted(true);
        });
    } else {
      windowObj.Skribe.zoom.webinar.stopVideo().then(() => {
        setIsVideoStarted(false);
      });
    }
  };

  const startRecording = async () => {
    try {
      const res = await zoomClient.record('start');
      // const res = zoomClient.record({ record: true });
      console.log('startRecording', res);
      setStorageItem('ongoing', RECORDING_STATUS);
      setStorageItem(Date.now(), RECORDING_CURRENT_TIMESTAMP);
    } catch (error: any) {
      console.log('start recording error', error);
      alert.error('Something error occurred, Please leave and rejoin then you will get permission to record!');
      // if (error.type === "INSUFFICIENT_PRIVILEGES") {
      //   router.push(`/meeting-rooms/${participantkey}/waiting`)
      // }
    }
  };

  const endRecording = async () => {
    try {
      const res = await zoomClient.record('pause');
      console.log('pause recording', res);
      // setStorageItem(false, IS_RECORDING_MEETING);
      setStorageItem('paused', RECORDING_STATUS);
      setStorageItem(seconds, RECORDING_DURATION);
    } catch (error) {
      console.log('recording stop error', error);
    }
  };

  const changeMicrophone = (deviceId: string) => {
    if (deviceId) {
      const windowObj: any = window;
      windowObj.Skribe.zoom.webinar.switchMicrophone(deviceId).then(() => {
        console.log('microphone changed');
      });
    }
  };

  const changeCamera = (deviceId: string) => {
    if (deviceId) {
      const windowObj: any = window;
      windowObj.Skribe.zoom.webinar.switchCamera(deviceId).then(() => {
        console.log('camera changed');
      });
    }
  };

  const handleChangeSidebar = (sidebar: 'exhibits' | 'participants' | null) => {
    setSidebarName(sidebar);
  };

  const sidebar = useMemo(() => (
      <>
        {isStartedMeeting &&
          !!sidebarName &&
          (lgScreen
            ? (
            <Grid
              item
              sx={{
                'borderLeft': '1px solid #EBEBEA',
                'width': '360px',
                'boxShadow': '0px 3px 20px rgba(0, 0, 0, 0.102)',
                'zIndex': 10
              }}
            >
              {sidebarName === 'exhibits' && (
                <LiveRoomExhibitComponent eventId={currentParticipant.eventid} onClose={() => handleChangeSidebar(null)} />
              )}
              {sidebarName === 'participants' &&
                <ParticipantsSidebar onClose={() => handleChangeSidebar(null)}
                  zoomClient={zoomClient} />}
            </Grid>
              )
            : (
            <Drawer
              sx={{
                'width': '360px',
                'flexShrink': 0,
                '& .MuiDrawer-paper': {
                  'width': '360px',
                  'boxSizing': 'border-box'
                }
              }}
              anchor="right"
              open={true}
            >
              {sidebarName === 'exhibits' && (
                <LiveRoomExhibitComponent eventId={currentParticipant.eventid} onClose={() => handleChangeSidebar(null)} />
              )}
              {sidebarName === 'participants' &&
                <ParticipantsSidebar onClose={() => handleChangeSidebar(null)}
                  zoomClient={zoomClient} />}
            </Drawer>
              ))}
      </>
  ), [isStartedMeeting, handleChangeSidebar, sidebarName, lgScreen]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs container>
          <Grid item xs sx={{ 'bgcolor': '#f8f9f9' }}>
            <div className={styles['event-room-center']} id="event-room-center">
              <div className={styles.content}>
                <Box className={styles['mic-camera-permission']}
                  sx={{ 'display': showMicCamPermission ? 'block' : 'none' }}>
                  {showMicCamPermission && (
                    <Box mb={5}
                      sx={{
                        'textAlign': 'center',
                        'paddingTop': '40px'
                      }}>
                      <SkribeLogo />
                    </Box>
                  )}
                  <MediaOnboardingDialog showMicCamPermissionWindow={setShowMicCamPermission} />
                </Box>

                {isStartedMeeting && (
                  <Box sx={{
                    'width': '100%',
                    'py': '15px',
                    'px': '20px',
                    'visibility': showMicCamPermission ? 'hidden' : 'visible'
                  }}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        {participantZoomData && participantZoomData.role === 1 &&
                          <RecordingStatus isRecording={isRecording} duration={seconds} />
                        }
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            'display': 'flex',
                            'alignItems': 'center',
                            'justifyContent': 'center',
                            'height': '100%'
                          }}
                        >
                          <Typography variant="h3">{event?.title}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        {currentParticipant &&
                          currentParticipant.partytype !== PARTY_TYPE.OBSERVERS &&
                          currentParticipant.partytype !== PARTY_TYPE.WITNESS && (
                            <Box
                              sx={{
                                'display': 'flex',
                                'alignItems': 'center',
                                'justifyContent': 'end',
                                'height': '100%'
                              }}
                            >
                              <Button variant="contained" size="small" color="info" sx={{ 'color': '#000', 'px': '1rem' }} startIcon={<InfoIcon />} onClick={handleClickInfo}>
                                Info
                              </Button>
                              <InfoPopper open={open} anchorEl={anchorEl} handleCloseInfo={handleCloseInfo} />
                            </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Box className={styles['video-meeting-section']}
                  sx={{ 'visibility': showMicCamPermission ? 'hidden' : 'visible' }}>
                  {isStartedMeeting && !isRecording && (
                    <Box
                      sx={{
                        'bgcolor': 'error.main',
                        'px': 2.5,
                        'py': 1.75,
                        'position': 'absolute',
                        'top': 0,
                        'borderTopLeftRadius': 8,
                        'borderTopRightRadius': 8,
                        'width': '100%'
                      }}
                    >
                      <Typography variant="h5" color="common.white">
                        The Event is in Off Record
                      </Typography>
                      <Typography variant="subtitle2" color="common.white">
                        Live Recording and A.I. Transcription will start after going On Record.
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ 'px': 4, 'width': '100%' }}>
                    <div id="zoom-target"></div>
                  </Box>

                  {isStartedMeeting && (
                    <Box
                      sx={{
                        'display': 'flex',
                        'justifyContent': 'space-between',
                        'px': 5,
                        'position': 'absolute',
                        'bottom': 0,
                        'height': 72,
                        'py': 1.5,
                        'borderTop': '1px solid #EBEBEA',
                        'width': '100%',
                        'zIndex': '1000 !important',
                        'background': 'white',
                        'boxShadow': '0px -5px 10px rgba(0, 0, 0, 0.051)'
                      }}
                      ref={currentRef}
                    >
                      <Box sx={{ 'display': 'flex', 'columnGap': 0.5 }}>
                        <Box sx={{ 'position': 'relative' }}>
                          <Box
                            sx={{
                              'position': 'absolute',
                              'background': '#262626d9',
                              'zIndex': isAudioMuted && isMuteTipVisible ? 500 : -1,
                              'color': '#dddddd',
                              'padding': '0.5rem',
                              'borderRadius': '0.2rem',
                              'top': '-3rem',
                              'width': 'max-content',
                              'zoom': 0.8,
                              'left': '-50%',
                              'opacity': isAudioMuted && isMuteTipVisible ? 1 : 0,
                              'transition': 'all 0.6s'
                            }}
                            onClick={() => setIsMuteTipVisible(false)}
                          >
                            You are currently muted.
                          </Box>

                          <MeetingButton
                            icon={isAudioMuted || isAudioMuted === undefined ? <UnMuteIcon /> : <MuteIcon />}
                            label={isAudioMuted || isAudioMuted === undefined ? 'Unmute' : 'Mute'}
                            id="zoomAudioBtn"

                            onClick={() => {
                              muteAudio();
                              if (!isAudioMuted) {
                                setTimeout(() => setIsMuteTipVisible(true), 5000);
                              } else {
                                setIsMuteTipVisible(false);
                              }
                            }}
                          />
                        </Box>

                        <MeetingButton
                          id="zoomVideoBtn"
                          icon={isVideoStarted ? <StopVideoIcon /> : <StartVideoIcon />}
                          label={isVideoStarted ? 'Stop Video' : 'Start Video'}
                          onClick={() => startVideo()} />
                      </Box>
                      {currentParticipant && currentParticipant.partytype !== PARTY_TYPE.OBSERVERS &&
                        (
                          <Box sx={{ 'display': 'flex', 'columnGap': 0.5 }}>
                            <MeetingButton
                              icon={<ParticipantsIcon participantCount={eventParticipants?.length} />}
                              label="Participants"
                              onClick={() => handleChangeSidebar('participants')}
                            />
                            {participantZoomData.role === 1 && <MeetingButton icon={isRecording
                              ? <OffRecordIcon />
                              : <Box sx={{
                                'fontSize': '21px',
                                'lineHeight': 0.9,
                                'position': 'relative',
                                'marginTop': '-1px'
                              }}><RadioButtonCheckedOutlinedIcon fontSize="inherit" /></Box>}
                              label={isRecording ? 'Go Off the Record' : 'Go On the Record'}
                              onClick={toggleRecording}
                            // disabled={currentParticipant.role === "GUEST" ||
                            //   currentParticipant.role === "WITNESS"}
                            // opacity={(currentParticipant.role === "GUEST" ||
                            //   currentParticipant.role === "WITNESS") ? ".5" : "1"}
                            />}
                            <MeetingButton icon={<ExhibitIcon />} label={'Exhibits'} onClick={() => handleChangeSidebar('exhibits')} />
                          </Box>
                        )}
                      <Box sx={{ 'paddingRight': '50px' }}>
                        <Button color="error" variant="contained" onClick={handleLeaveModalOpen}>
                          {'Leave Event'}
                        </Button>
                      </Box>

                    </Box>
                  )}

                  {isLoadingZoomMtg && (
                    <div className={styles['custom-loading']}>
                      <div>
                        <CircularProgress color="primary" />
                        <span>{loadingMessage}</span>
                      </div>
                    </div>
                  )}

                  {showZoomErrors && (
                    <div className={styles['error-container']}>
                      <div>
                        <h2>Connection failed due to below error - </h2>
                        <div>{zoomErrors}</div>
                      </div>
                    </div>
                  )}
                </Box>

              </div>
            </div>
          </Grid>
          {sidebar}
        </Grid>
      </Grid>

      <LeaveModal
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        onLeave={handleLeaveModalClose}
        isEndingEvent={isEndingEvent}
        currentParty={currentParticipant?.partytype}
        onEnd={handleEndEvent}
      />
      <SettingsModal
        open={openSettingsModal}
        handleClose={() => setOpenSettingsModal(false)}
        changeMicrophone={changeMicrophone}
        changeCamera={changeCamera}
      />
      <GoOnTheRecordModal
        open={openGoOnTheRecordModal}
        onClose={() => setOpenGoOnTheRecordModal(false)}
        onClickGoOnTheRecord={handleClickGoOnTheRecord}
      />
      <RecordInfoModal
        open={openRecordInfoModal}
        onClose={() => { setIsShowedRecordInfoModal(false); setOpenRecordInfoModal(false); }}
      />
    </>
  );
};

export default LiveRoom;
