import { Box, CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecordProcessSteps from '../../../components/aNewRecordProcess/RecordProcessSteps';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';

const TranscriptInProcess = () => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const eventId: string = router.query.eventId as string;
  const [transcriptStatus, setTranscriptStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // existing code
  const getTranscriptStatus = async (id: number) => {
    if (accessToken) {
      try {
        const eventService: any = await getEventService(accessToken);
        const response: any = await eventService.getTranscriptStatus(id);
        setTranscriptStatus(response.data);
      } catch (error: any) {
        setTranscriptStatus('');
      } finally {
        setLoading(false);
      }
    }
  };

  // existing code but one transcriptStatus condition removed
  useEffect(() => {
    const intervalTranscriptStatus = setInterval(async () => {
      if (eventId && transcriptStatus !== 'TRANSCRIPTION_ASR_COMPLETE') {
        await getTranscriptStatus(parseInt(eventId));
      }
    }, 10000);

    if (transcriptStatus === 'TRANSCRIPTION_ASR_COMPLETE') {
      console.log('clearing');
      clearInterval(intervalTranscriptStatus);
    }

    return () => clearInterval(intervalTranscriptStatus);
  }, [eventId, transcriptStatus]);

  // new code
  const getTranscriptStatusFromApi = async (eventId: number) => {
    try {
      await getTranscriptStatus(eventId);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // new code, to make api call on first load
  const [isFirstApiCallDone, setIsFirstApiCallDone] = useState(false);
  useEffect(() => {
    if (eventId && !isFirstApiCallDone) {
      getTranscriptStatusFromApi(parseInt(eventId));
      setIsFirstApiCallDone(true);
    }
  }, [eventId]);

  return (
    <>
      {loading
        ? (<Box borderRadius={2} boxShadow={1} p={3} mb={4} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff' }}>
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" my={3} style={{ 'minHeight': '5vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
      </Box>)
        : (<RecordProcessSteps recordProcessStatus={transcriptStatus}/>)}

    </>
  );
};
export default TranscriptInProcess;
