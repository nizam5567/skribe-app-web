import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import SkribeLogo from '../../svg-components/SkribeLogo';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import Vector1 from '../svg-components/Vector1';
import Vector2 from '../svg-components/Vector2';

config.autoAddCss = false;

interface IForgotPasswordStep1 {
  setIsEmailSubmitted: Function
}

const ForgotPasswordStep1 = ({ setIsEmailSubmitted }: IForgotPasswordStep1) => {
  const initialValues = {
    'email': ''
  };

  const validationSchema = Yup.object().shape({
    'email': Yup.string().required('Email is required').email('Email is invalid')
  });

  const sendEmail = async (values: any, actions: any) => {
    await Auth.forgotPassword(values.email)
      .then((data) => {
        sessionStorage.setItem('email', values.email);
        setIsEmailSubmitted(true);
        actions.setSubmitting(false);
      })
      .catch((err: any) => {
        boundSnackbarActions.error(err.message);
        actions.setSubmitting(false);
      });
  };
  const onSubmit = (values: any, actions: any) => {
    sendEmail(values, actions);
  };

  return (
    <Box width="100%" height="100%" sx={{}} display="flex" justifyContent="center" alignItems="center">
      <Box position="relative" sx={{ 'background': '#fff' }}>
        <Box position="absolute" top={'-100px'} right="-100px">
          <Vector1 />
        </Box>
        <Box position="absolute" bottom={'-100px'} left="-100px">
          <Vector2 />
        </Box>
        <Box p={3} sx={{ 'width': '580px', 'padding': '40px 24px', 'background': '#fff', 'borderRadius': '5px', 'position': 'relative' }}>
          <SkribeLogo />
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'mt': '20px' }}>Forgot password</Typography>
          <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '27px', 'mb': '24px' }}>Please enter your email address. You will receive a code in your email.</Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form>
                  <TextField
                    label="Email"
                    size="medium"
                    name="email"
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%',
                      'mt': '12px'
                    }}
                    autoComplete="off"
                    type="text"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Box display="flex" sx={{ 'mt': 4, 'flex': 1 }}>
                    <Button type="submit" variant="contained" size="medium" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'flex': 1, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                      Submit
                    </Button>
                  </Box>
                </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordStep1;
