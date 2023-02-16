import * as Yup from 'yup';
import * as _ from 'lodash';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Vector1 from './svg-components/Vector1';
import Vector2 from './svg-components/Vector2';
import SkribeLogo from '../svg-components/SkribeLogo';
import { useAuthContext } from '../../contexts/AuthContext';

config.autoAddCss = false;

const ChangePasswordForm = () => {
  const router = useRouter();
  const { signInWithNewPassword } = useAuthContext();
  const [setEmail] = useState<any>('');
  const sessionStorage = _.get(globalThis, 'sessionStorage');
  const email = sessionStorage ? sessionStorage.getItem('email') : '';
  useEffect(() => {
    try {
      setEmail(email);
    } catch {
      // eat error quietly
    }
  }, []);
  const initialValues = {
    email,
    'tempPassword': '',
    'password': '',
    'confirmPassword': ''
  };

  const validationSchema = Yup.object().shape({
    'email': Yup.string().required('Email is required').email('Email is invalid'),
    'tempPassword': Yup.string().required('Temporary password is required'),
    'password': Yup.string()
      .required('Password is required')
      .min(10, 'Password is too short - should be 10 characters minimum.')
      .matches(/[a-z]/, "Requires at least 1 lowercase letter")
      .matches(/[A-Z]/, "Requires at least 1 uppercase letter")
      .matches(/[0-9]/, 'Requires at least 1 number')
      .matches(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/, 'Requires at least 1 special character'),
    'confirmPassword': Yup.string()
      .required('Password is required')
      .min(10, 'Password is too short - should be 10 characters minimum.')
      .matches(/[a-z]/, "Requires at least 1 lowercase letter")
      .matches(/[A-Z]/, "Requires at least 1 uppercase letter")
      .matches(/[0-9]/, 'Requires at least 1 number')
      .matches(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/, 'Requires at least 1 special character')
      .when('password', {
        'is': (val: string | any[]) => (val && val.length > 0),
        'then': Yup.string()
          .oneOf([Yup.ref('password')], 'Password does not match')
          .required('Re-type new password is required')
      })
  });

  const changePassword = async (values: any, actions: any) => {
    try {
      signInWithNewPassword(values);
      actions.setSubmitting(false);
    } catch (error: any) {
      actions.setSubmitting(false);
    }
  };
  const onSubmit = (values: any, actions: any) => {
    void changePassword(values, actions);
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
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'mt': '20px' }}>Change password</Typography>
          <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '27px', 'mb': '24px' }}>You will receive a temporary password in your email.</Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form>
                  <Box
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <TextField
                      label="Email"
                      size="medium"
                      name="email"
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'fontSize': '16px'
                      }}
                      autoComplete="off"
                      type="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>
                  <Box
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <TextField
                      label="Temporary Password"
                      size="medium"
                      name="tempPassword"
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'fontSize': '16px'
                      }}
                      autoComplete="off"
                      type="password"
                      placeholder="Password"
                      value={formik.values.tempPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.tempPassword && Boolean(formik.errors.tempPassword)}
                      helperText={formik.touched.tempPassword && formik.errors.tempPassword}
                    />
                  </Box>
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
                     helperText={(formik.touched.password && formik.errors.password) || 'Must be 10 characters or longer. Requires at least one letter, number, and special character.'}
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
                    <Button type="submit" variant="contained" size="medium"
                            disabled={!formik.isValid || formik.isSubmitting}
                            sx={{ 'flex': 1, 'background': '#02178c' }}
                            startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
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

export default ChangePasswordForm;
