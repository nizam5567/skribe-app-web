import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { EventStatus } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getTenantIdFromLocalStorage } from '../common';
import BackIcon from '../svg-components/BackIcon';
import Timer from '../Timer';

const PostMatterDisplaySection = () => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const userTenantId = getTenantIdFromLocalStorage();
  const eventId: string = router.query.eventId as string;
  const { matter } = useAppSelector((state: RootState) => state?.mattersReducer);
  const { event } = useAppSelector((state: RootState) => state?.eventReducer);
  const [showStartEventButton, setShowStartEventButton] = useState<boolean>(false);
  const [showJoinEventButton, setShowJoinEventButton] = useState<boolean>(false);
  const [readyToShowEventStartJoinButton, setReadyToShowEventStartJoinButton] = useState<boolean>(false);

  useEffect(() => {
    if ((event?.status === EventStatus.Scheduled || event?.status === EventStatus.InProgress) && readyToShowEventStartJoinButton) {
      setShowStartEventButton(true);
    } else if (event?.status !== EventStatus.Draft && event?.status !== EventStatus.Complete && readyToShowEventStartJoinButton) {
      setShowJoinEventButton(true);
    }
  }, []);

  const getEventJoinLink = async (eventId: string) => {
    if (eventId && accessToken) {
      try {
        const participantService = await getEventService(accessToken);
        const response: any = await participantService.getParticipantLink(eventId);
        let path = 'waiting';
        if (event?.status === EventStatus.InProgress) {
          path = 'live';
        }
        if (response) {
          router.push(
            {
              'pathname': '/meeting-rooms/[participantkey]/[path]',
              'query': { 'participantkey': response.data.participantkey, path }
            },
            undefined,
            { 'shallow': false }
          );
        }
      } catch (error: any) {}
    }
  };

  const goToMeetingRoom = async () => {
    try {
      let path = 'waiting';
      if (event?.status === EventStatus.InProgress) {
        path = 'live';
      }

      router.push(
        {
          'pathname': '/meeting-rooms/[participantkey]/[path]',
          'query': { 'participantkey': event?.participantkey, path }
        },
        undefined,
        { 'shallow': false }
      );
    } catch (error: any) {}
  };

  const getDaysHoursMinutes = (days: number, hours: number, minutes: number) => {
    if (days === 0 && hours === 0 && minutes <= 30 && (event?.status === EventStatus.InProgress || event?.status === EventStatus.InProgress || event?.status === EventStatus.Scheduled)) {
      setReadyToShowEventStartJoinButton(true);
    }
  };

  const handleBack = () => {
    router.push('/home');
  };

  return (
    <Box>
      <Box mt={2} display="flex" alignItems="flex-start" justifyContent="space-between" sx={{ 'width': '100%' }}>
        <Box>
          <Box display="inline-flex" justifyContent={'center'} alignItems="center" onClick={handleBack} my={1} sx={{ 'cursor': 'pointer', 'border': '1px solid black', 'borderRadius': '5px', 'px': 1, 'py': 0.5 }}>
            <Typography sx={{ 'ml': 0.5, 'fontSize': '16px', 'fontWeight': 300, 'lineHeight': '20px' }}>&#x276E; Back</Typography>
          </Box>
          <Typography mt={1} sx={{ 'fontWeight': 500, 'fontSize': '28px', 'lineHeight': '34px', 'color': '#3F434A' }}>
            {event?.title}
          </Typography>
          {event && event?.status && (
            <Box display={'inline-flex'} borderRadius={1} p={0.5} px={1} mt={1} sx={{ 'background': '#3F434A' }}>
              <Typography sx={{ 'fontWeight': 100, 'fontSize': '12px', 'lineHeight': '14px', 'color': '#fff' }}>{event.status}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box my={3} sx={{ 'height': '1px', 'width': '100%', 'background': '#E8E9EB' }}></Box>
    </Box>
  );
};

export default PostMatterDisplaySection;
