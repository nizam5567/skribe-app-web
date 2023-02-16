import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { changeDateFormat, convertSecondToHrMin, convertToDate, convertToTime, getShortValue, getTimezoneValue, timeConvert } from '../common';
import IconWrapper from './IconWrapper';
import 'moment-timezone';

interface IEventDetailsWrapper {
  icon: React.ReactNode
  title: string
  data: any
  name: string
}
// 2022-9-20 19:00:00
const EventDetailsWrapper = ({ icon, title, data, name }: IEventDetailsWrapper) => {
  const { event } = useAppSelector((state: RootState) => state.eventReducer);

  let formattedText = "You haven't selected yet";
  if (data) {
    switch (name) {
      case 'duration': {
        const eventDurationObj = data.split(':');
        if (eventDurationObj && eventDurationObj.length > 0) {
          const hours = parseInt(eventDurationObj[0]);
          const minutes = parseInt(eventDurationObj[1]);

          if (hours > 0 && minutes > 0) {
            formattedText = `${hours}h ${minutes}m`;
          } else if (hours === 0 && minutes > 0) {
            formattedText = `${minutes}m`;
          } else if (hours > 0 && minutes === 0) {
            formattedText = `${hours}h`;
          }
        }

        break;
      }
      case 'date': {
      // let date = new Date(data);
      // let date = changeDateFormat(data);
      // formattedText = date.toLocaleDateString();
      // formattedText = date.toDateString().split(" ").slice(1).join(" ");
      // formattedText = moment(parseInt(data)).format('MMM DD YYYY');
        formattedText = convertToDate(event.datestart, getShortValue(event.timezone));

        break;
      }
      case 'time': {
      // let date = new Date(data);
      // let date = changeDateFormat(data);
      // formattedText = date.toLocaleTimeString();
      // formattedText = timeConvert(formattedText);

        formattedText = convertToTime(event.datestart, getShortValue(event.timezone));

        // if (event?.timezone) {
        //   formattedText += " ";
        //   formattedText += getShortValue(event.timezone);
        // }

        break;
      }
      case 'eventDuration': {
        formattedText = convertSecondToHrMin(data);

        break;
      }
    // No default
    }
  }
  return (
    <Box display="flex" alignItems="center" mr={10}>
      <IconWrapper icon={icon} />
      <Box>
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#8A9099' }}>{title}</Typography>
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A' }}>{formattedText}</Typography>
      </Box>
    </Box>
  );
};

export default EventDetailsWrapper;
