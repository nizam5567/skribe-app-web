import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventResponse } from '../../../openapi';
import { EventStatus } from '../../../openapi/models/event-status';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { capitalizeFirstLetter, convertToDate, getMonthDate, getShortValue, getYear } from '../common';
import GreenCircleIcon from '../svg-components/GreenCircleIcon';

interface IArchivedEventsOfAMatterComponent {
  events: EventResponse[] | undefined
}
const ArchivedEventsOfAMatterComponent = ({ events }: IArchivedEventsOfAMatterComponent) => {
  const router = useRouter();
  const [isEventPresent, setIsEventPresent] = useState<boolean>(false);
  const [eventStatusColor, setEventStatusColor] = useState<string>('#01090F');
  const title1 = EventStatus.Archive;
  const title2 = EventStatus.ArchiveComplete;
  useEffect(() => {
    if (events && events.length !== 0) {
      const color = '#02BC34';
      setEventStatusColor(color);

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (event.status === title1 || event.status === title2) {
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
      {isEventPresent
        ? (
        <Box mt={2}>
          <Box display="flex" alignItems="center" ml={4} mb={2}>
            <GreenCircleIcon />
            <Typography sx={{ 'ml': 1, 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '20px' }}>{(title1 && capitalizeFirstLetter(title1)) || 'Upcoming Events'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" border={1} borderLeft={0} borderRight={0} borderColor="#EAEBED" p={2}>
            <Typography sx={{ 'ml': '20px', 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '50%' }}>Event Name</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '20%' }}>Exhibits</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '10%' }}>Status</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'textTransform': 'uppercase', 'width': '20%', 'textAlign': 'center' }}>Action</Typography>
          </Box>
        </Box>
          )
        : null}

      {isEventPresent
        ? events?.map((event: EventResponse) => {
          if (event.status === title1 || event.status === title2) {
            return (
                <Box key={event?.id} display="flex" alignItems="center" border={1} borderColor="#EAEBED" p={2} borderLeft={0} borderRight={0} borderTop={0}>
                  <Typography sx={{ 'ml': '20px', 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '50%', 'pr': 2 }}>{event?.title}</Typography>
                  <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '20px', 'color': '#01090F', 'width': '20%' }}>{event?.exhibit ? event?.exhibit : 0}</Typography>
                  <Typography color={eventStatusColor} sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '15px', 'width': '10%' }}>
                    Archive
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" width="20%">
                    <Button variant="outlined" disableElevation sx={{ 'textDecoration': 'none', 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A', 'padding': '10px 20px', 'background': '#fff', 'border': '1px solid #E8E9EB', 'borderRadius': 1, '&:hover': { 'background': '#fff', 'color': '#3F434A' } }} onClick={() => handleViewClick(event)}>
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

export default ArchivedEventsOfAMatterComponent;
