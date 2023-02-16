import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getEventService } from '../../../helpers/api-helper';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { boundClipActions } from '../../../redux/reducers/clipsReducer/clipsAction';
import { getFormattedStringFromSecond } from '../common';
import { handleApiError } from '../../../util/error-handlers';

interface IFormContainer {
  startTimeValue: any
  endTimeValue: any
  toggleModal: Function
  handleVideoPosition: Function
}
const FormContainer = ({ startTimeValue, endTimeValue, toggleModal, handleVideoPosition }: IFormContainer) => {
  const alert = boundSnackbarActions;

  const { accessToken } = useAuthContext();

  const router = useRouter();

  let formattedTitle = 'Clip ';
  let formattedDescription = 'Description of ';
  if (startTimeValue) {
    formattedTitle += getFormattedStringFromSecond(parseInt(startTimeValue));
    formattedTitle += ' - ';
  }
  if (endTimeValue) {
    formattedTitle += getFormattedStringFromSecond(parseInt(endTimeValue));
  } else {
    formattedTitle = '';
    formattedDescription = '';
  }
  const initialValues = {
    'title': formattedTitle,
    'description': formattedDescription + formattedTitle,
    'starttime': (startTimeValue && getFormattedStringFromSecond(parseInt(startTimeValue))) || '',
    'endtime': (endTimeValue && getFormattedStringFromSecond(parseInt(endTimeValue))) || ''
  };

  const validationSchema = Yup.object({
    'title': Yup.string().trim().min(3, 'Title length should be at least 3 characters long').required('Required'),
    'description': Yup.string().trim().min(3, 'Description length should be at least 3 characters long').required('Required'),
    'starttime': Yup.string().trim().min(0).required('Required'),
    'endtime': Yup.string().trim().min(1).required('Required')
  });

  const onSubmit = async (values: any, actions: any) => {
    try {
      const eventId = Number(router.query.eventId);

      const formValues = { ...values };
      const starttimeArr = formValues.starttime.split(':');
      switch (starttimeArr.length) {
        case 3: {
          formValues.starttimecode = `${starttimeArr[0]}:${starttimeArr[1]}:${starttimeArr[2]}:00`;

          break;
        }
        case 2: {
          formValues.starttimecode = `00:${starttimeArr[0]}:${starttimeArr[1]}:00`;

          break;
        }
        default: {
          formValues.starttimecode = `00:00:${starttimeArr[0]}:00`;
        }
      }

      const endtimeArr = formValues.endtime.split(':');
      switch (endtimeArr.length) {
        case 3: {
          formValues.endtimecode = `${endtimeArr[0]}:${endtimeArr[1]}:${endtimeArr[2]}:00`;

          break;
        }
        case 2: {
          formValues.endtimecode = `00:${endtimeArr[0]}:${endtimeArr[1]}:00`;

          break;
        }
        default: {
          formValues.endtimecode = `00:00:${endtimeArr[0]}:00`;
        }
      }

      formValues.recordingtype = 'active_speaker';

      const formData = { ...formValues, 'eventid': eventId };
      if (accessToken) {
        try {
          const eventService = await getEventService(accessToken);
          const response: any = await eventService.createVideoClip(formData);
          if (response.status === 201) {
            toggleModal();
            alert.success('Video clip job submitted!');
            formData.id = response?.data?.clipId || 23423;
            boundClipActions.doCreateClip(formData);
          }
          toggleModal();
        } catch (error: any) {
          handleApiError(error);
        }
      }
    } catch (error) {
      console.log('error', error);
      alert.error('Something error occurred!');
    }
  };

  return (
    <Box p={3} width={'100%'}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
            <Form>
              <Box sx={{ 'width': '100%', 'display': 'flex', 'flexDirection': 'column' }}>
                <Box pb={2}>
                  <TextField
                    label="Title"
                    size="medium"
                    name={'title'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%'
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>
                <Box pb={2}>
                  <TextField
                    label="Description"
                    size="medium"
                    name={'description'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%'
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>
                {/* <Box pb={2}>
                  <TextField
                    label="Start Time"
                    size="medium"
                    name={"starttime"}
                    inputProps={{ style: { fontSize: "16px" } }}
                    sx={{
                      border: "1px solid #FFF",
                      borderRadius: 1,
                      width: "100%",
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="hh:mm:ss"
                    value={formik.values.starttime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>
                <Box pb={2}>
                  <TextField
                    label="End Time"
                    size="medium"
                    name={"endtime"}
                    inputProps={{ style: { fontSize: "16px" } }}
                    sx={{
                      border: "1px solid #FFF",
                      borderRadius: 1,
                      width: "100%",
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="hh:mm:ss"
                    value={formik.values.endtime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box> */}
                <Box display="flex" justifyContent="flex-start" mt={2}>
                  <Box display="flex">
                    <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                      Create Clip
                    </Button>
                    {/* <Button
                      variant="contained"
                      size="medium"
                      type="button"
                      onClick={() => handleVideoPosition()}
                      disabled={!formik.isValid || formik.isSubmitting}
                      sx={{ marginRight: "16px", background: "#FFFFFF", border: "none", color: '#000', ":hover": {background:"#EDEFF3", color: "#000" } }}>
                      Play Video
                    </Button> */}
                    {/* <ActionButton text="Play Video" onClickFn={() => handleVideoPosition()} /> */}
                  </Box>

                  <Button variant="outlined" size="medium" type="button" color="secondary" sx={{}} onClick={() => toggleModal()}>
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
export default FormContainer;
