import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getCalendarService } from '../../../helpers/api-helper';
import { CalendarCreateRequest, EventStatus } from '../../../openapi';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import { changeDateFormat, getInvitationLink, getShortValue, timeConvert } from '../common';
import PrimaryButton from '../PrimaryButton';
import AddToCalenderIcon from '../svg-components/AddToCalenderIcon';
import 'moment-timezone';

const AddToCalendar = () => {
  const { event }: any = useAppSelector((state: RootState) => state.eventReducer);
  const router = useRouter();
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;

  const [userAddedCalendarSuccessfully, setUserAddedCalendarSuccessfully] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const alert = boundSnackbarActions;
  let gapi: any,
    google: any;
  let tokenClient: any;
  gapi = (window as any).gapi;
  google = (window as any).google;
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     gapi = (window as any).gapi;
  //     google = (window as any).google;
  //   }
  // }, []);
  const CLIENT_ID = '106573156728-a9hildkr43cd0lbclvhgead31qglvpma.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyD-Bf8HsjnL8sJ-HMyWn82pRP1XGWtn5hY';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const { accessToken } = useAuthContext();
  const addMinutes = (numOfMinutes: number, date: any) => {
    date.setTime(date.getTime() + numOfMinutes * 60 * 1000);
    return date;
  };

  useEffect(() => {
    try {
      if (event && event.datestart) {
        const convertToLocalTime = moment(new Date(`${event.datestart} ${getShortValue(event.timezone)}`))
          .utc()
          .local()
          .format('YYYY-MM-DD HH:mm:ss');

        // let startDateTime = changeDateFormat(event.datestart);
        const startDateTime = changeDateFormat(convertToLocalTime);
        if (startDateTime.toString() !== 'Invalid Date') {
          setStartTime(startDateTime.toISOString());

          if (event.duration) {
            const eventDurationArray = event.duration.split(':');
            console.log('eventDurationArray', eventDurationArray);
            let minutes = parseInt(eventDurationArray[0]) * 60;
            minutes += parseInt(eventDurationArray[1] || 0);
            const endDateTime = addMinutes(minutes, startDateTime);
            setEndTime(endDateTime.toISOString());
          }
          // else {
          //   let eventDurationArray = "0:0".split(":");
          //   let minutes = parseInt(eventDurationArray[0]) * 60;
          //   minutes = minutes + parseInt(eventDurationArray[1]);
          //   const endDateTime = addMinutes(minutes, startDateTime);
          //   setEndTime(endDateTime.toISOString());
          // }
        }
      }
    } catch (error: any) {
      console.log('error', error);
    }
  }, [event]);

  const getFormattedDate = (data: any) => {
    // let date = new Date(data);
    const date = changeDateFormat(data);
    const formattedText = date.toLocaleDateString();
    return formattedText;
  };

  const getFormattedTime = (data: any) => {
    // let date = new Date(data);
    const date = changeDateFormat(data);
    let formattedText = date.toLocaleTimeString();
    formattedText = timeConvert(formattedText);
    return formattedText;
  };

  const getFormattedTimezone = () => {
    if (event?.timezone) {
      let formattedText = ' ';
      formattedText += getShortValue(event.timezone);
      return formattedText;
    }
    return '';
  };

  const convertToDate = (dateStr: any, timezone: any) => {
    const eventDate = moment(new Date(`${dateStr} ${timezone.toUpperCase()}`))
      .utc()
      .local()
      .format('MM/DD/YYYY');
    return eventDate;
  };

  const convertToTime = (dateStr: any, timezone: any) => {
    const eventDate = moment(new Date(`${dateStr} ${timezone.toUpperCase()}`))
      .utc()
      .local()
      .format('hh:mm A');
    return eventDate;
  };

  const setEvent = async (resp: any) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    const eventCalendar = {
      'summary': event?.title,
      'location': '',
      'description': `The Skribe+Zoom platform will be used to host this remote proceeding. Attorneys may log in and prepare their exhibits beforehand. 
      
Anyone with this link will be able to join the live video room and identify their party and role

Link: ${getInvitationLink(event)}
Date: ${convertToDate(event.datestart, getShortValue(event.timezone))} 
Time: ${convertToTime(event.datestart, getShortValue(event.timezone))}
`,
      'start': {
        'dateTime': startTime
        // timeZone: event?.timezone,
      },
      'end': {
        'dateTime': endTime
        // timeZone: event?.timezone,
      },
      'recurrence': [],
      'attendees': [],
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': eventCalendar
    });

    request.execute((event: any) => {
      userAddedCalendar();
      setUserAddedCalendarSuccessfully(true);
      alert.success('Successfully added to calendar');
    });
  };

  const setToCalendar = () => {
    gapi.load('client', async () => {
      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'discoveryDocs': DISCOVERY_DOCS,
        'scope': SCOPES
      });

      tokenClient = google.accounts.oauth2.initTokenClient({
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'callback': setEvent
      });

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ 'prompt': 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ 'prompt': '' });
      }
    });
  };

  const userAddedCalendar = async () => {
    if (event && event.id && event.tenantid) {
      const formattedObj: CalendarCreateRequest = {
        'eventid': event.id,
        'tenantid': event?.tenantid
      };
      if (accessToken) {
        try {
          const calendarService = await getCalendarService(accessToken);
          const response = await calendarService.createCalendar(formattedObj);
          if (response.status === 200 || response.status === 201) {
            boundEventsActions.storeCalendarInformation(response?.data);
            const formattedObj = {
              ...event,
              'calenderid': response.data.id
            };
            boundEventsActions.storeEvent(formattedObj);
            // boundEventsActions.updateEvent(formattedObj);
            boundMattersActions.addCalendarIdIntoEvent({ 'matterId': Number(matterId), 'eventId': Number(eventId), 'calenderid': response.data.id });
          }
        } catch (error: any) {
          handleApiError(error);
        }
      }
    }
  };
  const handleCalenderClick = () => {
    if (typeof window !== undefined) {
      setToCalendar();
    }
  };
  return (
    <Box>
      {userAddedCalendarSuccessfully || (event && event?.calenderid && event?.calenderid !== 0) ? (
        <Typography sx={{ 'fontSize': '14px', 'lineHeight': '20px', 'fontWeight': 400, 'minHeight': '43px' }}> &#10003; Added to Calendar</Typography>
      ) : event && event.datestart && event.timezone && event.status === EventStatus.Scheduled ? (
        // <PrimaryButton text="Add Event to Calendar" onClickFn={handleCalenderClick} icon={<AddToCalenderIcon />} />
        <Button variant="contained" color="primary" style={{ 'padding': '12px 20px', 'borderRadius': '5px', 'color': '#fff', 'border': 'none', 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '17px', 'background': '#001180' }} startIcon={<AddToCalenderIcon />} onClick={handleCalenderClick}>
          Add Event to Calendar
        </Button>
      ) : (
        <></>
        // <Button variant="contained" color="primary" disabled style={{ padding: "12px 20px", borderRadius: "5px", color: "#fff", border: "none", fontSize: "12px", fontWeight: 400, lineHeight: "17px" }} startIcon={<AddToCalenderIcon />}>
        //   Add Event to Calendar
        // </Button>
      )}
    </Box>
  );
};

export default AddToCalendar;
