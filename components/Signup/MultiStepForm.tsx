import { config } from '@fortawesome/fontawesome-svg-core';
import React, { SyntheticEvent, useState } from 'react';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, TextField, Typography, Autocomplete } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import * as _ from 'lodash';
import { router } from 'next/client';
import countries from '../../data/countries';
import stateList from '../../data/states';
import * as cognito from '../../lib/cognito';
import SkribeLogo from '../svg-components/SkribeLogo';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import Vector1 from '../v2/svg-components/Vector1';
import Vector2 from '../v2/svg-components/Vector2';
import { getTenantService } from '../../helpers/api-helper';

config.autoAddCss = false;

const MultiStepForm = () => {
  console.log('MultiStepForm');
  const router = useRouter();
  const [showStates, setShowStates] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const initialValues = {
    'firstName': '',
    'lastName': '',
    'title': '',
    'employees': '',
    'company': '',
    'country': {
      'label': '',
      'value': '',
      'iso': ''
    },
    'state': {
      'label': '',
      'value': ''
    },
    'phone': '',
    'email': ''
  };

  const validationSchema = Yup.object().shape({
    'email': Yup.string().required('Email is required').email('Email is invalid'),
    'firstName': Yup.string().trim().min(1).required('First name is required'),
    'lastName': Yup.string().trim().min(1).required('Last name is required'),
    'company': Yup.string().trim().min(1).required('Law firm is required'),
    'country': Yup.object()
      .shape({
        'label': Yup.string().min(1).required('Country is required'),
        'value': Yup.string().min(1).required('Country is required'),
        'iso': Yup.string().min(1).required('Country is required')
      })
      .required(),
    'state': Yup.object()
      .nullable()
      .test({
        'name': 'state',
        'message': 'State is Required',
        'test': (value: any, context: any) => {
          const { country } = context.parent;
          if (country && country?.iso === 'us') {
            return true;
          }
          return true;
        }
      })
      .when('country', {
        'is': (value: any) => {
          if (value && value.iso === 'us') {
            return true;
          }
          return false;
        },
        'then': Yup.object()
          .shape({
            'label': Yup.string().min(1).required('State is required'),
            'value': Yup.string().min(1).required('State is required')
          })
          .nullable()
          .required('Required')
      })
  });

  const storeUserInDB = async (values: any, actions: any) => {
    const invitationcode: any = router.query.invitationCode;
    const { firstName, lastName, email, company, country, state } = values;

    const tenantObj: any = {
      'firstname': firstName,
      'lastname': lastName,
      email,
      company,
      'country': country.iso,
      'state': state.value,
      invitationcode
    };
    console.log('getTenantService');
    getTenantService().then((tenantService) => {
      tenantService.createTenant(tenantObj).then((tenantResponse) => {
        sessionStorage.setItem('email', email);
        actions.setSubmitting(false);
        void router.replace('/change-password');
      }, (err) => {
        const sadf = `${JSON.stringify(_.get(err, 'response.data.message')) ?? err.message}`;
        boundSnackbarActions.error(sadf);
        setOpenSnackbar(true);
        actions.setSubmitting(false);
      });
    }, (error) => {
      boundSnackbarActions.error(error.message);
      setOpenSnackbar(true);
      actions.setSubmitting(false);
    });
  };

  const createUser = async (values: any, actions: any): Promise<void> => {
    // await signUp(values, actions);
    await storeUserInDB(values, actions);
  };
  const onSubmit = (values: any, actions: any): void => {
    if (values.country?.iso !== 'us') {
      values.state = '';
    }
    console.log(values);
    actions.setSubmitting(false);
    createUser(values, actions);
  };
  //
  // const gotoSignInPage = () => {
  //   router.push('/signin');
  // };
  //
  // const showHideState = (e: SyntheticEvent, formik: any) => {
  //   const input = e.target as HTMLInputElement;
  //   if (input !== null && (input.innerText === 'United States of America' || input.value === 'United States of America')) {
  //     setShowStates(true);
  //   } else {
  //     formik.setFieldValue('state', {
  //       'label': '',
  //       'value': ''
  //     });
  //     setShowStates(false);
  //   }
  // };

  const gotoSignInPage = () => {
    void router.push('/signin');
  };

  const showStatesIfApplicable = (e: any): void => {
    setShowStates(e?.target && (e.target.innerText === 'United States of America' || e.target.value === 'United States of America'));
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
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 600, 'lineHeight': '34px', 'mt': '20px' }}>Sign Up for a Account</Typography>
          <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '27px', 'mb': '24px' }}>Let’s get you all set up so you can start creating your first onboarding experience</Typography>
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
                  <Box
                    display="flex"
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <TextField
                      label="First Name"
                      size="medium"
                      name="firstName"
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'mr': '12px'
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                      label="Last Name"
                      size="medium"
                      name="lastName"
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%'
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                  </Box>

                  <TextField
                    label="Law Firm"
                    size="medium"
                    name="company"
                    inputProps={{ 'style': { 'fontSize': '16px' } }}
                    sx={{
                      'border': '1px solid #FFF',
                      'borderRadius': 1,
                      'width': '100%',
                      'mt': '12px'
                    }}
                    autoComplete="off"
                    type="text"
                    placeholder="Law Firm"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                  />

                  <Box
                    display="flex"
                    sx={{
                      'mt': '12px'
                    }}
                  >
                    <Autocomplete
                      options={countries}
                      sx={{ 'flex': 1 }}
                      onChangeCapture={(e: any) => {
                        showStatesIfApplicable(e);
                      }}
                      onChange={(e: any, value: any) => {
                        if (!value) {
                          formik.setFieldValue('country', {
                            'label': '',
                            'value': '',
                            'iso': ''
                          });
                        } else {
                          formik.setFieldValue('country', value);
                          formik.setFieldTouched('country', false);
                        }
                        showStatesIfApplicable(e);
                      }}
                      onInputChange={(e: any) => {
                        showStatesIfApplicable(e);
                      }}
                      onSelect={(e: any) => {
                        showStatesIfApplicable(e);
                      }}
                      onClose={(e: any) => {
                        showStatesIfApplicable(e);
                      }}
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          onBlur={formik.handleBlur}
                          error={formik.touched.country && Boolean(formik.errors.country?.value)}
                          value={formik.values.country}
                          helperText={formik.touched.country && formik.errors.country?.value}
                          name="country"
                          {...params}
                          label="Country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            'style': { 'height': 35, 'padding': 0 }
                          }}
                        />
                      )}
                    />
                    {showStates
                      ? (
                      <Autocomplete
                        options={stateList}
                        sx={{ 'flex': 1, 'ml': '12px' }}
                        onChange={(e: any, value: any) => {
                          if (!value) {
                            formik.setFieldValue('state', {
                              'label': '',
                              'value': ''
                            });
                          } else {
                            formik.setFieldValue('state', value);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state?.value)}
                            helperText={formik.touched.state && formik.errors.state?.value}
                            name="state"
                            {...params}
                            label="State"
                            variant="outlined"
                            inputProps={{
                              ...params.inputProps,
                              'style': { 'height': 35, 'padding': 0 }
                            }}
                          />
                        )}
                      />
                        )
                      : null}
                  </Box>
                  <Box display="flex" sx={{ 'mt': 4, 'flex': 1 }}>
                    <Button type="submit" variant="contained" size="medium" disabled={!formik.isValid || formik.isSubmitting} sx={{ 'flex': 1, 'mr': 2, 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                      Submit
                    </Button>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px' }}>Already have and account? </Typography>

                    <Typography
                      component="a"
                      sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '24px', 'color': '#657CFF', 'ml': 1, 'cursor': 'pointer' }}
                      onClick={() => {
                        gotoSignInPage();
                      }}
                    >
                      Sign In
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

export default MultiStepForm;
