import { config } from '@fortawesome/fontawesome-svg-core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import {
  AlertColor,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Snackbar,
  Typography
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Field, Form, Formik } from 'formik';
import { BaseTextField, LabelWithLink } from '@skribe/theme';

import TempModal from '../TempModal';
import { userService } from '../../services/user.service';
import SocialSignUp from './SocialSignUp';

config.autoAddCss = false;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const SignUpForm = () => {
  console.log('signupform');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setShowStates] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [modalTitle] = useState('Button Clicked');
  const [modalDescription] = useState(
    'This is under construction'
  );
  const router = useRouter();

  // const handleClickSnackbar = () => {
  //   setOpenSnackbar(true);
  // };

  const submitFunc = (values: any) => {
    try {
      setIsLoading(true);
      const valuesToSend = values;

      grecaptcha.enterprise.ready(() => {
        const recaptchaKey =
          process.env.RECAPTCHA_LOGIN_KEY ??
          '6LfFIWIeAAAAALZ6fHgBlwSj7_SA_soSBUEXlL8K';
        grecaptcha.enterprise.execute(
          recaptchaKey,
          { 'action': 'submit' }
        )
          .then((recapchaToken) => {
            // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
            // reCAPTCHA Enterprise to the end user's browser.
            // This token must be validated by creating an assessment.
            // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
            // valuesToSend = { ...valuesToSend, recapchaToken };
            const splitName = valuesToSend.fullName.split(' ');
            const data = {
              'firstName': splitName[0],
              'email': valuesToSend.email,
              'password': valuesToSend.password,
              'recaptcha': recapchaToken,
              'lastName': splitName[1],
              'role': 'user',
              'status': true
            };
            userService.onboard(data).then(() => {
              setSnackbarMessage('Account Created Successfully!');
              setSnackbarType('success');
              setOpenSnackbar(true);
              setIsLoading(false);
              void router.push('/welcome-page');
            }, (e: Error) => {
              setSnackbarMessage(e.message);
              setSnackbarType('error');
              setOpenSnackbar(true);
            });
          }, (err: Error) => {
            console.log(`grecaptcha.enterprise.ready:${err.message}`);
          });
      });

      console.log('valuesToSend', valuesToSend);
      // helpers.resetForm();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      {' '}
      <TempModal
        openModal={openModal}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        modalTitle={modalTitle}
        modalDescription={modalDescription}
      />
      <Grid container columns={12} direction="row">
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center'
          }}
        >
          <Box paddingBottom={2}>
            <Typography variant="h5" component="div">
              Create Account with Skribe
            </Typography>
          </Box>
          <SocialSignUp/>
          <Box paddingBottom={2}>
            <Divider sx={{ 'width': '300px' }}>
              <Typography variant="body1" color="#3954E3">
                Or Sign Up with Email
              </Typography>
            </Divider>
          </Box>
          <Formik
            initialValues={{
              'fullName': '',
              'email': '',
              'password': ''
            }}
            validationSchema={Yup.object().shape({
              'fullName': Yup.string().min(1).required('Full name is required'),
              'email': Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
              'password': Yup.string().min(1).required('Password is required')
            })}
            onSubmit={submitFunc}
          >
            <Form>
              <Box
                paddingBottom={2}
                width="300px"
                sx={{
                  'display': 'flex',
                  'alignItems': 'center',
                  'justifyContent': 'center'
                }}
              >
                <Field
                  fullWidth
                  name="fullName"
                  component={BaseTextField}
                  label="Full Name"
                />
              </Box>
              <Box paddingBottom={2} width="300px" alignContent="center">
                <Field
                  fullWidth
                  name="email"
                  component={BaseTextField}
                  label="Email"
                />
              </Box>
              <Box paddingBottom={2} width="300px">
                <Field
                  fullWidth
                  type="password"
                  name="password"
                  component={BaseTextField}
                  label="Password"
                />
              </Box>
              <Box paddingBottom={2} width="300px">
                <Typography variant="body2">
                  By creating an account you agree to our Terms of Service and
                  Privacy & Cookie Statement.
                </Typography>
              </Box>
              {isLoading
                ? (
                  <Box paddingBottom={2} width="300px">
                    <LinearProgress/>
                  </Box>
                  )
                : (
                    ''
                  )}

              <Box paddingBottom={2} width="300px">
                <Button variant="contained" fullWidth type="submit">
                  Create Skribe Account
                </Button>
              </Box>
            </Form>
          </Formik>
          <Box textAlign={'center'} sx={{ 'mt': 1 }}>
            <LabelWithLink
              link="/signin"
              linkLabel="Sign In"
              label="Already have an account?"
            />
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ 'width': '100%' }}
        >
          {snackbarMessage}!
        </Alert>
      </Snackbar>
    </>
  );
};
export default SignUpForm;
