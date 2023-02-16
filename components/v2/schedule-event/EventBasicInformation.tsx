import { Box, Typography, Button } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import CalendarIcon from '../svg-components/CalendarIcon';
import ClockIcon from '../svg-components/ClockIcon';
import DurationIcon from '../svg-components/DurationIcon';
import SkribeSmallLogoIcon from '../svg-components/SkribeSmallLogoIcon';
import EventDetailsWrapper from './EventDetailsWrapper';
import InvitationLinkIcon from '../svg-components/InvitationLinkIcon';
import InvitationLinkWrapper from './InvitationLinkWrapper';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import AddToCalenderIcon from '../svg-components/AddToCalenderIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import AddToCalendar from './AddToCalendar';
import { getTenantIdFromLocalStorage } from '../common';
import { EventStatus } from '../../../openapi';

const EventBasicInformation = () => {
  const dispatch = useDispatch();
  const { event } = useAppSelector((state: RootState) => state?.eventReducer);
  const userTenantId: number | undefined = getTenantIdFromLocalStorage();
  const handleEventDetails = () => {
    dispatch(openModal('event'));
  };

  return (
    <Fragment>
      <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
        <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" mb={3} sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <SkribeSmallLogoIcon />
            <Box display="flex" flexDirection="column" ml={2} justifyContent="center">
              <Typography sx={{ 'fontSize': '20px', 'fontWeight': 500, 'lineHeight': '24px', 'color': '#3F434A' }}> {event && event.title} </Typography>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A' }}>This event will be hosted virtually by Skribe at the following date and time:</Typography>
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
          <Box mb={2} display="flex" justifyContent="flex-start" alignItems="center">
            <EventDetailsWrapper icon={<CalendarIcon />} title="Date" data={event?.datestart} name="date" />
            <EventDetailsWrapper icon={<ClockIcon />} title="Time" data={event?.datestart} name="time" />
            {event && event?.status !== EventStatus.Complete && <EventDetailsWrapper icon={<DurationIcon />} title="Est. Duration" data={event?.duration} name="duration" />}
            {event && event?.status === EventStatus.Complete && <EventDetailsWrapper icon={<DurationIcon />} title="Duration" data={event?.eventduration} name="eventDuration" />}
          </Box>
          <Box>{event && event.datestart && event.timezone && event.duration && event.status !== EventStatus.Complete && <InvitationLinkWrapper icon={<InvitationLinkIcon />} title="Invitation Link" data={''} name="invitation-link" />}</Box>
        </Box>
        {event?.status !== EventStatus.Complete && (
          <Fragment>
            <Box mb={2} sx={{ 'height': '1px', 'background': '#E8E9EB' }}></Box>
            <Box>
              <AddToCalendar />
            </Box>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
};

export default EventBasicInformation;
