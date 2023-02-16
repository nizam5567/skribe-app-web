import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import moment from 'moment';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { changeDateFormat, formatDateStr, getShortValue } from './common';
import 'moment-timezone';

interface ITimer {
  getDaysHoursMinutes: Function
}

const Timer = ({ getDaysHoursMinutes }: ITimer) => {
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const expiryTimestamp = new Date();
  if (event && event.datestart) {
    const convertToLocalTime = moment(new Date(`${formatDateStr(event.datestart)} ${getShortValue(event.timezone)}`))
      .utc()
      .local()
      .format('YYYY-MM-DD HH:mm:ss');
    // const scheduleTime = changeDateFormat(event?.datestart);
    const scheduleTime = changeDateFormat(convertToLocalTime);
    const diff = scheduleTime.getTime() - new Date().getTime();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + diff / 1000);
  }

  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({ expiryTimestamp, 'onExpire': () => console.warn('onExpire called') });

  useEffect(() => {
    getDaysHoursMinutes(days, hours, minutes);
  });

  useEffect(() => {
    if (event && event.datestart) {
      restart(expiryTimestamp, true);
    }
  }, [event]);

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mr={2}>
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '28px', 'lineHeight': '30px' }}>{days}</Typography>
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '16px', 'lineHeight': '20px' }}>d</Typography>
        <Box sx={{ 'height': '100%', 'width': '1px', 'background': '#E8E9EB' }} ml={2}></Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mr={2}>
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '28px', 'lineHeight': '30px' }}>{hours}</Typography>
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '16px', 'lineHeight': '20px' }}>h</Typography>
        <Box sx={{ 'height': '100%', 'width': '1px', 'background': '#E8E9EB' }} ml={2}></Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '28px', 'lineHeight': '30px' }}>{minutes}</Typography>
        <Typography sx={{ 'color': '#3F434A', 'fontWeight': 400, 'fontSize': '16px', 'lineHeight': '20px' }}>m</Typography>
      </Box>
    </Box>
  );
};

export default Timer;
