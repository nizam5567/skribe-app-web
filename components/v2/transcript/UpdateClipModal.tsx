import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService, getExhibitService } from '../../../helpers/api-helper';
import { boundClipActions } from '../../../redux/reducers/clipsReducer/clipsAction';
import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import Modal from '../Modal';

const UpdateClipModal = () => {
  const { accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const [modalTitle, setModalTitle] = useState('Update Clip');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const alert = boundSnackbarActions;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { clip } = useAppSelector((state: RootState) => state.clipsReducer);

  useEffect(() => {
    if (modalStatus && modalName === 'updateClip') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const initialValues = {
    'title': clip?.title,
    'description': clip?.description
  };

  const validationSchema = Yup.object({
    'title': Yup.string().trim().min(3, 'Title length should be at least 3 characters long').required('Required'),
    'description': Yup.string().trim().min(3, 'Description length should be at least 3 characters long').required('Required')
  });

  const onSubmit = async (values: any, actions: any) => {
    if (accessToken) {
      try {
        const formValues = { ...values, 'id': clip.clipId };
        const eventService = await getEventService(accessToken);
        const response: any = await eventService.updateVideoClip(formValues);
        if (response.status === 200) {
          alert.success('Video clip updated successfully!');
          boundClipActions.doUpdateClip({ ...response.data, 'clipId': response.data.id });
        }
        dispatch(closeModal());
      } catch (error) {
        console.log('error', error);
        alert.error('Something error occurred!');
      }
    }
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
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

                  <Box display="flex" justifyContent="flex-start" mt={3}>
                    <Box display="flex">
                      <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                        Update
                      </Button>
                    </Box>

                    <Button variant="outlined" size="medium" type="button" color="secondary" sx={{}} onClick={() => handleCancel()}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UpdateClipModal;
