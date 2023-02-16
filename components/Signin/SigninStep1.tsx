import { config } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { AlertColor, Box, Button, CircularProgress, LinearProgress, Snackbar, Stack } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { BaseTextField, LabelWithLink } from '@skribe/theme';
import { useFormik } from 'formik';
import { SigninSteps } from '../../pages/signin';
import { TenantSummary } from '../../openapi-auth/models';
import { setErrorMessage } from '../../lib/setErrorMessage';
import styles from '../../styles/Signin.module.scss';
import { getStorageItem, removeStorageItem } from '../../util/common';
import { RECENT_REGISTERED_USER_EMAIL } from '../../consts/consts';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { getTenantService } from '../../helpers/api-helper';
import { TenantResponse } from '../../openapi/models';

config.autoAddCss = false;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

interface SigninStep1Props {
  setSigninSteps: (step: number) => void
  storeAuthTenantData: (data: any) => void
  handleUserEmail: (email: string) => void
}

const SigninStep1 = ({ setSigninSteps, storeAuthTenantData, handleUserEmail }: SigninStep1Props) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRecentUser, setIsLoadingRecentUser] = useState<boolean>(false);

  const router = useRouter();
  const alert = boundSnackbarActions;

  const validationSchema = yup.object({
    'email': yup.string().required('Email is required').email('Email is invalid')
  });

  const formik = useFormik({
    'initialValues': {
      'email': ''
    },
    validationSchema,
    'onSubmit': async (values: any, { setSubmitting, setErrors }) => {
      // alert(JSON.stringify(values, null, 2));

      try {
        setIsLoading(true);
        const resData: TenantResponse | undefined = await getTenantsByEmail(values.email);
        setIsLoading(false);

        if (resData && resData.tenantkey) {
          sessionStorage.setItem('userTenantId', resData.id.toString());
          handleUserEmail(values.email);
          storeAuthTenantData(resData);
          setSigninSteps(SigninSteps.STEP2);
        } else {
          setIsLoading(false);

          const error = {
            'code': 'auth/user-not-found'
          };

          const { title, description } = setErrorMessage(error);
          const errMsg = `${title}: ${description}`;
          console.log(errMsg);
          // setSnackbarMessage(errMsg);
          // setSnackbarType("error");
          // setOpenSnackbar(true);
          setSubmitting(false);
          setErrors({
            'email': errMsg
          });
        }
      } catch (err: any) {
        console.log('ERROR', err);
        setIsLoading(false);
        let errorMessage = err.message;
        if (err.response && err.response.data && err.response.data.message) errorMessage = err.response.data.message;
        // setSnackbarMessage(errorMessage);
        // setSnackbarType("error");
        // setOpenSnackbar(true);
        setErrMessage(errorMessage);
        setSubmitting(false);
        setErrors({
          'email': errorMessage
        });
      }
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('email', event.target.value);
  };

  const getTenantsByEmail = async (email: string): Promise<TenantResponse | undefined> => {
    try {
      const tenantService = await getTenantService();
      const tenantResponse: TenantResponse = (await tenantService.getTenantByEmail(email)).data;
      return tenantResponse;
    } catch (error: any) {
      throw error;
    }
  };

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const setRecentlyRegisteredUserData = async (userEmail: string) => {
    console.log('inside');
    try {
      setIsLoadingRecentUser(true);
      const resData: TenantResponse | undefined = await getTenantsByEmail(userEmail);
      setIsLoadingRecentUser(false);

      if (resData && resData.tenantkey) {
        sessionStorage.setItem('userTenantId', resData.id.toString());
        handleUserEmail(userEmail);
        storeAuthTenantData(resData);
        setSigninSteps(SigninSteps.STEP2);
        // removeStorageItem(RECENT_REGISTERED_USER_EMAIL);
      } else {
        const error = {
          'code': 'auth/user-not-found'
        };

        const { title, description } = setErrorMessage(error);
        const errMsg = `${title}: ${description}`;
        console.log(errMsg);
        alert.error(errMsg);
      }
    } catch (err: any) {
      console.log('ERROR', err);
      setIsLoadingRecentUser(false);
      let errorMessage = err.message;
      if (err.response && err.response.data && err.response.data.message) errorMessage = err.response.data.message;

      alert.error(errorMessage);
    }
  };

  useEffect(() => {
    const userEmail = getStorageItem(RECENT_REGISTERED_USER_EMAIL);
    if (userEmail) {
      setRecentlyRegisteredUserData(userEmail);
    }
  }, []);
  console.log('signinstemp1');
  return (
    <div>
      {!isLoadingRecentUser ? (
        <div className={styles['signin-form']}>
          <h1 className={`text-center ${styles['signin-form-heading']}`}>Sign In to Skribe</h1>

          <form onSubmit={formik.handleSubmit}>
            <BaseTextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              // onChange={formik.handleChange}
              onChange={handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {isLoading && (
              <Box sx={{ 'textAlign': 'center' }}>
                <LinearProgress />
              </Box>
            )}

            <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ 'mt': 2, 'background': '#02178c' }}>
              Continue
            </Button>
          </form>
          <Box textAlign={'center'} sx={{ 'mt': 1.5, 'display': 'flex', 'justifyContent': 'center' }}>
            <LabelWithLink link="/signup" linkLabel="Sign Up" label="New to Skribe?" />
          </Box>
        </div>
      ) : (
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ 'width': '100%' }}>
          {snackbarMessage}!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SigninStep1;
