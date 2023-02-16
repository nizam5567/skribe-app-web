import { Box, Button, CircularProgress, InputLabel, Paper, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { confirmPasswordReset, getAuth, updatePassword, verifyPasswordResetCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, useFormik } from 'formik';
import firebaseApp from '../../../lib/firebaseApp';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { setErrorMessage } from '../../../lib/setErrorMessage';

const ResetPasswordPageContainer = () => {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const alert = boundSnackbarActions;

  const actionCode = (router.query.oobCode as string) || '';
  const tenantId = (router.query.tenantId as string) || '';

  const initialValues = {
    'newPassword': '',
    'confirmPassword': ''
  };

  const validationSchema = yup.object({
    'newPassword': yup
      .string()
      .required('New Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/[a-zA-Z]/, 'Require at least 1 letter')
      .matches(/[0-9]/, 'Require at least 1 number'),
    'confirmPassword': yup
      .string()
      .required('New Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/[a-zA-Z]/, 'Require at least a letter')
      .matches(/[0-9]/, 'Require at least a number')
      .when('newPassword', {
        'is': (val: string | any[]) => (!!(val && val.length > 0)),
        'then': yup
          .string()
          .oneOf([yup.ref('newPassword')], 'Password does not match')
          .required('Re-type new password is required')
      })
  });

  const onSubmit = (values: any, actions: any) => {
    // resetUserPassword(values, actions);
    handleResetPassword(values, actions);
  };

  const resetUserPassword = async (values: any, actions: any) => {
    try {
      // await updatePassword(currentUser, values.newPassword);
      alert.success('Successfully updated password');
      actions.setSubmitting(false);
      router.push('/home');
    } catch (err: any) {
      const { title, description } = setErrorMessage(err);
      const errMsg = `${title}: ${description}`;
      alert.error(errMsg);
      actions.setSubmitting(false);
    }
  };

  function handleResetPassword (values: any, actions: any) {
    // const auth = getAuth();
    auth.tenantId = tenantId;
    verifyPasswordResetCode(auth, actionCode).then((email) => {
      // const accountEmail = email;
      // the new password.
      const { newPassword } = values;

      // Save the new password.
      confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
        // Password reset has been confirmed and new password updated.
        alert.success('Successfully updated password');
        actions.setSubmitting(false);
        router.push('/signin');
      }).catch((error) => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        const { title, description } = setErrorMessage(error);
        const errMsg = `${title}: ${description}`;
        alert.error(errMsg);
        actions.setSubmitting(false);
      });
    }).catch((error) => {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
      const { title, description } = setErrorMessage(error);
      const errMsg = `${title}: ${description}`;
      alert.error(errMsg);
      actions.setSubmitting(false);
    });
  }

  const handleCancel = () => {
    router.push('/signin');
  };

  return (
    <Box minHeight="90vh" display="flex" justifyContent="center" sx={{ 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3}>
      <Box sx={{ 'width': { 'xs': '100%', 'md': '50%' } }} mb={3}>
        <Box>
          <Typography mb={2} sx={{ 'fontSize': '22px', 'lineHeight': '28px', 'fontWeight': '500' }}>
            Password Reset
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form>
                  <Box p={4} sx={{ 'background': '#fff', 'border': '2px solid #E6E8F4' }} borderRadius={2}>
                    <Box mt={2.5} sx={{}}>
                      <TextField label="New Password" placeholder="Type New Password" size="medium" fullWidth type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.newPassword && Boolean(formik.errors.newPassword)} helperText={formik.touched.newPassword && Boolean(formik.errors.newPassword) ? formik.errors.newPassword : ''} />
                    </Box>
                    <Box mt={2.5} sx={{}}>
                      <TextField label="Re-type New Password" placeholder="Re-Type New Password" size="medium" fullWidth type="password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} helperText={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) ? formik.errors.confirmPassword : ''} />
                    </Box>
                    <Box mt={4}>
                      <Button sx={{ 'background': '#02178c' }} disabled={!formik.isValid || formik.isSubmitting} startIcon={formik.isSubmitting ? <CircularProgress size="1rem" /> : null} variant="contained" type="submit">
                        Save
                      </Button>
                      <Button variant="outlined" type="button" color="secondary" sx={{ 'ml': 2 }} onClick={handleCancel}>
                        Cancel
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

export default ResetPasswordPageContainer;
