import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { boundSnackbarActions } from '../redux/reducers/snackbarReducer/snackbarAction';
import { getLocalStorageItem } from '../components/v2/common';
import SkribeLogo from '../components/svg-components/SkribeLogo';

config.autoAddCss = false;

const VerifyEmail: NextPage = () => {
  const router = useRouter();
  const [isCodeResendSuccessfully, setIsCodeResendSuccessfully] = useState(false);

  const initialValues = {
    'code': ''
  };

  const validationSchema = Yup.object().shape({
    'code': Yup.string().required('Confirmation code is required')
  });

  const verifyEmail = async (values: any, actions: any) => {
    const username: any = sessionStorage.getItem('email');
    const { code } = values;
    try {
      await Auth.confirmSignUp(username, code);
      sessionStorage.removeItem('email');
      router.replace('/signin');
      actions.setSubmitting(false);
    } catch (error: any) {
      boundSnackbarActions.error(error.message);
      actions.setSubmitting(false);
      console.log('error confirming sign up', error);
    }
  };
  const onSubmit = (values: any, actions: any) => {
    verifyEmail(values, actions);
  };

  useEffect(() => {
    if (!sessionStorage.getItem('email')) {
      history.back();
    }
  }, []);

  useEffect(() => {
    if (isCodeResendSuccessfully) {
      setTimeout(() => {
        setIsCodeResendSuccessfully(false);
      }, 60000);
    }
  }, [isCodeResendSuccessfully]);

  const handleResendConfirmationCode = async () => {
    // await cognito.resendConfirmationCode(localStorage.getItem("email"));
    const username: any = sessionStorage.getItem('email');
    try {
      await Auth.resendSignUp(username);
      boundSnackbarActions.success('Code resend successfully');
      setIsCodeResendSuccessfully(true);
    } catch (err) {
      console.log('error resending code: ', err);
      setIsCodeResendSuccessfully(false);
    }
  };

  return (
    <Box width="100%" minHeight="100vh" sx={{ 'background': '#E8EBF2' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
      <Head>
        <title>Verify Email</title>
        <meta name="description" content="Signup page" />
        <link rel="icon" href="/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      {getLocalStorageItem('email')
        ? (
        <Box width="100%" height="100%" sx={{}} display="flex" justifyContent="center" alignItems="center">
          <Box p={3} sx={{ 'width': '580px', 'padding': '40px 24px', 'background': '#fff', 'borderRadius': '5px' }}>
            <SkribeLogo />
            <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'mt': '20px' }}>Verify Email</Typography>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '27px', 'mb': '14px' }}>You will receive an email shortly. Please enter the confirmation code</Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {(formik) => (
                  <Form>
                    <TextField
                      label="Confirmation Code"
                      size="medium"
                      name="code"
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'mt': '12px'
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="Confirmation Code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                    />
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{
                        'mt': '12px'
                      }}
                    >
                      {!isCodeResendSuccessfully
                        ? (
                        <>
                          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px' }}>Didn&apos;t receive the confirmation code? </Typography>
                          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px', 'color': '#657CFF', 'ml': 1, 'cursor': 'pointer' }} onClick={handleResendConfirmationCode}>
                            Resend
                          </Typography>
                        </>
                          )
                        : null}
                    </Box>
                    <Box display="flex" sx={{ 'mt': 2, 'flex': 1 }}>
                      <Button type="submit" variant="contained" size="medium" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'flex': 1, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                        Submit
                      </Button>
                    </Box>
                  </Form>
              )}
            </Formik>
          </Box>
        </Box>
          )
        : null}
    </Box>
  );
};

export default VerifyEmail;
