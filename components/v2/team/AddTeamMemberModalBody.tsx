import { Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getUserService } from '../../../helpers/api-helper';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { saveUser } from '../../../redux/reducers/userReducer/userAction';
import { handleApiError } from '../../../util/error-handlers';

const AddTeamMemberModalBody = () => {
  const { accessToken } = useAuthContext();
  const [userEmailAlreadyExists, setUserEmailAlreadyExists] = useState(false);
  const user = useSelector((state: any) => state?.userReducer?.user);
  const [existingEmail, setExistingEmail] = useState('');
  const alert = boundSnackbarActions;
  const dispatch = useDispatch();

  const initialValues = {
    'firstName': (user?.updateUser && user?.firstName) || '',
    'lastName': (user?.updateUser && user?.lastName) || '',
    'email': (user?.updateUser && user?.email) || ''
  };

  const validationSchema = Yup.object({
    'firstName': Yup.string()
      .trim()
      .required('Required')
      .test('len', 'First name needs to be at least 2 characters long', (val: any) => val && val.toString().length >= 2),
    'lastName': Yup.string()
      .trim()
      .required('Required')
      .test('len', 'Last name needs to be at least 2 characters long', (val: any) => val && val.toString().length >= 2),
    'email': Yup.string().trim().email('Invalid email').required('Required')
  });

  const onSubmit = (values: any, actions: any) => {
    const formattedUser = {
      ...values
    };
    createNewUser(formattedUser, actions);
  };

  const createNewUser = async (user: any, actions: any) => {
    // try {
    //   const service = await getUserService(accessToken);
    //   const response = await service.usersControllerCreateUser(user);
    //   if (response.status === 200 || response.status === 201) {
    //     dispatch(saveUser({ userId: response?.data?.id, firstName: user?.firstName, lastName: user?.lastName, email: user?.email, newUser: true, updateUser: false }));
    //     actions.setSubmitting(false);
    //     handleCancel();
    //   }
    // } catch (error: any) {
    //   let statusCode = error?.response?.status;
    //   if (statusCode === 409) {
    //     setUserEmailAlreadyExists(true);
    //     setExistingEmail(user.email);
    //     actions.setSubmitting(false);
    //     alert.error("Email already exists");
    //   }
    //   handleApiError(error);
    // }
  };

  const handleFormOnChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'email') {
      if (value && existingEmail && existingEmail.toLowerCase() === value.toLowerCase()) {
        setUserEmailAlreadyExists(true);
      } else {
        setUserEmailAlreadyExists(false);
      }
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Box mt={3} sx={{ 'width': '100%' }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
            <Form onChange={handleFormOnChange}>
              <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start' }}>
                <Box display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} justifyContent="space-between" sx={{ 'width': '100%' }}>
                  <Box mr={2} sx={{ 'width': { 'xs': '100%', 'md': '50%' } }}>
                    <TextField
                      label="First Name"
                      size="medium"
                      name={'firstName'}
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%'
                      }}
                      type="text"
                      autoComplete="off"
                      placeholder="John"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                  </Box>
                  <Box mt={{ 'xs': 2.5, 'md': 0 }} sx={{ 'width': { 'xs': '100%', 'md': '50%' } }}>
                    <TextField
                      label="Last Name"
                      size="medium"
                      name={'lastName'}
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%'
                      }}
                      type="text"
                      autoComplete="off"
                      placeholder="Doe"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                  </Box>
                </Box>

                <Box mt={2.5} sx={{ 'width': { 'xs': '100%' } }} display="flex" flexDirection="column">
                  <TextField
                    label="Email"
                    size="medium"
                    name={'email'}
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%'
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="john@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  {userEmailAlreadyExists && (
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
                      The user &apos;{formik.values.email}&apos; already exists.
                    </Typography>
                  )}
                </Box>

                <Box mt={2.5}>
                  {!user?.updateUser
                    ? (
                    <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || userEmailAlreadyExists || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }}>
                      Save
                    </Button>
                      )
                    : (
                    <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || userEmailAlreadyExists || formik.isSubmitting || !formik.dirty} sx={{ 'marginRight': '16px', 'background': '#02178c' }}>
                      Update
                    </Button>
                      )}
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

export default AddTeamMemberModalBody;
