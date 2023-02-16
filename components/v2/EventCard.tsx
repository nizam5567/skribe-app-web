import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { changeDateFormat, getShortValue } from './common';
import EditIcon from './svg-components/EditIcon';

interface IEventCard {
  event: any
}

const EventCard = ({ event }: IEventCard) => {
  const router = useRouter();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let { dateStart } = event;
  // dateStart = new Date(dateStart);
  dateStart = changeDateFormat(dateStart);
  const date = dateStart.getDate();
  const today = new Date();
  const month = dateStart.getMonth();
  const monthName = monthNames[month];
  const fullYear = dateStart.getFullYear();

  const startTime = event?.dateStart;
  const startTimeInHour =
    startTime &&
    startTime.toLocaleString(event?.timeZone, {
      'hour': 'numeric',
      'minute': 'numeric',
      'hour12': true
    });
  const eventStartTime = startTimeInHour && startTimeInHour.substring(16, 21);
  const amPm = '';
  // parseInt(eventStartTime.substring(0, 2)) <= 12 ? (amPm = "AM") : (amPm = "PM");

  const endTime = event?.dateEnd;
  // let endTimeInHour = endTime.toLocaleString(event?.timeZone, {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  const handleManage = () => {
    router.push(`/event/${event?.matterid}/${event?.eventId}`);
  };

  return (
    <Box sx={{ 'borderBottom': '1px solid #d5d5d5', 'padding': '10px 4px', 'background': '#fff' }} borderRadius={1} display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ 'xs': 'column', 'md': 'row' }}>
      <Box display="flex" flexDirection={{ 'xs': 'row', 'md': 'column' }} justifyContent="center" alignItems="center" sx={{ 'width': '15%' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '20px', 'whiteSpace': 'nowrap' }}>
          January 21
        </Typography>
        <Typography textAlign="center" ml={{ 'xs': '4px', 'md': '0' }} sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          2022
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '15%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': { 'xs': 'nowrap', 'md': 'normal' } }}>
          02:00 PM, CST
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '30%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px' }}>
          {event?.title}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          0
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          0
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          {event?.stipulation}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': { 'xs': '100%', 'md': '10%' }, 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Button variant="outlined" size="small" startIcon={<EditIcon />} sx={{ 'width': '100%', 'background': '#fff', 'border': '1px solid #02178C', 'padding': '5px 10px', 'fontSize': '14px', 'letterSpacing': '1px', 'lineHeight': '18px', 'fontWeight': '300', 'color': '#02178C', 'marginTop': { 'xs': '4px', 'md': '0' } }} onClick={handleManage}>
          Manage
        </Button>
      </Box>
    </Box>
  );
};

export default EventCard;
