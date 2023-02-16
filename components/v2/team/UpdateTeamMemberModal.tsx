import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { handleApiError } from '../../../util/error-handlers';
import { getUserService } from '../../../helpers/api-helper';
import { CreateUsersRequest, UpdateUsersRequest } from '../../../openapi';
import { boundTeamMemberActions } from '../../../redux/reducers/teamReducer/teamAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';

const UpdateTeamMemberModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const { teamMember } = useAppSelector((state: RootState) => state.teamMembersReducer);
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;

  const [modalTitle, setModalTitle] = useState('Update Team Member');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'update_team_member') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const initialValues = {
    'firstname': teamMember?.firstname || '',
    'lastname': teamMember?.lastname || ''
  };

  const validationSchema = yup.object({
    'firstname': yup.string().required('Required'),
    'lastname': yup.string().required('Required')
  });

  const onSubmit = (values: any, actions: any) => {
    updateTeamMember(teamMember.id, { ...teamMember, ...values }, actions);
  };

  const updateTeamMember = async (userId: number, user: UpdateUsersRequest, actions: any) => {
    if (accessToken) {
      try {
        console.log('updateTeamMember user', user);
        const service = await getUserService(accessToken);
        const response = await service.updateUser(userId, user);
        console.log('updateTeamMember response', response);
        boundTeamMemberActions.updateTeamMember(response.data);
        actions.setSubmitting(false);
        dispatch(closeModal());
      } catch (error: any) {
        handleApiError(error);
        boundSnackbarActions.error(error.message);
        actions.setSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
            <Form style={{ 'width': '100%' }}>
              <Box p={3} display="flex" flexDirection="column" sx={{ 'width': '100%' }} flex={1}>
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" flex={1} sx={{ 'width': '100%' }}>
                  <TextField
                    label="First Name"
                    size="medium"
                    name={'firstname'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%',
                      'mr': 1
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="First Name"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                  />
                  <TextField
                    label="Last Name"
                    size="medium"
                    name={'lastname'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%',
                      'ml': 1
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                  />
                </Box>

                <Box display="flex" sx={{ 'mt': 4 }}>
                  <Button type="submit" variant="contained" size="medium" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'mr': 2, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                    Save
                  </Button>
                  <Button variant="outlined" size="medium" type="button" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateTeamMemberModal;
