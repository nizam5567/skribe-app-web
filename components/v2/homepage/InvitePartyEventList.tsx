import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService, getEventTenantService, getPartyService } from '../../../helpers/api-helper';
import { EventResponse } from '../../../openapi';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import { getMonthDate, getShortValue, getTenantIdFromLocalStorage, getYear, timeFormat } from '../common';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import CloseArrowIcon from '../svg-components/CloseArrowIcon';
import OpenArrowIcon from '../svg-components/OpenArrowIcon';
import InvitedPartyEventListItem from './InvitedPartyEventListItem';

const InvitePartyEventList = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { invitedEvents } = useAppSelector((state: RootState) => state?.eventReducer);
  const { accessToken } = useAuthContext();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const getInvitedEvents = async () => {
    try {
      if (accessToken) {
        const eventService = await getEventService(accessToken);
        const eventResult = (await eventService.getInvitedEvents()).data;
        const invitedEvents: EventResponse[] = eventResult.events ? eventResult.events : [];
        boundEventsActions.storeInvitedEvents(invitedEvents);
      }
    } catch (error: any) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (invitedEvents === undefined) {
      getInvitedEvents();
    }
  }, [accessToken]);

  const handleMatterCardExpand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // const handleViewClick = (event: EventResponse) => {
  //   router.push(`/event/${event?.matterid}/${event?.id}`);
  // };

  // const handleInvitationAccept = async (event: EventResponse) => {
  //   try {
  //     setIsLoading(true);
  //     const partyService = await getPartyService(accessToken);
  //     const response = await partyService.acceptInvitation(event.id);
  //     if (response.data) {
  //       boundEventsActions.updateInvitedEvent(event);
  //       setIsLoading(false);
  //     }
  //   } catch (error: any) {
  //     setIsLoading(false);
  //     handleApiError(error);
  //   }
  // };

  return (
    <Fragment>
      {invitedEvents && invitedEvents.length > 0 && (
        <Box sx={{ 'border': '1px solid #E8E9EB' }} mb={2} borderRadius={2}>
          <Box py={2} px={3} flex={1} display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} justifyContent="space-between" alignItems="center" zIndex={10} borderRadius={2} sx={{ 'width': '100%', 'background': '#fff', 'cursor': 'pointer', 'filter': 'drop-shadow(-4px 8px 24px rgba(44, 63, 88, 0.02))', 'boxShadow': '0px 6px 6px rgba(0, 0, 0, 0.08)' }} onClick={(e) => handleMatterCardExpand(e)}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box display="flex" flexDirection="row" alignItems="center" sx={{ 'cursor': 'pointer' }}>
                <Typography sx={{ 'color': '#02178C', 'fontSize': '18px', 'lineHeight': '22px', 'fontWeight': '400', 'marginRight': '8px', 'marginLeft': '8px' }}>Your invites ({invitedEvents?.length || 0})</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" sx={{ 'cursor': 'pointer' }} onClick={handleMatterCardExpand}>
              {isExpanded ? <CloseArrowIcon /> : <OpenArrowIcon />}
            </Box>
          </Box>
          <Box sx={{ 'background': '#FCFDFF', 'boxShadow': '0px 6px 6px rgba(0, 0, 0, 0.08)' }} borderRadius={2} boxShadow={2}>
            {isExpanded && (
              <Box sx={{ 'background': '#FCFDFF' }} borderRadius={2} pb={4}>
                <Box borderRadius={2}>
                  <Box pt={3}>
                    <Box display="flex" alignItems="center" ml={4} mb={2}>
                      <Typography sx={{ 'ml': 1, 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '20px' }}>Invited Events</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" border={1} borderLeft={0} borderRight={0} borderColor="#EAEBED" p={2}>
                      <Typography sx={{ 'ml': 2, 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '20%' }}>Date</Typography>
                      <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '20%' }}>Time</Typography>
                      <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '40%' }}>Event Name</Typography>
                      <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '20%', 'textAlign': 'center' }}>Action</Typography>
                    </Box>
                  </Box>
                  {invitedEvents &&
                    invitedEvents.length > 0 &&
                    invitedEvents.map((event: EventResponse) => (
                        <InvitedPartyEventListItem event={event} key={event?.id} />
                        // <Box key={event?.id} display="flex" alignItems="center" border={1} borderColor="#EAEBED" p={2} borderLeft={0} borderRight={0} borderTop={0}>
                        //   <Box sx={{ ml: 2, width: "20%" }}>
                        //     <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{event?.datestart && getMonthDate(event?.datestart)}</Typography>
                        //     <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{(event?.datestart && getYear(event?.datestart)) || ""}</Typography>
                        //     {!event?.datestart && (
                        //       <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                        //         <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "20px", color: "#FF4545" }}>Not</Typography>
                        //         <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "20px", color: "#FF4545" }}>Provided</Typography>
                        //       </Box>
                        //     )}
                        //   </Box>
                        //   <Box sx={{ width: "20%" }}>
                        //     <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{event?.datestart && timeFormat(event?.datestart)}</Typography>
                        //     <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{(event?.timezone && getShortValue(event?.timezone)) || ""}</Typography>
                        //     {!event?.datestart && (
                        //       <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                        //         <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "20px", color: "#FF4545" }}>Not</Typography>
                        //         <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "20px", color: "#FF4545" }}>Provided</Typography>
                        //       </Box>
                        //     )}
                        //   </Box>
                        //   <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F", width: "40%" }}>{event?.title}</Typography>
                        //   <Box display="flex" justifyContent="center" alignItems="center" width="20%">
                        //     {!event.accepted ? (
                        //       <Button
                        //         disableElevation
                        //         size="small"
                        //         variant="contained"
                        //         sx={{ padding: "5px 10px", background: "#02178c" }}
                        //         onClick={() => {
                        //           handleInvitationAccept(event);
                        //         }}
                        //         disabled={isLoading}
                        //       >
                        //         Accept
                        //       </Button>
                        //     ) : (
                        //       <Button disableElevation size="small" variant="outlined" sx={{ padding: "5px 10px" }} onClick={() => handleViewClick(event)}>
                        //         View
                        //       </Button>
                        //     )}
                        //   </Box>
                        // </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default InvitePartyEventList;
