import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../contexts/AuthContext';
import { EventResponse } from '../../../openapi';
import { getMonthDate, getShortValue, getTenantIdFromLocalStorage, getYear, timeFormat } from '../common';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { getPartyService } from '../../../helpers/api-helper';
import { handleApiError } from '../../../util/error-handlers';

interface IInvitedPartyEventListItem {
  event: EventResponse
}
const InvitedPartyEventListItem = ({ event }: IInvitedPartyEventListItem) => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleViewClick = (event: EventResponse) => {
    router.push(`/event/${event?.matterid}/${event?.id}`);
  };

  const handleInvitationAccept = async (event: EventResponse) => {
    if (accessToken) {
      try {
        setIsLoading(true);
        const partyService = await getPartyService(accessToken);
        const response = await partyService.acceptInvitation(event.id);
        if (response.data) {
          boundEventsActions.updateInvitedEvent(event);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        handleApiError(error);
      }
    }
  };
  return (
    <Box display="flex" alignItems="center" border={1} borderColor="#EAEBED" p={2} borderLeft={0} borderRight={0} borderTop={0}>
      <Box sx={{ 'ml': 2, 'width': '20%' }}>
        <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{event?.datestart && getMonthDate(event?.datestart)}</Typography>
        <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{(event?.datestart && getYear(event?.datestart)) || ''}</Typography>
        {!event?.datestart && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
            <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Not</Typography>
            <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Provided</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ 'width': '20%' }}>
        <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{event?.datestart && timeFormat(event?.datestart)}</Typography>
        <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{(event?.timezone && getShortValue(event?.timezone)) || ''}</Typography>
        {!event?.datestart && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
            <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Not</Typography>
            <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Provided</Typography>
          </Box>
        )}
      </Box>
      <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '40%' }}>{event?.title}</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" width="20%">
        {!event.accepted
          ? (
          <Button
            disableElevation
            size="small"
            variant="contained"
            sx={{ 'padding': '5px 10px', 'background': '#02178c' }}
            onClick={() => {
              handleInvitationAccept(event);
            }}
            disabled={isLoading}
          >
            Accept
          </Button>
            )
          : (
          <Button disableElevation size="small" variant="outlined" sx={{ 'padding': '5px 10px', 'borderColor': '#02178c', 'color': '#02178c', '&:hover': { 'borderColor': '02178c' } }} onClick={() => handleViewClick(event)}>
            View
          </Button>
            )}
      </Box>
    </Box>
  );
};

export default InvitedPartyEventListItem;
