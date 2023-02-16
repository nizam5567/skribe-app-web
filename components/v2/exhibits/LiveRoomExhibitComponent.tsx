import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService, getGuestService } from '../../../helpers/api-helper';

import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { handleApiError } from '../../../util/error-handlers';
import VisibleToAllSection from '../LiveEventRoom/Exhibits/VisibleToAllSection';
import VisibleToYouSection from '../LiveEventRoom/Exhibits/VisibleToYouSection';
import DocumentIcon from '../svg-components/DocumentIcon';
import { IS_ANONYMOUS_USER } from '../../../consts/consts';

interface ILiveRoomExhibitComponent {
  eventId: number
  onClose: () => void
}

const LiveRoomExhibitComponent = ({ eventId, onClose }: ILiveRoomExhibitComponent) => {
  const { accessToken } = useAuthContext();
  const { authUser } = useAuthContext();

  const [isOnTheRecordSelected, setIsOnTheRecordSelected] = useState<boolean>(true);
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean | undefined>();

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

  const getPublicExhibitsByEventId = async (eventId: number) => {
    if (accessToken) {
      try {
        const eventService = await getGuestService(accessToken);
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
      if (isUserAnonymous === true) {
        getPublicExhibitsByEventId(Number(eventId));
      } else {
        getExhibitsByEventId(Number(eventId));
        getExhibitsOfAParty(Number(eventId));
      }
    }

    const callExhibitsApi = setInterval(() => {
      if (eventId) {
        if (isUserAnonymous === true) {
          getPublicExhibitsByEventId(Number(eventId));
        } else {
          getExhibitsByEventId(Number(eventId));
          getExhibitsOfAParty(Number(eventId));
        }
      }
    }, 5000);

    return () => clearInterval(callExhibitsApi);
  }, [isUserAnonymous]);

  useEffect(() => {
    if (typeof window !== undefined) {
      // const isAnonymUser = getStorageItem(IS_ANONYMOUS_USER);
      const isAnonymUser = sessionStorage.getItem(IS_ANONYMOUS_USER);

      if (isAnonymUser) {
        setIsUserAnonymous(true);
      } else {
        setIsUserAnonymous(false);
      }
    }
  }, []);

  return (
    <Box position="relative" height="100vh" sx={{ 'background': '#f6f6f6', 'overflow': 'hidden' }}>
      <Box position="absolute" sx={{ 'width': '100%', 'background': '#fff' }} top={0} bottom={0} right={0}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" position="relative">
          <Box mr={2} sx={{ 'margin': '24px 0 24px 16px' }}>
            <DocumentIcon />
          </Box>
          <Typography
            sx={{
              'fontSize': '16px',
              'fontWeight': 500,
              'lineHeight': '19px',
              'color': '#01090F'
            }}
          >
            Exhibits
          </Typography>

          <Box position="absolute" sx={{ 'top': '0.5rem', 'right': '0.5rem' }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            'borderTop': '1px solid #F1F5F8',
            'borderBottom': '1px solid #F1F5F8',
            'cursor': 'pointer'
          }}
        >
          <Box flex={1} p={2} sx={{ 'background': isOnTheRecordSelected ? '#F1F5F8' : '#ffffff' }} display="flex" justifyContent="center" alignItems="center" onClick={handleOnTheRecordClick}>
            <Typography
              sx={{
                'fontSize': '16px',
                'fontWeight': 500,
                'lineHeight': '19px',
                'color': '#01090F'
              }}
            >
              On the Record
            </Typography>
          </Box>
          {isUserAnonymous !== true
            ? (
            <Box flex={1} p={2} sx={{ 'background': isOnTheRecordSelected ? '#ffffff' : '#F1F5F8' }} display="flex" justifyContent="center" alignItems="center" onClick={handleOffTheRecordClick}>
              <Typography
                sx={{
                  'fontSize': '16px',
                  'fontWeight': 500,
                  'lineHeight': '19px',
                  'color': '#01090F'
                }}
              >
                Off the Record
              </Typography>
            </Box>
              )
            : (
                ''
              )}
        </Box>
        {isOnTheRecordSelected ? <VisibleToAllSection /> : <VisibleToYouSection />}
      </Box>
    </Box>
  );
};

export default LiveRoomExhibitComponent;
