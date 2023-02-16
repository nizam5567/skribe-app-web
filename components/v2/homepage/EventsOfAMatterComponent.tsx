import { Box, Typography, Button, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { EventResponse } from '../../../openapi';
import { EventStatus } from '../../../openapi/models/event-status';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { capitalizeFirstLetter, convertToDate, convertToTime, dateFormat, getMonthDate, getShortValue, getTimezoneValue, getYear, timeFormat } from '../common';
import BlueCircleIcon from '../svg-components/BlueCircleIcon';
import GreenCircleIcon from '../svg-components/GreenCircleIcon';
import RedCircleIcon from '../svg-components/RedCircleIcon';
import 'moment-timezone';

interface IEventsOfAMatterComponent {
  events: EventResponse[] | undefined
  title?: EventStatus
}
const EventsOfAMatterComponent = ({ events, title }: IEventsOfAMatterComponent) => {
  const router = useRouter();
  const [isEventPresent, setIsEventPresent] = useState<boolean>(false);
  const [eventStatusColor, setEventStatusColor] = useState<string>('#01090F');

  useEffect(() => {
    if (events && events.length !== 0) {
      const color = title === EventStatus?.InProgress ? '#FF4545' : title === EventStatus?.Complete ? '#02BC34' : '#2D4DFF';
      setEventStatusColor(color);

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        // !title - render upcoming, in progress, draft, cancelled, expired event types
        if (title && event.status === title) {
          setIsEventPresent(true);
        }
        if (!title && event.status !== EventStatus.Complete && event.status !== EventStatus.InProgress && event.status !== EventStatus.Archive && event.status !== EventStatus.ArchiveComplete) {
          setIsEventPresent(true);
        }
      }
    }
  }, [events]);

  const handleViewClick = (event: EventResponse) => {
    boundMattersActions.storeMatterId(event.matterid);
    router.push(`/event/${event.matterid}/${event?.id}`);
  };
  return (
    <Box>
      {/* table header */}
      {isEventPresent ? (
        <Box mt={2}>
          <Box display="flex" alignItems="center" ml={4} mb={2}>
            {title && title === EventStatus.InProgress ? <RedCircleIcon /> : title && title === EventStatus.Complete ? <GreenCircleIcon /> : <BlueCircleIcon />}

            <Typography sx={{ 'ml': 1, 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '20px' }}>{(title && 'Live') || 'Upcoming Events'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" border={1} borderLeft={0} borderRight={0} borderColor="#EAEBED" p={2}>
            <Typography sx={{ 'ml': 2, 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Date</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Time</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '35%' }}>Event Name</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Invited</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Exhibits</Typography>
            {/* <Typography sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "17px", color: "#8A9099", textTransform: "uppercase", width: "15%" }}>Stipulation</Typography> */}
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Status</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '15%', 'textAlign': 'center' }}>Action</Typography>
          </Box>
        </Box>
      ) : null}

      {/* table body */}
      {isEventPresent
        ? events?.map((event: EventResponse) => {
          if (event.status === title || (!title && event.status !== EventStatus.InProgress && event.status !== EventStatus.Complete && event.status !== EventStatus.Archive && event.status !== EventStatus.ArchiveComplete)) {
            return (
                <Box key={event?.id} display="flex" alignItems="center" border={1} borderColor="#EAEBED" p={2} borderLeft={0} borderRight={0} borderTop={0}>
                  <Box sx={{ 'ml': 2, 'width': '10%' }}>
                    {/* <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{event?.datestart && getMonthDate(event?.datestart)}</Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{(event?.datestart && getYear(event?.datestart)) || ""}</Typography> */}
                    <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{event?.datestart && event?.timezone && convertToDate(event.datestart, getShortValue(event.timezone))}</Typography>

                    {!event?.datestart && (
                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                        <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Not</Typography>
                        <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Provided</Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ 'width': '10%' }}>
                    {/* <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F" }}>{event?.datestart && timeFormat(event?.datestart)}</Typography> */}
                    <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F' }}>{event?.datestart && event?.timezone && convertToTime(event.datestart, getShortValue(event.timezone))}</Typography>
                    {!event?.datestart && (
                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                        <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Not</Typography>
                        <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#FF4545' }}>Provided</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '35%', 'pr': 2 }}>{event?.title}</Typography>
                  <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '10%' }}>{event?.invited ? event?.invited : 0}</Typography>
                  <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '10%' }}>{event?.exhibit ? event?.exhibit : 0}</Typography>
                  {/* <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: "#01090F", width: "15%" }}>{event?.stipulation && capitalizeFirstLetter(event?.stipulation)}</Typography> */}
                  <Typography color={eventStatusColor} sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '15px', 'width': '10%' }}>
                    {event?.status && event.status === EventStatus.InProgress ? 'In Progress' : event?.status ? capitalizeFirstLetter(event?.status.toLowerCase()) : '-'}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" width="15%">
                    {/* {event?.status === EventStatus.InProgress && (
                      <Button variant="contained" disableElevation sx={{ mr: 1, fontSize: "14px", fontWeight: 400, lineHeight: "17px", color: "#fff", padding: "10px 20px", background: "#02178C", borderRadius: 1 }}>
                        Join
                      </Button>
                    )} */}
                    <Button variant="outlined" disableElevation sx={{ 'textDecoration': 'none', 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A', 'padding': '10px 20px', 'background': '#fff', 'border': '1px solid #E8E9EB', 'borderRadius': 1, '&:hover': { 'background': '#fff', 'borderColor': '#02178c', 'color': '#02178c' } }} onClick={() => handleViewClick(event)}>
                      View
                    </Button>
                  </Box>
                </Box>
            );
          }
        })
        : null}
    </Box>
  );
};

export default EventsOfAMatterComponent;
