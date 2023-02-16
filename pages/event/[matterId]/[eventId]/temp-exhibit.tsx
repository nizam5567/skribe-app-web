import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DocumentIcon from '../../../../components/svg-components/DocumentIcon';
import VisibleToAllSection from '../../../../components/v2/LiveEventRoom/Exhibits/VisibleToAllSection';
import VisibleToYouSection from '../../../../components/v2/LiveEventRoom/Exhibits/VisibleToYouSection';
import CrossIcon from '../../../../components/v2/svg-components/CrossIcon';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getEventService } from '../../../../helpers/api-helper';
import { boundExhibitsActions } from '../../../../redux/reducers/exhibitReducer/exhibitAction';
import { useAppSelector } from '../../../../redux/store/hooks';
import { RootState } from '../../../../redux/store/store';
import { handleApiError } from '../../../../util/error-handlers';

const Transcript: NextPage = () => {
  const { accessToken } = useAuthContext();
  const router = useRouter();
  const { eventId } = router.query;

  const [isOnTheRecordSelected, setIsOnTheRecordSelected] = useState<boolean>(true);

  const handleOnTheRecordClick = () => {
    setIsOnTheRecordSelected(true);
  };
  const handleOffTheRecordClick = () => {
    setIsOnTheRecordSelected(false);
  };

  const getExhibitsOfAParty = async (eventId: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response = await eventService.getExhibitsByParty(eventId);
        if (response.status === 200) {
          boundExhibitsActions.storeVisibleToPartyExhibits(response?.data?.exhibits);
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  const getExhibitsByEventId = async (eventId: number) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.getExhibitsByEvent(eventId);
        if (response?.status === 200) {
          boundExhibitsActions.storeVisibleToAllExhibits(response?.data?.exhibits);
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    if (eventId) {
      getExhibitsByEventId(Number(eventId));
      getExhibitsOfAParty(Number(eventId));
    }

    const callExhibitsApi = setInterval(() => {
      if (eventId) {
        getExhibitsByEventId(Number(eventId));
        getExhibitsOfAParty(Number(eventId));
      }
    }, 5000);

    return () => clearInterval(callExhibitsApi);
  }, []);

  return (
    <Box position="relative" height="100vh" sx={{ 'background': '#f6f6f6' }}>
      <Box position="absolute" sx={{ 'width': '342px', 'background': '#fff' }} top={0} bottom={0} right={0}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" position="relative">
          <Box mr={2} sx={{ 'margin': '24px 0 24px 16px' }}>
            <DocumentIcon />
          </Box>
          <Typography sx={{ 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '19px', 'color': '#01090F' }}>Exhibits</Typography>
        </Box>
        <Box display="flex" sx={{ 'borderTop': '1px solid #F1F5F8', 'borderBottom': '1px solid #F1F5F8', 'cursor': 'pointer' }}>
          <Box flex={1} p={2} sx={{ 'background': isOnTheRecordSelected ? '#F1F5F8' : '#ffffff' }} display="flex" justifyContent="center" alignItems="center" onClick={handleOnTheRecordClick}>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '19px', 'color': '#01090F' }}>On the Record</Typography>
          </Box>
          <Box flex={1} p={2} sx={{ 'background': isOnTheRecordSelected ? '#ffffff' : '#F1F5F8' }} display="flex" justifyContent="center" alignItems="center" onClick={handleOffTheRecordClick}>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '19px', 'color': '#01090F' }}>Off the Record</Typography>
          </Box>
        </Box>
        {isOnTheRecordSelected ? <VisibleToAllSection /> : <VisibleToYouSection />}
      </Box>
    </Box>
  );
};

export default Transcript;
