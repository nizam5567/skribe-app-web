import { Box, Button, CircularProgress, InputLabel, Paper, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { setErrorMessage } from '../../../lib/setErrorMessage';
import firebaseApp from '../../../lib/firebaseApp';

const SecurityPageContainer = () => {
  const auth = getAuth(firebaseApp);
  const [isTempPass, setIsTempPass] = useState<boolean>(false);
  const { authUser } = useAuthContext();
  const router = useRouter();
  const alert = boundSnackbarActions;

  useEffect(() => {
    if (authUser.reloadUserInfo && parseInt(authUser.reloadUserInfo.createdAt, 10) === authUser.reloadUserInfo.passwordUpdatedAt) {
      setIsTempPass(true);
    }
  }, []);

  const initialValues = {
    'currentPassword': '',
    'newPassword': '',
    'changePassword': ''
  };
  const validationSchema = yup.object({
    'currentPassword': yup.string().required('Current Password is required'),
    'newPassword': yup
      .string()
      .required('New Password is required')
      .min(10, 'Password is too short - should be 10 characters minimum.')
      .matches(/[a-z]/, "Requires at least 1 lowercase letter")
      .matches(/[A-Z]/, "Requires at least 1 uppercase letter")
      .matches(/[0-9]/, 'Requires at least 1 number')
      .matches(/[-/:-@[-`{-~]/, 'Requires at least 1 special character'),
    'changePassword': yup
      .string()
      .required('New Password is required')
      .min(10, 'Password is too short - should be 10 characters minimum.')
      .matches(/[a-z]/, "Requires at least 1 lowercase letter")
      .matches(/[A-Z]/, "Requires at least 1 uppercase letter")
      .matches(/[0-9]/, 'Requires at least 1 number')
      .matches(/[-/:-@[-`{-~]/, 'Requires at least 1 special character')
      .when('newPassword', {
        'is': (val: string | any[]) => (val && val.length > 0),
        'then': yup
          .string()
          .oneOf([yup.ref('newPassword')], 'Password does not match')
          .required('Re-type new password is required')
      })
  });

  const onSubmit = (values: any, actions: any) => {
    // updateUserPassword(values, actions);
    handleChangePassword(values, actions);
  };

  const handleChangePassword = async (values: any, actions: any) => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        console.log('**user', user);
        return await Auth.changePassword(user, values.currentPassword, values.newPassword);
      })
      .then((data) => {
        boundSnackbarActions.success('Password changed successfully');
        actions.setSubmitting(false);
        router.push('/home');
      })
      .catch((err: any) => {
        boundSnackbarActions.error(err.message);
        actions.setSubmitting(false);
      });
  };

  const updateUserPassword = async (values: any, actions: any) => {
    const currentUser = auth.currentUser as any;
    try {
      await reauthenticate(values.currentPassword);
      await updatePassword(currentUser, values.newPassword);
      alert.success('Successfully updated password');
      actions.setSubmitting(false);
      router.push('/home');
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        err.code = 'auth/requires-recent-login';
      }
      const { title, description } = setErrorMessage(err);
      const errMsg = `${title}: ${description}`;
      alert.error(errMsg);
      actions.setSubmitting(false);
    }
  };

  const reauthenticate = async (currentPassword: string) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser as any;
      const credential = await EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      return true;
    } catch (e) {
      throw e;
    }
  };

  const handleCancel = () => {
    router.push('/home');
  };

  return (
    <Box minHeight="90vh" display="flex" justifyContent="center" sx={{ 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3}>
      <Box sx={{ 'width': { 'xs': '100%', 'md': '50%' } }} mb={3}>
        <Box>
          <Typography mb={2} sx={{ 'fontSize': '22px', 'lineHeight': '28px', 'fontWeight': '500' }}>
            Security
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form>
                  <Box p={4} sx={{ 'background': '#fff', 'border': '2px solid #E6E8F4' }} borderRadius={2}>
                    <Box mt={2.5} sx={{}}>
                      <TextField label={!isTempPass ? 'Current Password' : 'Temporary Password'} placeholder={!isTempPass ? 'Type Current Password' : 'Type Temporary Password'} size="medium" autoComplete="new-password" fullWidth type="password" name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)} helperText={formik.touched.currentPassword && Boolean(formik.errors.currentPassword) ? formik.errors.currentPassword : ''} />
                    </Box>
                    <Box mt={2.5} sx={{}}>
                      <TextField label="New Password" placeholder="Type New Password" size="medium" fullWidth type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.newPassword && Boolean(formik.errors.newPassword)} helperText={formik.touched.newPassword && Boolean(formik.errors.newPassword) ? formik.errors.newPassword : ''} />
                    </Box>
                    <Box mt={2.5} sx={{}}>
                      <TextField label="Re-type New Password" placeholder="Re-Type New Password" size="medium" fullWidth type="password" name="changePassword" value={formik.values.changePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.changePassword && Boolean(formik.errors.changePassword)} helperText={formik.touched.changePassword && Boolean(formik.errors.changePassword) ? formik.errors.changePassword : ''} />
                    </Box>
                    <Box mt={4}>
                      <Button sx={{ 'background': '#02178c' }} disabled={!formik.isValid || formik.isSubmitting} startIcon={formik.isSubmitting ? <CircularProgress size="1rem" /> : null} variant="contained" type="submit">
                        Change Password
                      </Button>
                    </Box>
                  </Box>
                </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default SecurityPageContainer;
