import { TextField, Box, Button, Typography, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { updateMatter } from '../../../services/matter.service';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { handleApiError } from '../../../util/error-handlers';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { UpdateMatterRequest } from '../../../openapi';

const UpdateMatter = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const { matter } = useAppSelector((state: RootState) => state.mattersReducer);

  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;

  const [matterAlreadyExists, setMatterAlreadyExists] = useState(false);
  const [existingMatterName, setExistingMatterName] = useState('');
  const [modalTitle, setModalTitle] = useState('Update matter');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'updateMatter') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const initialValues = {
    'matterName': matter?.title || ''
  };

  const validationSchema = Yup.object({
    'matterName': Yup.string().trim().min(3, 'Matter name length should be at least 3 characters long').required('Required')
  });

  const onSubmit = (values: any, actions: any) => {
    if (matter) {
      const title: string = values.matterName.trim();
      const updateMatter: UpdateMatterRequest = {
        'id': matter.id,
        title,
        'description': matter.description
      };
      updateMatterName(updateMatter, actions);
    }
  };

  const updateMatterName = async (matter: UpdateMatterRequest, actions: any) => {
    if (accessToken) {
      try {
        await updateMatter(accessToken, matter.id, matter);
        alert.success('Matter updated successfully');
        boundMattersActions.updateMatter(matter);
        dispatch(closeModal());
      } catch (error: any) {
        const statusCode = error?.response?.status;
        if (statusCode === 409) {
          setMatterAlreadyExists(true);
          setExistingMatterName(matter.title);
          alert.error('Matter already exists');
        } else {
          alert.error('Matter update action failed');
          actions.setSubmitting(false);
        }
        handleApiError(error);
      }
    }
  };

  const handleFormOnChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'matterName') {
      if (existingMatterName.toLowerCase() === value.toLowerCase() && value) {
        setMatterAlreadyExists(true);
      } else {
        setMatterAlreadyExists(false);
      }
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} width={'100%'}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
              <Form onChange={handleFormOnChange}>
                <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start' }}>
                  <TextField
                    label="Matter Name"
                    size="medium"
                    name={'matterName'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%'
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="John Doe v. Rick Benjameen"
                    value={formik.values.matterName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.touched.matterName && Boolean(formik.errors.matterName)) || matterAlreadyExists}
                    helperText={formik.touched.matterName && formik.errors.matterName}
                  />
                  {matterAlreadyExists && (
                    <Typography
                      sx={{
                        'fontSize': '12px',
                        'lineHeight': '16px',
                        'fontWeight': 300,
                        'display': 'inline-block',
                        'textAlign': 'left',
                        'marginTop': 1,
                        'p': 0,
                        'color': '#ff0007'
                      }}
                    >
                      The Matter &apos;{formik.values.matterName}&apos; already exists.
                    </Typography>
                  )}
                  <Box mt={2}>
                    <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || matterAlreadyExists || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                      Update
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
    </Modal>
  );
};

export default UpdateMatter;
