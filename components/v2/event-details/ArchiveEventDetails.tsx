import { Box, FormControl, TextField, Select, MenuItem, InputLabel, Button, FormHelperText, CircularProgress, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import Modal from '../Modal';
import OutsideAlerter from '../OutsideAlerter';
import { useAuthContext } from '../../../contexts/AuthContext';
import { createMatter } from '../../../services/matter.service';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import MatterListDropdown from './MatterListDropdown';
import { changeDateFormat, getShortValue, getTimezoneValue } from '../common';
import { getEventService, getMatterService } from '../../../helpers/api-helper';
import { handleApiError } from '../../../util/error-handlers';
import { MatterResponse, MattersResponse, UpdateEventRequestEventtypeEnum } from '../../../openapi/models';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { EventType } from '../../../openapi/models/event-type';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import 'react-datepicker/dist/react-datepicker.css';

const ArchiveEventDetails = () => {
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;

  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const { matter, matters } = useAppSelector((state: RootState) => state.mattersReducer);
  const { event } = useAppSelector((state: RootState) => state.eventReducer);

  const dispatch = useDispatch();
  const [matterId, setMatterId] = useState<number | null>(null);
  const [matterTitle, setMatterTitle] = useState<string>('');

  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [modalTitle, setModalTitle] = useState('Event Details');
  const [showMatterListDropdown, setShowMatterListDropdown] = useState(false);

  const [filteredMatters, setFilteredMatters] = useState<any[] | undefined>(matters);
  const [minTime, setMinTime] = useState<Date | undefined>(undefined);
  const [maxTime, setMaxTime] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (matter?.id) {
      setMatterId(matter?.id);
      setMatterTitle(matter?.title);
    }
    if (event && event.datestart) {
      handleMinMaxTime({}, event.datestart, 'date');
    }
  }, [matter]);

  useEffect(() => {
    if (modalStatus && modalName === 'archiveEvent') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
    setShowMatterListDropdown(false);
  }, [modalStatus]);

  const initialValues = {
    'eventName': (event && event.title) || '',
    'eventType': (event && event.eventtype) || EventType.Deposition,
    'matterId': (event && event.matterid) || matterId || null,
    'matterName': (matter && matter.title) || matterTitle || '',
    'date': (event && event.datestart) || '',
    'status': event && event.status,
    'timezone': (event && event?.timezone && getShortValue(event?.timezone).toLowerCase()) || 'cst',
    'startTime': (event && event.datestart) || '',
    'duration': (event && event.duration) || '',
    'hour': (event && event.duration && event.duration.includes(':') && event.duration.split(':')[0]) || 0,
    'minute': (event && event.duration && event.duration.includes(':') && event.duration.split(':')[1]) || 0
  };

  const validationSchema = Yup.object().shape({
    'eventName': Yup.string().trim().required('Required'),
    'eventType': Yup.string().trim().required('Required'),
    'matterId': Yup.number().required('Required'),
    'matterName': Yup.string().trim().required('Required'),
    'hour': Yup.number().nullable(),
    'minute': Yup.number().nullable(),
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
          return false;
        }
      })
      .test({
        'name': 'date',
        'message': 'Required',
        'test': (value: any, context: any) => {
          const { startTime } = context.parent;
          if (!value && startTime && changeDateFormat(startTime).getHours()) {
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
      })
  });

  const dateStartFormat = (dt: any, time: any) => {
    const date = changeDateFormat(dt);
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

    const eventDetails = {
      ...event,
      'id': event?.id,
      'title': values.eventName,
      'matterid': values.matterId,
      'eventtype': values.eventType === UpdateEventRequestEventtypeEnum.Deposition ? UpdateEventRequestEventtypeEnum.Deposition : UpdateEventRequestEventtypeEnum.Arbitration,
      'datestart': (values.date && values.startTime && dateStartFormat(values.date, values.startTime)) || null,
      'timezone': values.timezone ? getTimezoneValue(values.timezone.toUpperCase()) : null,
      'duration': formattedDuration,
      'status': values.status
    };
    if (event && event.id) {
      updateEventInformation(event.id, eventDetails, actions);
    }
  };

  const updateEventInformation = async (eventId: number, values: any, actions: any) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.updateEvent(eventId, values);
        if (response.status === 200 || response.status === 201) {
          boundEventsActions.updateEvent(response.data);
          boundEventsActions.storeEvent({ ...event, ...response.data });
          boundEventsActions.updateEvent({ ...event, ...response.data });
          boundMattersActions.updateEventUnderMatter({ ...event, ...response.data });
          actions.setSubmitting(false);
          dispatch(closeModal());
        }
      } catch (error: any) {
        actions.setSubmitting(false);
        handleApiError(error);
      }
    }
  };

  const handleFormOnChange = (formik: any, event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'matterName') {
      if (!value) {
        formik.setFieldValue('matterId', null);
      }
    }
  };
  const handleCancel = () => {
    dispatch(closeModal());
  };

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
    formik.setFieldTouched('startTime', true);
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

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} width={'100%'} sx={{}}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
              <Form onChange={(e) => handleFormOnChange(formik, e)}>
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
                  autoComplete="off"
                  type="text"
                  placeholder="Event name"
                  value={formik.values.eventName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                  helperText={formik.touched.eventName && formik.errors.eventName}
                />
                {/* <FormControl size="medium" sx={{ mt: 2.5, width: "100%", textAlign: "left" }}>
                  <InputLabel id="event-type">Event Type</InputLabel>
                  <Select labelId="event-type" label="Event Type" name="eventType" value={formik.values.eventType} onChange={formik.handleChange}>
                    <MenuItem value={"Deposition"}>Deposition</MenuItem>
                    <MenuItem value={"Arbitration"}>Arbitration</MenuItem>
                  </Select>
                </FormControl>

                <Box mt={2.5} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ width: "100%" }}>
                  <Box mr={2} sx={{ width: { xs: "100%", md: "50%" } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disablePast
                        label="Date (mm/dd/yyyy)"
                        inputFormat="MM/dd/yyyy"
                        value={changeDateFormat(formik.values.date)}
                        onChange={(value: any) => {
                          handleDateTimeChange(formik, value);
                        }}
                        renderInput={(params: any) => <TextField {...params} name="date" sx={{ width: "100%", mr: 2, zIndex: 10000 }} value={changeDateFormat(formik.values.date)} onBlur={formik.handleBlur} error={formik.touched.date && Boolean(formik.errors.date)} helperText={formik.touched.date && formik.errors.date} autoComplete="off" />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box mt={{ xs: 2.5, md: 0 }} sx={{ width: { xs: "100%", md: "50%" } }}>
                    <FormControl size="medium" sx={{ textAlign: "left", width: "100%" }}>
                      <InputLabel id="timezone">Timezone</InputLabel>
                      <Select labelId="timezone" name="timezone" value={formik.values.timezone} onChange={formik.handleChange} label="Timezone">
                        <MenuItem value={"est"}>EST</MenuItem>
                        <MenuItem value={"cst"}>CST</MenuItem>
                        <MenuItem value={"mst"}>MST</MenuItem>
                        <MenuItem value={"pst"}>PST</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={2.5} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ width: "100%" }}>
                  <Box mr={2} sx={{ width: { xs: "100%", md: "50%" } }}>
                    <Box position="relative">
                      <Typography sx={{ fontSize: "12px", lineHeight: "12px", fontWeight: 400, color: "#637381", background: "#fff", display: "inline-block", textAlign: "left", position: "absolute", top: -5, left: 10, px: 0.5, zIndex: 5 }}>Start Time</Typography>
                    </Box>
                    <DatePicker selected={formik.values.startTime ? changeDateFormat(formik.values.startTime) : null} placeholderText="Select time" onChange={(value: any) => handleStartTimeChange(formik, value)} showTimeSelect showTimeSelectOnly timeIntervals={15} minTime={minTime} maxTime={maxTime} timeCaption="Start Time" dateFormat="h:mm aa" onBlur={formik.handleBlur} autoComplete="off" />
                    {<FormHelperText sx={{ color: "#FF0000", ml: 2 }}>{formik.errors.startTime}</FormHelperText>}
                  </Box>

                  <Box mt={{ xs: 2.5, md: 0 }} sx={{ width: { xs: "100%", md: "50%" } }} position="relative">
                    <Box display="flex" borderRadius={1} sx={{ border: "1px solid #e6e6e6", p: 0.75, pt: 1 }}>
                      <TextField
                        label="Hours"
                        size="small"
                        name={"hour"}
                        inputProps={{ style: { fontSize: "16px" } }}
                        sx={{
                          border: "1px solid #FFF",
                          borderRadius: 1,
                          width: "100%",
                          mr: 1,
                        }}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        autoComplete="off"
                        placeholder="1"
                        value={formik.values.hour}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.hour && Boolean(formik.errors.hour)}
                        helperText={formik.touched.hour && formik.errors.hour}
                      />
                      <TextField
                        label="Minutes"
                        size="small"
                        name={"minute"}
                        inputProps={{ style: { fontSize: "16px" } }}
                        sx={{
                          border: "1px solid #FFF",
                          borderRadius: 1,
                          width: "100%",
                        }}
                        InputProps={{ inputProps: { min: 0, max: 59 } }}
                        type="number"
                        autoComplete="off"
                        placeholder="30"
                        value={formik.values.minute}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.minute && Boolean(formik.errors.minute)}
                        helperText={formik.touched.minute && formik.errors.minute}
                      />
                    </Box>
                    <FormHelperText>*This field will determine the length of time that is blocked off on your calendar. </FormHelperText>
                  </Box>
                </Box> */}
                <Box display="flex" sx={{ 'mt': 4 }}>
                  <Button type="submit" variant="contained" size="medium" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'mr': 2, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                    Save
                  </Button>
                  <Button variant="outlined" size="medium" type="button" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ArchiveEventDetails;
