import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { map, replace } from 'lodash';
import Modal from '../Modal';
import { useAuthContext } from '../../../contexts/AuthContext';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { CHANGE_IDENTITY_MODAL } from '../../../consts/modalNames';
import { useAppSelector } from '../../../redux/store/hooks';
import { getEventService } from '../../../helpers/api-helper';
import { boundTranscriptActions } from '../../../redux/reducers/transcriptReducer/transcriptAction';

const ChangeIdentityModal = () => {
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;
  const router = useRouter();
  const { eventId } = router.query;

  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [modalTitle] = useState('Rename Speakers');
  const { transcriptSpeakers } = useAppSelector((store: any) => store.transcriptReducer);

  useEffect(() => {
    if (modalStatus && modalName === CHANGE_IDENTITY_MODAL) {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  // const speakers = transcriptSpeakers && transcriptSpeakers.length > 0 ? transcriptSpeakers.map(() => ({ 'name': '' })) : [];
  const speakers = transcriptSpeakers && transcriptSpeakers.length > 0 ? map(transcriptSpeakers, (item) => ({ 'name': '' })) : [];
  const initialValues = {
    speakers
  };

  const validationSchema = Yup.object().shape({
    'speakers': Yup.array().of(
      Yup.object().shape({
        'name': Yup.string().required('Required')
      })
    )
  });

  const renameSpeakerNames = async (eventSpeakerData: any, actions: any) => {
    if (accessToken) {
      try {
        const eventService = await getEventService(accessToken);
        await eventService.updateSpeakerNames(eventSpeakerData);
        alert.success('Speaker name edited successfully');
        actions.setSubmitting(false);
        setTimeout(() => {
          dispatch(closeModal());
          boundTranscriptActions.doStoreIsSpeakerNameChanged(true);
        }, 1500);
      } catch (error: any) {
        alert.error('Something went wrong! Please try again.');
        actions.setSubmitting(false);
      }
    }
  };

  const onSubmit = async (values: any, actions: any) => {
    // console.log(JSON.stringify(values));
    let speakerNames: any = [];

    speakerNames = map(values.speakers, (item) => item?.name);
    const eventSpeakerData = {
      'eventid': Number(eventId),
      'tenantid': 0,
      'speakernames': speakerNames
    };
    await renameSpeakerNames(eventSpeakerData, actions);
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (typeof transcriptSpeakers !== 'undefined') setLoading(false);
  }, [transcriptSpeakers]);

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} width={'100%'} sx={{}}>
        {loading
          ? (
          <Box pt={2} mt={2} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'height': '60vh' }}>
            <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Box>
            )
          : (
          <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <FieldArray
                  name="speakers"
                  render={(arrayHelpers) => (
                    <Box>
                      {
                        formik.values.speakers &&
                        formik.values.speakers.length > 0 &&
                        map(formik.values.speakers, (speaker: any, index: number) => (
                            <Box
                              key={index}
                              sx={{
                                'display': 'flex',
                                'flexDirection': 'row',
                                'marginBottom': '20px'
                              }}>
                              <Box sx={{
                                'width': '150px',
                                'alignItems': 'center',
                                'justifyContent': 'flex-start',
                                'display': 'flex',
                                'fontWeight': 'bold'
                              }}>
                                {replace(transcriptSpeakers[index], 'spk_', 'Speaker ')}
                                <span style={{ 'fontWeight': 'bold', 'paddingLeft': '20px' }}>=</span>
                              </Box>
                              <TextField
                                size="medium"
                                name={`speakers[${index}].name`}
                                inputProps={{ 'style': { 'fontSize': '16px' } }}
                                sx={{
                                  'border': '1px solid #FFF',
                                  'borderRadius': 1,
                                  'width': '100%'
                                }}
                                autoComplete="off"
                                type="text"
                                placeholder="Type speaker name here"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.speakers &&
                                  (formik.touched as any).speakers[index] &&
                                  (formik.touched as any).speakers[index].name &&
                                  formik.errors.speakers &&
                                  (formik.errors as any).speakers[index] &&
                                  (formik.errors as any).speakers[index].name
                                }
                                helperText={formik.touched.speakers && (formik?.touched as any).speakers[index] && formik.errors?.speakers && (formik.errors as any).speakers[index] && (formik?.errors as any).speakers[index].name}
                              />
                            </Box>
                        ))}
                    </Box>
                  )}
                />
                <Box display="flex" sx={{ 'mt': 4 }}>
                  <Button type="submit" variant="contained" size="medium"
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ 'mr': 2, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                    Update
                  </Button>
                  <Button variant="outlined" size="medium" type="button" color="secondary" onClick={handleCancel}>
                    Close
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>)
        }
      </Box>
    </Modal>
  );
};

export default ChangeIdentityModal;
