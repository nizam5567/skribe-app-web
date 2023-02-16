import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import SkribeLogo from '../../svg-components/SkribeLogo';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import Vector1 from '../svg-components/Vector1';
import Vector2 from '../svg-components/Vector2';

config.autoAddCss = false;

const ForgotPasswordStep2 = () => {
  const router = useRouter();
  const initialValues = {
    'code': '',
    'password': '',
    'confirmPassword': ''
  };

  const validationSchema = Yup.object().shape({
    'code': Yup.string().required('Code is required'),
    'password': Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/[a-zA-Z]/, 'Require at least 1 letter')
      .matches(/[0-9]/, 'Require at least 1 number'),
    'confirmPassword': Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/[a-zA-Z]/, 'Require at least a letter')
      .matches(/[0-9]/, 'Require at least a number')
      .when('password', {
        'is': (val: string | any[]) => (!!(val && val.length > 0)),
        'then': Yup.string()
          .oneOf([Yup.ref('password')], 'Password does not match')
          .required('Re-type new password is required')
      })
  });

  const resetPassword = async (values: any, actions: any) => {
    const username: any = sessionStorage.getItem('email');
    const { code } = values;
    const new_password: any = values.password;

    await Auth.forgotPasswordSubmit(username, code, new_password)
      .then((data) => {
        sessionStorage.removeItem('email');
        router.replace('/signin');
        actions.setSubmitting(false);
      })
      .catch((err: any) => {
        boundSnackbarActions.error(err.message);
        actions.setSubmitting(false);
      });
  };
  const onSubmit = (values: any, actions: any) => {
    resetPassword(values, actions);
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
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'my': '20px' }}>Forgot password</Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form>
                  <TextField
                    label="Code"
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
                    placeholder="Email"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                  />
                  <Box
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <TextField
                      label="Password"
                      size="medium"
                      name="password"
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'fontSize': '16px'
                      }}
                      autoComplete="off"
                      type="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Box>
                  <Box
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <TextField
                      label="Confirm Password"
                      size="medium"
                      name="confirmPassword"
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'fontSize': '16px'
                      }}
                      autoComplete="off"
                      type="password"
                      placeholder="Confirm Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Box>
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

export default ForgotPasswordStep2;
