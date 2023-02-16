import { CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import fileDownload from 'js-file-download';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { boundClipActions } from '../../../redux/reducers/clipsReducer/clipsAction';
import { useAppSelector } from '../../../redux/store/hooks';
import SmallDownloadIcon from '../svg-components/SmallDownloadIcon';
import TranscriptInProcess from './TranscriptInProcess';
import VideoRecord from './VideoRecord';
import WrittenRecord from './WrittenRecord';
import { downloadFileFromURL } from '../common';
import { EventStatus } from '../../../openapi';
import ArchiveWrittenRecord from './ArchiveWrittenRecord';

interface TheRecord {
  eventId: number
}

const TheRecord = ({ eventId }: TheRecord) => {
  const { accessToken } = useAuthContext();
  const [transcriptStatus, setTranscriptStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [recordedVideoUrl, setRecordedVideoUrl] = useState('');
  const [transcriptPdfUrl, setTranscriptPdfUrl] = useState<string>('');

  const { event } = useAppSelector((store) => store.eventReducer);

  const getTranscriptStatus = async (id: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getTranscriptStatus(id);
        setTranscriptStatus(response.data);
      } catch (error: any) {
        setTranscriptStatus('');
      } finally {
        setLoading(false);
      }
    }
  };

  const getVideoClips = async (eventId: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getvideoclips(eventId);
        if (response && response.data) {
          boundClipActions.doStoreClips(response.data.clips);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const getVideoInformation = async (eventId: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getPosteventVideo(eventId);
        setVideoUrl(response.data.streamUrl);
        setRecordedVideoUrl(response.data.recordedVideoUrl);
        setTranscriptPdfUrl(response.data.transcriptPdf);
      } catch (error: any) {
        console.log('error', error);
      }
    }
  };

  useEffect(() => {
    getVideoClips(eventId);
    getVideoInformation(eventId);
    getTranscriptStatus(eventId);
  }, [eventId]);

  useEffect(() => {
    const intervalTranscriptStatus = setInterval(async () => {
      if (eventId && transcriptStatus !== 'TRANSCRIPTION_ASR_COMPLETE' && transcriptStatus !== 'TRANSCRIPTION_PROOF_READ_COMPLETE') {
        await getTranscriptStatus(eventId);
      }
    }, 120000);

    if (transcriptStatus === 'TRANSCRIPTION_ASR_COMPLETE' || transcriptStatus === 'TRANSCRIPTION_PROOF_READ_COMPLETE') {
      console.log('clearing');
      clearInterval(intervalTranscriptStatus);
    }

    return () => clearInterval(intervalTranscriptStatus);
  }, [eventId, transcriptStatus]);

  const downloadFile = async (url: string, fileName: string) => {
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

  const handleFullVideo = () => {
    // window.open(videoUrl);
    // downloadFileFromURL(recordedVideoUrl, `${event.title.replaceAll(" ", "-")}.mp4`);
    downloadFile(recordedVideoUrl, `${event.title.replaceAll(' ', '-')}.mp4`);
  };

  // IF API RESPONSE IS LOADING
  if (loading) {
    return (
      <Box borderRadius={2} boxShadow={1} p={3} mb={4} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff' }}>
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" mt={3} style={{ 'minHeight': '5vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
      </Box>
    );
  }

  return (
    <>
      {transcriptStatus !== 'TRANSCRIPTION_ASR_COMPLETE' && transcriptStatus !== 'TRANSCRIPTION_PROOF_READ_COMPLETE'
        ? (
        <TranscriptInProcess />
          )
        : (
        <Box borderRadius={2} boxShadow={1} p={3} mb={2} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff' }}>
          <Box display="flex" pb={3} justifyContent={'space-between'} alignItems="flex-start" sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
            <Box>
              <Typography
                display={'inline-flex'}
                sx={{
                  'fontSize': '20px',
                  'fontWeight': '100',
                  'lineHeight': '32px',
                  'paddingBottom': '10px'
                }}
              >
                The Record
              </Typography>
              <Typography
                sx={{
                  'fontSize': '16px',
                  'fontWeight': '100',
                  'lineHeight': '18px',
                  'color': '#616161'
                }}
              >
                Everything produced from your event.
              </Typography>
            </Box>

            {videoUrl && (
              <Box display="flex" justifyContent={'space-between'} sx={{ 'cursor': 'pointer' }} onClick={handleFullVideo}>
                <SmallDownloadIcon />
                <Typography
                  sx={{
                    'fontSize': '15px',
                    'fontWeight': '100',
                    'lineHeight': '18px',
                    'color': '#02178C',
                    'marginLeft': 1
                  }}
                >
                  Download Full Video
                </Typography>
              </Box>
            )}
          </Box>
          <Divider />
          <Box mt={3} mx={6}>
            <Box display="flex" justifyContent={'flex-start'} alignItems="center" sx={{ 'color': '#616161' }}>
              <Grid container columns={12}>
                <Grid item lg={6}>
                  <VideoRecord />
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    sx={{
                      'fontSize': '16px',
                      'fontWeight': '400',
                      'lineHeight': '18px',
                      'color': '#01090F'
                    }}
                  >
                    Written Record
                  </Typography>
                  {event?.status && event?.status === EventStatus.Complete && <WrittenRecord transcriptPdfUrl={transcriptPdfUrl} />}
                  {event?.status && event?.status === EventStatus.ArchiveComplete && <ArchiveWrittenRecord transcriptPdfUrl={transcriptPdfUrl} />}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
          )}
    </>
  );
};
export default TheRecord;
