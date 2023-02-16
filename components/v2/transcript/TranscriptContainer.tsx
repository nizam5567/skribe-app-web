import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { boundClipActions } from '../../../redux/reducers/clipsReducer/clipsAction';
import ClipDownloadIcon from '../svg-components/ClipDownloadIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import ShareIcon from '../../svg-components/ShareIcon';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { CHANGE_IDENTITY_MODAL } from '../../../consts/modalNames';
import ChangeIdentityModal from '../ChangeIdentityModal/ChangeIdentityModal';
import { boundTranscriptActions } from '../../../redux/reducers/transcriptReducer/transcriptAction';
import { getTenantIdFromLocalStorage } from '../common';


const TranscriptVideoContainer = dynamic(import('./TranscriptVideoContainer'), { 'ssr': false });

const TranscriptContainer = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { accessToken } = useAuthContext();
  const userTenantId = getTenantIdFromLocalStorage();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [videoUrl, setVideoUrl] = useState<any>();
  const [recordedVideoUrl, setRecordedVideoUrl] = useState('');
  const [eventInformation, setEventInformation] = useState<any>();
  const [callVideoClips, setCallVideoClips] = useState(false);

  const alert = boundSnackbarActions;

  const { clips } = useAppSelector((store: any) => store.clipsReducer);
  const { isSpeakerNameChanged } = useAppSelector((store: any) => store.transcriptReducer);

  const getEventInformation = async (eventid: number) => {
    if (!eventid) void router.push('/home');
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getEventDetail(eventid);
        if (response?.data) {
          setEventInformation(response.data);
        }
      } catch (error: any) {
        boundSnackbarActions.error('Error when loading event information');
        void router.push('/home');
      } finally {
        setLoading(false);
      }
    }
  };

  const getVideoInformation = async (eventid: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getPosteventVideo(eventid);
        console.log('response', response);
        setVideoUrl(response.data.streamUrl);
        setRecordedVideoUrl(response.data.recordedVideoUrl);
        // setVideoUrl("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4");
        if (response.data.transcriptUrl) {
          axios
            .get(response.data.transcriptUrl)
            .then((res: any) => {
              boundTranscriptActions.doStoreTranscriptSpeakers(res.data.speakers);
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      } catch (error: any) {
        boundSnackbarActions.error('Something error occurred!');
      } finally {
        setLoading(false);
      }
    }
  };

  const getVideoClips = async (eventid: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getvideoclips(eventid);
        if (response?.data) {
          boundClipActions.doStoreClips(response.data.clips);
        }
      } catch (error: any) {
        boundSnackbarActions.error('Error when loading event information');
        void router.push('/home');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (Number(eventId)) {
      void getVideoInformation(Number(eventId));
      void getEventInformation(Number(eventId));
      void getVideoClips(Number(eventId));
    }
  }, [eventId]);

  useEffect(() => {
    if (isSpeakerNameChanged) {
      setLoading(true);
      void getVideoInformation(Number(eventId));
      boundTranscriptActions.doStoreIsSpeakerNameChanged(false);
    }
  }, [isSpeakerNameChanged]);

  const gotoEventpage = () => {
    if (eventInformation) {
      const matterid: string = eventInformation?.matterid;
      const eventid: string = eventInformation.id;
      void router.push(`/event/${matterid}/${eventid}`);
    } else {
      void router.push('/home');
    }
  };

  const downloadFile = async (url: string, fileName: string) => {
    // eslint-disable-next-line global-require
    const streamSaver: any = await require('streamsaver');
    await fetch(url)
      .then((res: any) => {
        const fileStream = streamSaver.createWriteStream(fileName);
        const writer = fileStream.getWriter();
        if (res.body.pipeTo) {
          writer.releaseLock();
          return res.body.pipeTo(fileStream);
        }

        const reader = res.body.getReader();
        const pump = () => reader.read().then((result: any) => (result.done ? writer.close() : writer.write(result.value).then(pump)));

        return pump();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadFullRecord = () => {
    // downloadFileFromURL(recordedVideoUrl, `${eventInformation.title.replaceAll(" ", "-")}-${eventInformation.id}.mp4`);
    const title: string = eventInformation?.title;
    const eventid: string = eventInformation.id;
    void downloadFile(recordedVideoUrl, `${title.replaceAll(' ', '-')}-${eventid}.mp4`);
  };

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(recordedVideoUrl);
    alert.success('Clips link copied!');
  };

  useEffect(() => {
    if (clips?.length) {
      let hasInProgress = false;

      for (let i = 0; i < clips.length; i++) {
        if (clips[i].status !== 'COMPLETE') {
          hasInProgress = true;
          setCallVideoClips(true);
          break;
        }
      }

      if (!hasInProgress) {
        setCallVideoClips(false);
      }
    }
  }, [eventId, clips]);

  useEffect(() => {
    const intervalVideoClips = setInterval(() => {
      if (callVideoClips) {
        void getVideoClips(Number(eventId));
      }
    }, 30000);

    if (!callVideoClips) {
      console.log('clearing');
      clearInterval(intervalVideoClips);
    }

    return () => clearInterval(intervalVideoClips);
  }, [callVideoClips]);

  const handleRenameSpeaker = () => {
    dispatch(openModal(CHANGE_IDENTITY_MODAL));
  };

  return (
    <>
      <ChangeIdentityModal />
      <Box sx={{ 'maxHeight': '100vh' }}>
        <Box sx={{ 'maxHeight': '20vh' }}>
          <Box sx={{ 'display': 'flex', 'justifyContent': 'space-between', 'background': '#F8FAFB' }}>
            <Box
              display="inline-flex"
              justifyContent={'center'}
              alignItems="center"
              onClick={() => {
                gotoEventpage();
              }}
              my={1}
              sx={{
                'cursor': 'pointer',
                'border': '1px solid black',
                'borderRadius': '5px',
                'px': 1,
                'py': 0.5
              }}
            >
              <Typography
                sx={{
                  'ml': 0.5,
                  'fontSize': '16px',
                  'fontWeight': 300,
                  'lineHeight': '20px'
                }}
              >
                &#x276E; Back to Event
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                'fontSize': '18px',
                'fontWeight': 500,
                'lineHeight': '20px',
                'marginTop': '20px',
                'marginBottom': '20px'
              }}
            >
              {eventInformation?.title ? eventInformation?.title : ''}
            </Typography>
            
            <Box display="flex" flexDirection="row" gap="16px">
              { userTenantId && userTenantId === parseInt(eventInformation?.tenantid) && <Box component="button" onClick={handleRenameSpeaker} display="flex" flexDirection="row" justifyContent="center" alignItems="center" borderRadius={2} sx={{ 'background': '#FFFFFF', 'border': '1px solid #3F434A', 'p': 1, 'px': 2, 'cursor': 'pointer' }}>
                <ChangeCircleIcon />
                <Typography sx={{ 'ml': 2, 'fontSize': '16px', 'lineHeight': '22px', 'fontWeight': 500, 'color': '#555B6D' }}>Rename Speakers</Typography>
              </Box>}

              <Box component="button" onClick={downloadFullRecord} display="flex" flexDirection="row" justifyContent="center" alignItems="center" borderRadius={2} sx={{ 'background': '#FFFFFF', 'border': '1px solid #3F434A', 'p': 1, 'px': 2, 'cursor': 'pointer' }}>
                <ClipDownloadIcon />
                <Typography sx={{ 'ml': 2, 'fontSize': '16px', 'lineHeight': '22px', 'fontWeight': 500, 'color': '#555B6D' }}>Download Full Record</Typography>
              </Box>
              <Box component="button" onClick={copyToClipboard} display="flex" flexDirection="row" justifyContent="center" alignItems="center" borderRadius={2} sx={{ 'background': '#FFFFFF', 'border': '1px solid #3F434A', 'p': 1, 'px': 2, 'cursor': 'pointer' }}>
                <ShareIcon />
                <Typography sx={{ 'ml': 2, 'fontSize': '16px', 'lineHeight': '22px', 'fontWeight': 500, 'color': '#555B6D' }}>Share Full Record</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {loading
            ? (
            <Box pt={2} mt={2} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'height': '60vh' }}>
              <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
                <CircularProgress size="2rem" />
              </Stack>
            </Box>
              )
            : (
            <TranscriptVideoContainer videoUrl={videoUrl} />
              )}
        </Box>
      </Box>
    </>
  );
};

export default TranscriptContainer;
