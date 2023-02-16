import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Link,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Bowser from 'bowser';

import {
  MediaPermissionsError,
  MediaPermissionsErrorType,
  requestMediaPermissions
} from 'mic-check';
import {
  Close,
  Done,
  Mic,
  Videocam,
  LocationOn,
  Lock
} from '@mui/icons-material';

import styles from './MediaOnboardingDialog.module.scss';

let browser: any;

enum DialogType {
  explanation = 'explanation',
  systemDenied = 'systemDenied',
  userDenied = 'userDenied',
  trackError = 'trackError',
}

enum PermissionDialogType {
  prompt = 'prompt',
  granted = 'granted',
  denied = 'denied',
}

interface MediaOnboardingDialogProps {
  showMicCamPermissionWindow: (args: any) => void
}

const MediaOnboardingDialog = ({
  showMicCamPermissionWindow
}: MediaOnboardingDialogProps) => {
  const [audioAllowed, setAudioAllowed] = useState<boolean | null>(null);
  const [videoAllowed, setVideoAllowed] = useState<boolean | null>(null);
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);

  const [showPermissionSection, setShowPermissionSection] =
    useState<boolean>(false);
  const [showUserDeniedSection, setShowUserDeniedSection] =
    useState<boolean>(false);
  const [showSystemDeniedSection, setShowSytemDeniedSection] =
    useState<boolean>(false);
  const [showTrackErrorSection, setShowTrackErrorSection] =
    useState<boolean>(false);

  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<String | null>(null);
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<String | null>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<String | null>(null);

  const [errorDetails, setErrorDetails] =
    React.useState<MediaPermissionsError | undefined>();

  useEffect(() => {
    browser = Bowser.getParser(window.navigator.userAgent);
    checkPermissions();
    // if (
    //   microphonePermissionStatus === null ||
    //   cameraPermissionStatus === null
    // ) {
    //   getPermissions();
    // } else if (audioAllowed && videoAllowed) {
    //   showMicCamPermissionWindow(false);
    // } else {
    //   showMicCamPermissionWindow(true);
    // }
    // console.log("audioAllowed", audioAllowed, videoAllowed, microphonePermissionStatus, cameraPermissionStatus);
    if ((audioAllowed && videoAllowed) ||
      microphonePermissionStatus === null || cameraPermissionStatus === null) {
      showMicCamPermissionWindow(false);
    } else {
      showMicCamPermissionWindow(true);
      showSection(DialogType.explanation);
    }

    // if ((audioAllowed || audioAllowed === null) && (videoAllowed || videoAllowed === null) && (microphonePermissionStatus === "prompt" || microphonePermissionStatus === "granted") && (cameraPermissionStatus === "prompt" || cameraPermissionStatus === "granted") ) {
    //   showSection(DialogType.explanation);
    // }
  }, [audioAllowed, videoAllowed, locationAllowed, microphonePermissionStatus, cameraPermissionStatus]);

  const checkPermissions = () => {
    if (
      navigator.userAgent.match(/firefox|fxios/i) ||
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    ) {
      navigator.mediaDevices
        .getUserMedia({ 'video': true, 'audio': true })
        .then((stream) => {
          setCameraPermissionStatus('granted');
          setMicrophonePermissionStatus('granted');
          console.log('access granted', stream);
          setAudioAllowed(true);
          setErrorDetails(undefined);
          setVideoAllowed(true);
        })
        .catch((err) => {
          setCameraPermissionStatus('denied');
          setMicrophonePermissionStatus('denied');
          console.log('access denied', err);
          setAudioAllowed(false);
          setVideoAllowed(false);
          showSection(DialogType.userDenied);
        });
    } else {
      // microphone access
      navigator.permissions
        .query({ 'name': 'microphone' } as any)
        .then((permissionStatus) => {
          setMicrophonePermissionStatus(permissionStatus.state);
          switch (permissionStatus.state) {
            case 'granted': {
              setAudioAllowed(true);
              setErrorDetails(undefined);

              break;
            }
            case 'prompt': {
              setAudioAllowed(null);

              break;
            }
            case 'denied': {
              setAudioAllowed(false);
              showSection(DialogType.userDenied);

              break;
            }
          // No default
          }
          permissionStatus.onchange = function () {
            switch (permissionStatus.state) {
              case 'granted': {
                setAudioAllowed(true);
                setErrorDetails(undefined);

                break;
              }
              case 'prompt': {
                setAudioAllowed(null);

                break;
              }
              case 'denied': {
                setAudioAllowed(false);
                showSection(DialogType.userDenied);

                break;
              }
            // No default
            }
          };
        })
        .catch((err) => {
          console.log('microphone err ', err);
        });

      // camera access
      navigator.permissions
        .query({ 'name': 'camera' } as any)
        .then((permissionStatus) => {
          setCameraPermissionStatus(permissionStatus.state);
          switch (permissionStatus.state) {
            case 'granted': {
              setVideoAllowed(true);
              setErrorDetails(undefined);

              break;
            }
            case 'prompt': {
              setVideoAllowed(null);

              break;
            }
            case 'denied': {
              setVideoAllowed(false);
              showSection(DialogType.userDenied);

              break;
            }
          // No default
          }
          permissionStatus.onchange = function () {
            switch (permissionStatus.state) {
              case 'granted': {
                setVideoAllowed(true);
                setErrorDetails(undefined);

                break;
              }
              case 'prompt': {
                setVideoAllowed(null);

                break;
              }
              case 'denied': {
                setVideoAllowed(false);
                showSection(DialogType.userDenied);

                break;
              }
            // No default
            }
          };
        })
        .catch((err) => {
          console.log('camera err ', err);
        });
    }

    // geolocation access
    // if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    //   navigator.permissions
    //     .query({ name: "geolocation" } as any)
    //     .then(function (permissionStatus) {
    //       setLocationPermissionStatus(permissionStatus.state);
    //       if (permissionStatus.state === "granted") {
    //         // showSection(DialogType.explanation);
    //         setErrorDetails(undefined);
    //         setLocationAllowed(true);
    //       } else if (permissionStatus.state === "prompt") {
    //         setLocationAllowed(null);
    //       } else if (permissionStatus.state === "denied") {
    //         setLocationAllowed(false);
    //         showSection(DialogType.userDenied);
    //       }

    //       if (
    //         audioAllowed &&
    //         videoAllowed &&
    //         permissionStatus.state !== "denied"
    //       ) {
    //         // errorDetails ? showSection(DialogType.explanation) : null;
    //         errorDetails === undefined
    //           ? null
    //           : showSection(DialogType.explanation);
    //       }
    //       permissionStatus.onchange = function () {
    //         if (permissionStatus.state === "granted") {
    //           // showSection(DialogType.explanation);
    //           setLocationAllowed(true);
    //           setErrorDetails(undefined);
    //         } else if (permissionStatus.state === "prompt") {
    //           setLocationAllowed(null);
    //         } else if (permissionStatus.state === "denied") {
    //           setLocationAllowed(false);
    //           showSection(DialogType.userDenied);
    //         }

    //         if (
    //           audioAllowed &&
    //           videoAllowed &&
    //           permissionStatus.state !== "denied"
    //         ) {
    //           // !errorDetails ? showSection(DialogType.explanation) : null;
    //           errorDetails === undefined
    //             ? null
    //             : showSection(DialogType.explanation);
    //         }
    //       };
    //     })
    //     .catch((err) => {
    //       console.log("geolocation err ", err);
    //     });
    // }
    setLocationAllowed(true);
  };

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ 'name': 'geolocation' })
        .then((permissionStatus) => {
          switch (permissionStatus.state) {
            case 'granted': {
              navigator.geolocation.getCurrentPosition((position) => {
                setLocationAllowed(true);
              });

              break;
            }
            case 'prompt': {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLocationAllowed(true);
                },
                (err) => {
                  setLocationAllowed(false);
                },
                {
                  'enableHighAccuracy': true,
                  'timeout': 5000,
                  'maximumAge': 0
                }
              );

              break;
            }
            default: {
              setLocationAllowed(false);
              showSection(DialogType.userDenied);
            }
          }
        });
    }
  };

  const getPermissions = () => {
    requestMediaPermissions({ 'video': true, 'audio': true })
      .then((permissionStatus: any) => {
        setErrorDetails(undefined);
        // commented location checking
        // if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) getLocationPermission();
      })
      .catch((error: MediaPermissionsError) => {
        switch (error.type) {
          case MediaPermissionsErrorType.SystemPermissionDenied: {
            showSection(DialogType.systemDenied);

            break;
          }
          case MediaPermissionsErrorType.UserPermissionDenied: {
            showSection(DialogType.userDenied);

            break;
          }
          case MediaPermissionsErrorType.CouldNotStartVideoSource: {
            showSection(DialogType.trackError);

            break;
          }
          default: {
            console.log('permission error ', error);
          //   checkPermissions();
          // showSection(DialogType.userDenied);
          }
        }
        setErrorDetails(error);
      });
  };

  const _givePermission = (text?: string) => {
    let isButtonDisabled = false;
    let buttonTitle = '';

    // if (!audioAllowed) {
    //   buttonTitle += "Microphone";
    // }
    // if (!videoAllowed) {
    //   buttonTitle += " Camera";
    // }
    // if ((audioAllowed !== null || videoAllowed !== null) && !locationAllowed && locationAllowed !== null) {
    //   buttonTitle += " Location";
    // } else if ((audioAllowed !== null || videoAllowed !== null) && !locationAllowed && !errorDetails) {
    //   buttonTitle += " Location";
    // }
    if (audioAllowed && videoAllowed) {
      isButtonDisabled = true;
    }

    buttonTitle += ' Permission';

    return (
      <div
        style={{
          'width': '100%',
          'marginTop': 20,
          'display': 'flex',
          'justifyContent': 'center',
          'marginBottom': 50
        }}
      >
        <Button
          onClick={() => {
            if (browser.getBrowserName() === 'Safari') {
              // If on Safari, rechecking permissions results in glitches so just refresh the page
              window.location.reload();
            } else {
              getPermissions();
            }
          }}
          color="primary"
          style={{ 'float': 'right' }}
          variant="contained"
          disabled={isButtonDisabled}
          sx={{ 'background': '#02178c' }}
        >
          {text || 'Give '}
          {buttonTitle}
        </Button>
      </div>
    );
  };

  const showPermissions = () => (
      <>
        <Box
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'flexDirection': 'column',
            // backgroundColor: "#fff"
            'backgroundColor': 'transparent'
          }}
        >
          <Typography variant="h2" sx={{ 'paddingBottom': '20px' }}>
            Checking Permissions
          </Typography>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ 'paddingBottom': '10px' }}
          >
            <Box display="flex" alignItems="center">
              <Mic />
            </Box>
            <Box>
              <Typography variant="h6">Microphone Enabled</Typography>
            </Box>
            {
              <Box display="flex" alignItems="center">
                {audioAllowed === true
                  ? (
                  <Done style={{ 'color': '#22BC22' }} />
                    )
                  : !audioAllowed
                      ? (
                  <Close style={{ 'color': 'red' }} />
                        )
                      : null}
              </Box>
            }
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ 'paddingBottom': '10px' }}
          >
            <Box display="flex" alignItems="center">
              <Videocam />
            </Box>
            <Box>
              <Typography variant="h6">Camera Enabled</Typography>
            </Box>
            {
              <Box display="flex" alignItems="center">
                {videoAllowed === true
                  ? (
                  <Done style={{ 'color': '#22BC22' }} />
                    )
                  : !videoAllowed
                      ? (
                  <Close style={{ 'color': 'red' }} />
                        )
                      : null}
              </Box>
            }
          </Box>
          {/* <Box display="flex" flexDirection="row" alignItems="center">
            <Box display="flex" alignItems="center">
              <LocationOn />
            </Box>
            <Box>
              <Typography variant="h6">Location Enabled</Typography>
            </Box>
            {
              <Box display="flex" alignItems="center">
                {locationAllowed === true ? (
                  <Done style={{ color: "#22BC22" }} />
                ) : !locationAllowed ? (
                  <Close style={{ color: "red" }} />
                ) : null}
              </Box>
            }
          </Box> */}
          {_givePermission()}
        </Box>
      </>
  );

  const showUserDeniedMessage = () => {
    let accessTypes = '';
    if (
      audioAllowed === false &&
      videoAllowed === false &&
      locationAllowed === false
    ) {
      accessTypes = 'Microphone, Camera and Location';
    } else if (audioAllowed === false && videoAllowed === false) {
      accessTypes = 'Microphone and Camera';
    } else if (audioAllowed === false && locationAllowed === false) {
      accessTypes = 'Microphone and Location';
    } else if (videoAllowed === false && locationAllowed === false) {
      accessTypes = 'Camera and Location';
    } else {
      switch (false) {
        case videoAllowed: {
          accessTypes = 'Camera';

          break;
        }
        case audioAllowed: {
          accessTypes = 'Microphone';

          break;
        }
        case locationAllowed: {
          accessTypes = 'Location';

          break;
        }
        default: {
          accessTypes = 'Microphone, Camera and Location';
          showSection(DialogType.explanation);
        }
      }
    }
    return (
      <div className={styles['error-message']} style={{ 'maxWidth': '600px', 'margin': 'auto' }}>
        <Typography
          variant="h2"
          sx={{ 'paddingBottom': '20px', 'textAlign': 'center', 'color': 'grey.700' }}
        >
          {accessTypes} access blocked
        </Typography>
        <Typography sx={{ 'textAlign': 'center' }} variant="h6">
          App requires access to your {accessTypes.toLowerCase()}
        </Typography>
        <Typography sx={{ 'textAlign': 'center' }} variant="h6">
          {browser.getBrowserName() !== 'Safari' && (
            <Typography
              sx={{
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              Click the <Lock /> icon in your browser address bar and allow{' '}
              {accessTypes.toLocaleLowerCase()}.
            </Typography>
          )}
        </Typography>
      </div>
    );
  };

  const _renderErrorMessage = () => {
    if (!errorDetails) return null;
    return (
      <div style={{ 'marginTop': 10 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="caption" style={{ 'color': 'red' }}>
              Error Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption">
              {errorDetails.name}: {errorDetails.message}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  const _renderTryAgain = (text?: string) => (
      <div style={{ 'width': '100%', 'marginTop': 20 }}>
        <Button
          onClick={() => {
            if (browser.getBrowserName() === 'Safari') {
              // If on Safari, rechecking permissions results in glitches so just refresh the page
              window.location.reload();
            } else {
              getPermissions();
            }
          }}
          color="primary"
          style={{ 'float': 'right' }}
        >
          {text || 'Retry'}
        </Button>
      </div>
  );

  const showSystemDeniedMessage = () => {
    const settingsDataByOS = {
      'macOS': {
        'name': 'System Preferences',
        'link': 'x-apple.systempreferences:com.apple.preference.security?Privacy_Camera'
      }
    };

    return (
      <div className={styles['error-message']}>
        <Typography variant="h5">
          Can not use your camera or microphone
        </Typography>
        <Typography>
          Your browser might not have access to your camera or microphone. To
          fix this problem, open{' '}
          {
            // @ts-expect-error
            settingsDataByOS[browser.getOSName()] ? (
              <Link
                onClick={() => {
                  window.open(
                    // @ts-expect-error
                    settingsDataByOS[browser.getOSName()].link,
                    '_blank'
                  );
                }}
              >
                {
                  // @ts-expect-error
                  settingsDataByOS[browser.getOSName()].name
                }
              </Link>
            ) : (
              'Settings'
            )
          }
          .
        </Typography>
        {_renderErrorMessage()}
        {_renderTryAgain()}
      </div>
    );
  };
  const showSection = (sectionName: string) => {
    setShowPermissionSection(false);
    setShowUserDeniedSection(false);
    setShowSytemDeniedSection(false);
    setShowTrackErrorSection(false);
    switch (sectionName) {
      case DialogType.explanation: {
        setShowPermissionSection(true);

        break;
      }
      case DialogType.systemDenied: {
        setShowPermissionSection(true);
        setShowSytemDeniedSection(true);

        break;
      }
      case DialogType.userDenied: {
        setShowPermissionSection(true);
        setShowUserDeniedSection(true);

        break;
      }
      case DialogType.trackError: {
        setShowPermissionSection(true);
        setShowTrackErrorSection(true);

        break;
      }
    // No default
    }
  };

  const showTrackErrorMessage = () => (
      <div className={styles['error-message']}>
        <Typography variant="h5">
          Can not start your camera or microphone
        </Typography>
        <Typography>
          Another application (Zoom, Webex) or browser tab (Google Meet,
          Messenger Video) might already be using your webcam. Please turn off
          other cameras before proceeding.
        </Typography>
        {_renderErrorMessage()}
        {_renderTryAgain()}
      </div>
  );

  return (
    <div className={styles['media-onboarding-dialog-container']}>
      {showPermissionSection ? showPermissions() : null}
      {showUserDeniedSection ? showUserDeniedMessage() : null}
      {showSystemDeniedSection ? showSystemDeniedMessage() : null}
      {showTrackErrorSection ? showTrackErrorMessage() : null}
    </div>
  );
};

export default MediaOnboardingDialog;
