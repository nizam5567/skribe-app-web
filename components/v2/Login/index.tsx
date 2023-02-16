import React, { useContext } from 'react';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import SkribeLogo from '../../svg-components/SkribeLogo';
import { TenantResponse } from '../../../openapi';
import { getTenantService } from '../../../helpers/api-helper';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAuthContext } from '../../../contexts/AuthContext';
import Vector1 from '../svg-components/Vector1';
import Vector2 from '../svg-components/Vector2';

const Login = () => {
  const route = useRouter();
  const cognitoAuth = useAuthContext();

  const getTenantsByEmail = async (email: string): Promise<TenantResponse | undefined> => {
    try {
      const tenantService = await getTenantService();
      const tenantResponse: TenantResponse = (await tenantService.getTenantByEmail(email)).data;
      return tenantResponse;
    } catch (error: any) {
      throw error;
    }
  };

  const getTenantInfo = async (values: any) => {
    const resData: TenantResponse | undefined = await getTenantsByEmail(values.email);
    console.log(resData);
    if (resData?.id) {
      sessionStorage.setItem('userTenantId', resData.id.toString());
    }
  };

  const initialValues = {
    'email': '',
    'password': ''
  };

  const validationSchema = Yup.object({
    'email': Yup.string().required('Email is required'),
    'password': Yup.string().required('Password is required')
  });

  const handleSignIn = async (values: any, actions: any) => {
    try {
      await cognitoAuth.signIn(values);

      getTenantInfo(values);
    } catch (error: any) {
      console.log('error happened: ', error);
      boundSnackbarActions.error(error.message);
      actions.setSubmitting(false);
      console.log('error signing in', error);
    }
  };
  const onSubmit = (values: any, actions: any) => {
    handleSignIn(values, actions);
  };

  const gotoSignUpPage = () => {
    route.push('/signup');
  };

  const handleForgotPassword = () => {
    route.push('/forgot-password');
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
        <Box p={3} sx={{ 'width': '580px', 'padding': '40px 24px', 'background': '#fff', 'borderRadius': '5px', 'zIndex': 1, 'position': 'relative' }}>
          <SkribeLogo />
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'mt': '20px' }}>Sign In to Skribe</Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form style={{ 'marginTop': '20px' }}>
                  <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start', 'width': '100%' }}>
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      label="Password"
                      size="medium"
                      name={'password'}
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'mt': 1.5
                      }}
                      type="password"
                      autoComplete="off"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" sx={{ 'width': '100%' }}>
                      <Typography component="a" sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px', 'color': '#657CFF', 'ml': 1, 'cursor': 'pointer' }} onClick={handleForgotPassword}>
                        Forgot password?
                      </Typography>
                    </Box>
                    <Box mt={2} sx={{ 'width': '100%' }}>
                      <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c', 'width': '100%' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px' }}>New to Skribe </Typography>

                    <Typography
                      component="a"
                      sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px', 'color': '#657CFF', 'ml': 1, 'cursor': 'pointer' }}
                      onClick={() => {
                        gotoSignUpPage();
                      }}
                    >
                      Sign Up
                    </Typography>
                  </Box>
                </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
