import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, useEffect, FormEvent } from 'react';
import { Box, TextField, Button, CircularProgress, Typography, FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService } from '../../../helpers/api-helper';
import { EventType } from '../../../openapi/models/event-type';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import { changeDateFormat, getTimezoneValue } from '../common';
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateEventRequestEventtypeEnum } from '../../../openapi';

const ArchiveCreateEventWithName = () => {
  const { accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const { matter } = useAppSelector((state: RootState) => state.mattersReducer);
  const alert = boundSnackbarActions;
  const router = useRouter();

  const [minTime, setMinTime] = useState<Date | undefined>(undefined);
  const [maxTime, setMaxTime] = useState<Date | undefined>(undefined);

  const initialValues = {
    'eventName': '',
    'eventType': EventType.Deposition,
    'date': '',
    'startTime': '',
    'timezone': 'cst',
    'duration': '',
    'hour': 0,
    'minute': 0
  };

  const validationSchema = Yup.object({
    'eventName': Yup.string().trim().required('Required'),
    'eventType': Yup.string().trim().required('Required'),
    'date': Yup.string()
      .nullable()
      .test({
        'name': 'date',
        'message': 'Invalid date',
        'test': (date: any) => {
          if (!date) {
            return true;
          }
          if (date && changeDateFormat(date).getFullYear() > new Date().getFullYear()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() > new Date().getMonth()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() >= new Date().getMonth() && changeDateFormat(date).getDate() >= new Date().getDate()) {
            return true;
          }
          console.log('4');
          return false;
        }
      })
      .test({
        'name': 'date',
        'message': 'Required',
        'test': (value: any, context: any) => {
          const { startTime } = context.parent;
          if (!value && startTime && changeDateFormat(startTime).getHours()) {
            console.log('if time checking');
            return false;
          }
          return true;
        }
      }),
    'startTime': Yup.string()
      .nullable()
      .test({
        'name': 'startTime',
        'message': 'Invalid time',
        'test': (value: any, context: any) => {
          const { date } = context.parent;
          if (!value) {
            return true;
          } if (!date && !value) {
            return true;
          } if (!date && value) {
            return true;
          } if (value === 'Invalid Date') {
            return false;
          } if (date && changeDateFormat(date).getFullYear() > new Date().getFullYear()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() > new Date().getMonth()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() >= new Date().getMonth() && changeDateFormat(date).getDate() > new Date().getDate()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() >= new Date().getMonth() && changeDateFormat(date).getDate() >= new Date().getDate() && changeDateFormat(value).getHours() > new Date().getHours()) {
            return true;
          } if (date && changeDateFormat(date).getFullYear() >= new Date().getFullYear() && changeDateFormat(date).getMonth() >= new Date().getMonth() && changeDateFormat(date).getDate() >= new Date().getDate() && changeDateFormat(value).getHours() >= new Date().getHours() && changeDateFormat(value).getMinutes() > new Date().getMinutes()) {
            return true;
          }
          return false;
        }
      })
      .when('date', {
        'is': (value: any) => {
          if (!value) {
            return false;
          }
          if (changeDateFormat(value) >= new Date()) {
            return true;
          }
          return true;
        },
        'then': Yup.string().nullable().required('Required')
      }),
    'hour': Yup.number().nullable(),
    'minute': Yup.number().nullable()
  });

  const handleMinMaxTime = (formik: any, value: any, field: string) => {
    switch (field) {
      case 'date': {
        if (value) {
          const selectedDateValue = changeDateFormat(value);
          if (new Date().getDate() === selectedDateValue.getDate() && new Date().getMonth() === selectedDateValue.getMonth() && new Date().getFullYear() === selectedDateValue.getFullYear()) {
            setMinTime(new Date());
            const formattedMaxTime = new Date();
            formattedMaxTime.setHours(23);
            formattedMaxTime.setMinutes(59);
            formattedMaxTime.setMinutes(59);
            setMaxTime(formattedMaxTime);
          } else {
            setMinTime(undefined);
            setMaxTime(undefined);
          }
        }

        break;
      }
      case 'time': {
        if (formik.values.date) {
          const selectedDateValue = changeDateFormat(formik.values.date);
          if (new Date().getDate() === selectedDateValue.getDate() && new Date().getMonth() === selectedDateValue.getMonth() && new Date().getFullYear() === selectedDateValue.getFullYear()) {
            setMinTime(new Date());
            const formattedMaxTime = new Date();
            formattedMaxTime.setHours(23);
            formattedMaxTime.setMinutes(59);
            formattedMaxTime.setMinutes(59);
            setMaxTime(formattedMaxTime);
          } else {
            setMinTime(undefined);
            setMaxTime(undefined);
          }
        }

        break;
      }
    // No default
    }
  };

  const handleDateTimeChange = (formik: any, value: any) => {
    // formik.setFieldTouched("startTime", true);
    if (value && value.toString().toLowerCase() !== 'invalid date'.toLowerCase()) {
      formik.setFieldTouched('startTime', true);
    }
    formik.setFieldValue('date', value);
    handleMinMaxTime(formik, value, 'date');
  };

  const handleStartTimeChange = (formik: any, value: any) => {
    if (value && changeDateFormat(value).getHours()) {
      formik.setFieldTouched('date', true);
    }
    formik.setFieldValue('startTime', value);
    handleMinMaxTime(formik, value, 'time');
  };

  const dateStartFormat = (dt: any, time: any) => {
    // let date = new Date(dt);
    const date = changeDateFormat(dt);
    // let timeDate = new Date(time);
    const timeDate = changeDateFormat(time);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = timeDate.getHours();
    const minute = timeDate.getMinutes();
    let hrText = hours.toString();
    let minText = minute.toString();
    if (hours < 10) {
      hrText = `0${hours}`;
    }
    if (minute < 10) {
      minText = `0${minute}`;
    }

    const formattedDate = `${year}-${month}-${day} ${hrText}:${minText}:00`;
    return formattedDate;
  };

  const onSubmit = (values: any, actions: any) => {
    const hrNumber = Number(values.hour);
    const minNumber = Number(values.minute);

    const hr = hrNumber && hrNumber < 10 ? `0${hrNumber}` : hrNumber;
    const min = minNumber && minNumber < 10 ? `0${minNumber}` : minNumber;

    let formattedDuration = (values?.hour && hr) || 0;
    formattedDuration += ':';
    formattedDuration += (values?.minute && min) || 0;

    if (matter) {
      const title = values.eventName.trim();
      const matterid = matter.id;
      const eventtype = values.eventType === UpdateEventRequestEventtypeEnum.Deposition ? UpdateEventRequestEventtypeEnum.Deposition : UpdateEventRequestEventtypeEnum.Arbitration;
      const event = {
        title,
        matterid,
        eventtype,
        'datestart': (values.date && values.startTime && dateStartFormat(values.date, values.startTime)) || null,
        'timezone': values.timezone ? getTimezoneValue(values.timezone.toUpperCase()) : null,
        'duration': formattedDuration
      };
      createNewEvent(event, actions);
    } else {
      boundSnackbarActions.error('Something went wrong. Please try again.');
      dispatch(closeModal());
    }
  };

  const createNewEvent = async (event: any, actions: any) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.createEvent(event);
        if (response.status === 200 || response.status === 201) {
          alert.success('Event create successfully');
          boundEventsActions.storeEvent(response.data);
          boundEventsActions.createEvent(response.data);
          boundMattersActions.storeEventUnderMatter(response.data);
          boundMattersActions.storeMatterId(response.data.matterid);
          dispatch(closeModal());
          router.push(`/event/${response.data.matterid}/${response.data.id}`);
          return response;
        }
        actions.setSubmitting(false);
      } catch (error: any) {
        alert.success('Server error');
        dispatch(closeModal());
        handleApiError(error);
        actions.setSubmitting(false);
      }
    }
  };
  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Box mt={3} sx={{ 'width': '100%' }}>
      <Typography sx={{ 'fontSize': '16px', 'fontWeight': 300, 'lineHeight': '20px', 'textAlign': 'left', 'mb': 2 }}>In the matter of: {matter?.title}</Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
            <Form>
              <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start' }}>
                <TextField
                  label="Event Name"
                  size="medium"
                  name={'eventName'}
                  inputProps={{ 'style': { 'fontSize': '16px' } }}
                  sx={{
                    'border': '1px solid #FFF',
                    'borderRadius': 1,
                    'width': '100%'
                  }}
                  type="text"
                  autoComplete="off"
                  placeholder="Deposition of Cameron Emory"
                  value={formik.values.eventName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                  helperText={formik.touched.eventName && formik.errors.eventName}
                />
                <Box mt={2}>
                  <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                    Create
                  </Button>
                  <Button variant="outlined" size="medium" type="button" color="secondary" sx={{}} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ArchiveCreateEventWithName;
