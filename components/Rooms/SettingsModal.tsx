import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TypographyVariant
} from '@mui/material';
import Modal from '@mui/material/Modal';
import CrossIcon from '../svg-components/CrossIcon';
import InputWithDropdown from '../InputWithDropdown/InputWithDropdown';

const style = {
  'position': 'absolute' as 'absolute',
  'top': '15%',
  'left': '50%',
  'transform': 'translate(-50%, -10%)',
  'bgcolor': 'background.paper',
  'boxShadow': 24,
  'borderRadius': '4px',
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'center',
  'alignItems': 'center',
  'textAlign': 'center',
  'color': '#01090F',
  'maxHeight': '80vh'
};

interface MeetingParticipantsListModalProps {
  open: boolean
  handleClose: () => void
  changeMicrophone: (deviceId: string) => void
  changeCamera: (deviceId: string) => void
}

const SettingsModal = ({
  open,
  handleClose,
  changeMicrophone,
  changeCamera
}: MeetingParticipantsListModalProps) => {
  const [audioDevices, setAudioDevices] = useState<any>([]);
  const [selectedAudioDevices, setSelectedAudioDevices] = useState<any>('');
  const [videoDevices, setVideoDevices] = useState<any>([]);
  const [selectedVideoDevices, setSelectedVideoDevices] = useState<any>('');
  const [currentVolumeLevel, setCurrentVolumeLevel] = useState<number>(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (open) {
      const tempAudioDevices: any = [];
      const tempVideoDevices: any = [];
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            switch (device.kind) {
              case 'audioinput': {
                tempAudioDevices.push(device);

                break;
              }
              case 'videoinput': {
                tempVideoDevices.push(device);

                break;
              }
            // No default
            }
            console.log(device);
          });
          setAudioDevices([...tempAudioDevices]);
          getCurrentMicrophone(tempAudioDevices);
          setVideoDevices([...tempVideoDevices]);
          getCurrentCamera(tempVideoDevices);
        })
        .catch((err) => {
          console.log(`${err.name}: ${err.message}`);
        });
    }
  }, [open]);

  useEffect(() => {
    if (selectedVideoDevices && open) {
      const selectedVideoStream = videoDevices.find(
        (data: any) => data.label === selectedVideoDevices
      );
      getVideo(selectedVideoStream);
    }
  }, [selectedVideoDevices, open]);

  const videoRef = useRef(null);

  const getVideo = (videoStream: any) => {
    navigator.mediaDevices
      .getUserMedia({ 'video': { 'width': 300, 'deviceId': videoStream.deviceId } })
      .then((stream) => {
        const video: any = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  useEffect(() => {
    if (selectedAudioDevices) {
      const seletedAudioStream = audioDevices.find(
        (data: any) => data.label === selectedAudioDevices
      );
      formatAudio(seletedAudioStream);
    }
  }, [selectedAudioDevices, open]);

  const formatAudio = async (audioStream: any) => {
    let volumeCallback = null;
    let volumeInterval: any = null;
    const volumeVisualizer = document.getElementById('volume-visualizer');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    // Initialize
    try {
      navigator.mediaDevices
        .getUserMedia({
          'audio': {
            'deviceId': audioStream.deviceId
              ? { 'exact': audioStream.deviceId }
              : undefined
          }
        })
        .then((stream) => {
          const audioContext = new AudioContext();
          console.log('audio', stream);

          const audioSource = audioContext.createMediaStreamSource(stream);
          console.log('audioSource', audioSource);

          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 512;
          analyser.minDecibels = -127;
          analyser.maxDecibels = 0;
          analyser.smoothingTimeConstant = 0.4;
          audioSource.connect(analyser);
          const volumes: any = new Uint8Array(analyser.frequencyBinCount);
          volumeCallback = () => {
            analyser.getByteFrequencyData(volumes);
            let volumeSum = 0;

            for (const volume of volumes) volumeSum += volume;
            const averageVolume = volumeSum / volumes.length;
            if (ref.current) {
              ref.current.style.width = `${
                (((averageVolume * 100) / 127) * 400) / 100
              }px`;
            }

            // setCurrentVolumeLevel((((averageVolume * 100) / 127) * 400) / 100);

            // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;

            volumeVisualizer?.style.setProperty(
              '--volume',
              `${(averageVolume * 100) / 127}%`
            );
          };
          clearInterval(volumeInterval);
          volumeInterval = setInterval(volumeCallback, 100);
        });
    } catch (e) {
      console.error(
        'Failed to initialize volume visualizer, simulating instead...',
        e
      );
      //   // Simulation
      //   //TODO remove in production!
      //   let lastVolume = 50;
      //   volumeCallback = () => {
      //     const volume = Math.min(
      //       Math.max(Math.random() * 100, 0.8 * lastVolume),
      //       1.2 * lastVolume
      //     );
      //     lastVolume = volume;
      //     volumeVisualizer?.style.setProperty("--volume", volume + "%");
      //   };
    }
  };

  const handelSave = () => {
    const selectedVideoStream = videoDevices.find(
      (data: any) => data.label === selectedVideoDevices
    );
    const seletedAudioStream = audioDevices.find(
      (data: any) => data.label === selectedAudioDevices
    );
    console.log(
      'selectedVideoStream:',
      selectedVideoStream,
      'u',
      seletedAudioStream
    );
    Promise.all([
      changeMicrophone(seletedAudioStream?.deviceId),
      changeCamera(selectedVideoStream?.deviceId)
    ]).then(() => {
      handleClose();
      sessionStorage.setItem(
        'selectedDevices',
        JSON.stringify({
          'audioDevice': seletedAudioStream?.deviceId,
          'videoDevice': selectedVideoStream?.deviceId
        })
      );
    });
  };

  const getCurrentMicrophone = (devices: any) => {
    const windowObj: any = window;
    const currentMic = windowObj.Skribe.zoom.webinar.getActiveMicrophone();
    const seletedAudioStream = devices.find(
      (data: any) => data.deviceId === currentMic
    );
    setSelectedAudioDevices(seletedAudioStream.label);
  };

  const getCurrentCamera = (devices: any) => {
    const windowObj: any = window;
    const currentCam = windowObj.Skribe.zoom.webinar.getActiveCamera();
    if (currentCam === 'default') {
      setSelectedVideoDevices(devices[0].label);
    } else {
      const seletedVideoStream = devices.find(
        (data: any) => data.deviceId === currentCam
      );
      setSelectedVideoDevices(seletedVideoStream.label);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              'cursor': 'pointer',
              'position': 'absolute',
              'top': '16px',
              'right': '16px'
            }}
            onClick={() => handleClose()}
          >
            <CrossIcon />
          </Box>
          <Box
            p={3}
            pt={4}
            sx={{
              'typography': 'subtitle1',
              'borderBottom': 1,
              'borderColor': 'divider',
              'width': '100%',
              'padding': '2rem 1.5rem 0.625rem'
            }}
            display="flex"
          >
            <Typography variant={'h2' as TypographyVariant}>
              Settings
            </Typography>
          </Box>
          <Box
            sx={{ 'typography': 'body1', 'width': '100%', 'overflow': 'hidden' }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            textAlign="left"
          >
            <Box sx={{ 'width': '70vw' }} px={3} py={1}>
              <Typography variant={'h3' as TypographyVariant}>Audio</Typography>
              <Grid container spacing={2} py={1} sx={{ 'alignItems': 'center' }}>
                <Grid item xs={5}>
                  <InputWithDropdown
                    title="Audio Device"
                    name="AudioDevice"
                    onChange={(event: React.SyntheticEvent) => {
                      console.log(event);
                      const input = event.target as HTMLElement;
                      setSelectedAudioDevices(input.innerText);
                    }}
                    onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    }}
                    options={audioDevices?.map((data: any) => ({ 'label': data.label }))}
                    value={selectedAudioDevices ?? audioDevices[0].label}
                  />
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    'textAlign': 'center',
                    'display': 'flex',
                    'justifyContent': 'center'
                  }}
                >
                  <Box
                    sx={{
                      'position': 'relative',
                      'width': '400px',
                      'height': '10px',
                      'backgroundColor': '#DDD',
                      'borderRadius': '12px'
                    }}
                  >
                    <Box
                      ref={ref}
                      sx={{
                        'width': '0px',
                        'height': '10px',
                        'backgroundColor': 'green',
                        'borderRadius': '12px'
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} py={1} sx={{ 'alignItems': 'center' }}>
                <Grid item xs={5}>
                  <Typography variant={'h3' as TypographyVariant} pb={1}>
                    Video
                  </Typography>
                  <InputWithDropdown
                    title="Video Device"
                    name="VideoDevice"
                    onChange={(event: React.SyntheticEvent) => {
                      console.log(event);
                      const input = event.target as HTMLElement;
                      setSelectedVideoDevices(input.innerText);
                    }}
                    onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    }}
                    options={videoDevices?.map((data: any) => ({ 'label': data.label }))}
                    value={selectedVideoDevices ?? videoDevices[0].label}
                  />
                </Grid>
                <Grid item xs={7} sx={{ 'textAlign': 'center' }}>
                  {selectedVideoDevices
                    ? (
                    <video
                      ref={videoRef}
                      width="320"
                      height="240"
                      poster="grey"
                    />
                      )
                    : (
                        ''
                      )}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              // flexDirection: "row",
              // columnGap: 1.5,
              // display: "flex",
              'width': '100%'
              // justifyContent: "flex-end",
            }}
            px={3}
            pb={3}
          >
            <Grid container spacing={2} py={1} sx={{ 'alignItems': 'center' }}>
              <Grid item xs={5}></Grid>
              <Grid item xs={7} sx={{ 'textAlign': 'center' }}>
                <Box
                  sx={{
                    'flexDirection': 'row',
                    'columnGap': 1.5,
                    'display': 'flex',
                    'width': '100%'
                    // justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    disableElevation
                    color="secondary"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    color="success"
                    onClick={() => handelSave()}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsModal;
