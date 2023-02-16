import { Box, Typography, Button } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import CalendarIcon from '../svg-components/CalendarIcon';
import ClockIcon from '../svg-components/ClockIcon';
import DurationIcon from '../svg-components/DurationIcon';
import SkribeSmallLogoIcon from '../svg-components/SkribeSmallLogoIcon';
import InvitationLinkIcon from '../svg-components/InvitationLinkIcon';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import AddToCalenderIcon from '../svg-components/AddToCalenderIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getTenantIdFromLocalStorage } from '../common';
import EventDetailsWrapper from '../schedule-event/EventDetailsWrapper';

const PostEventBasicInformation = () => {
  const dispatch = useDispatch();
  const { event } = useAppSelector((state: RootState) => state?.eventReducer);
  const userTenantId: number | undefined = getTenantIdFromLocalStorage();
  const handleEventDetails = () => {
    dispatch(openModal('event'));
  };

  const convertSecondToHrMin = (sec: any) => {
    if (sec) {
      const seconds = Number(sec);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      if (hours) {
        const min = minutes - hours * 60;
        return `${hours} hr ${min} min `;
      }
      return `${minutes} min`;
    }
    return '0 min';
  };

  return (
    <Fragment>
      <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
        <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" mb={3} sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <SkribeSmallLogoIcon />
            <Box display="flex" flexDirection="column" ml={2} justifyContent="center">
              <Typography sx={{ 'fontSize': '20px', 'fontWeight': 500, 'lineHeight': '24px', 'color': '#3F434A' }}> {event && event.title} </Typography>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A' }}>This event was hosted virtually by Skribe at the following date and time:</Typography>
            </Box>
          </Box>
          {userTenantId && event?.tenantid === userTenantId && event.status !== 'IN_PROGRESS' && event.status !== 'LIVE' && event.status !== 'COMPLETE' && (
            <Box display="flex" justifyContent="flex-end">
              <SecondaryButton text="Edit" onClickFn={handleEventDetails} />
            </Box>
          )}
        </Box>
        <Box mb={1.5}>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#595F69' }}>DETAILS</Typography>
        </Box>
        <Box mb={2}>
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <EventDetailsWrapper icon={<CalendarIcon />} title="Date" data={event?.datestart} name="date" />
            <EventDetailsWrapper icon={<ClockIcon />} title="Time" data={event?.datestart} name="time" />
            <EventDetailsWrapper icon={<DurationIcon />} title="Event Duration" data={event?.eventduration ? convertSecondToHrMin(event.eventduration) : '0 min'} name="eventDuration" />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default PostEventBasicInformation;
