import { config } from '@fortawesome/fontawesome-svg-core';
// import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AlertColor, Backdrop, Box, Button, CircularProgress, Fade, IconButton, InputAdornment, LinearProgress, Link, Modal, Snackbar, TextField, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BaseTextField } from '@skribe/theme';
import ResetPasswordLayout from '../ResetPassword/ResetPasswordLayout';
import { SigninSteps, Tenants } from '../../pages/signin';
import { AuthState, UserAuthService } from '../../services/userAuth.service';
import styles from '../../styles/Signin.module.scss';
import { useAuthContext } from '../../contexts/AuthContext';
import VisibilityIcon from '../svg-components/VisibilityIcon';
import VisibilityOffIcon from '../svg-components/VisibilityOffIcon';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { getStorageItem, removeStorageItem } from '../../util/common';
import { RECENT_REGISTERED_USER_EMAIL } from '../../consts/consts';
import { ResetPasswordRequest, TenantResponse } from '../../openapi';
import { getTenantService } from '../../helpers/api-helper';
import { handleApiError } from '../../util/error-handlers';

config.autoAddCss = false;

const style = {
  'position': 'absolute' as 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)',
  'width': '35%',
  // bgcolor: 'background.paper',
  'bgcolor': '#fff',
  // color: '#FFF',
  // border: '2px solid #000',
  'boxShadow': 24,
  'p': 4
};

const validationSchemaForgetPassword = yup.object({
  'email': yup.string().email().required('Email is required')
});
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

interface SigninStep2Props {
  setSigninSteps: (step: number) => void
  authTenantData: TenantResponse
  userEmail: string
}

const SigninStep2 = ({ setSigninSteps, authTenantData, userEmail }: SigninStep2Props) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openResetPassword, setOpenResetPassword] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { authService } = useAuthContext();
  const alert = boundSnackbarActions;

  const [openModalCommon, setOpenModalCommon] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [recentlyRegisteredUserEmail, setRecentlyRegisteredUserEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    'initialValues': {
      'email': userEmail
    },
    'validationSchema': validationSchemaForgetPassword,
    'onSubmit': async (values: any) => {
      // console.log("values.email", values.email);
      setIsSubmitting(true);

      try {
        const resetPasswordRequest: ResetPasswordRequest = {
          'email': values.email,
          'firbaseTenantId': authTenantData.tenantkey
        };
        const tenantService = await getTenantService();
        await tenantService.resetUserPassword(resetPasswordRequest);
        setIsSubmitting(false);
        handleCloseModal();
        alert.success('Password reset email sent!');
      } catch (err: any) {
        console.log(err);
        setIsSubmitting(false);
        alert.error('Something went wrong. Please try again');
        handleApiError(err);
      }
    }
  });

  useEffect(() => {
    const userEmail = getStorageItem(RECENT_REGISTERED_USER_EMAIL);
    if (userEmail) {
      setRecentlyRegisteredUserEmail(userEmail);
      removeStorageItem(RECENT_REGISTERED_USER_EMAIL);
    }
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    'password': Yup.string().required('Password is required').min(6, 'Password must be at least 16 characters and contain at least 1 of each of the following, an upper case character, a lower case character, a number and a symbol')
  });
  const formOptions = { 'resolver': yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    'formState': { errors }
  } = useForm(formOptions);

  if (typeof window !== 'undefined' && !userEmail) {
    // router.push("/signin");
    setSigninSteps(SigninSteps.STEP1);
    return null;
  }
  // var grecaptcha: any;
  const onSubmit = async (data: any) => {
    // display form data on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    // grecaptcha.enterprise.ready(async () => {
    //   const token = await grecaptcha.enterprise.execute('process.env.RECAPTCHA_LOGIN_KEY', {action: 'LOGIN'});
    //   // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
    //   // reCAPTCHA Enterprise to the end user's browser.
    //   // This token must be validated by creating an assessment.
    //   // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
    //   console.log("TOKEN", token);
    // });
    try {
      // await auth.signIn(data.email, data.password);
      setIsLoading(true);
      // await new UserAuthService().signIn(userEmail, data.password, authTenantData.tenants[0].id);
      await authService?.signIn(userEmail, data.password, authTenantData.tenantkey);

      console.log('login processing');

      // console.log("Successfully logged in.");
      // router.push("/events");
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      // let { title, description } = setErrorMessage(error);
      // const errMsg = title + ": " + description;
      console.log(error);
      setSnackbarMessage(error);
      setSnackbarType('error');
      setOpenSnackbar(true);
    }

    return false;
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

  const backToStep1 = () => {
    // router.push("/signin");
    setSigninSteps(SigninSteps.STEP1);
  };
  // console.log("authTenantData", authTenantData.tenants);
  // const providers: any = authTenantData.tenants[0].providers;
  // const hasEmailProvider = providers.indexOf("email") !== -1;

  // console.log("hasEmailProvider ", hasEmailProvider);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleResetPassword = () => {
    setOpenResetPassword(true);
    setOpenModal(false);
  };

  // const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => {
    setOpenModalCommon(true);
  };
  const handleModalClose = () => {
    handleResetPassword();
    setOpenModalCommon(false);
  };
  const sleep = async (time: number) => await new Promise((acc) => setTimeout(acc, time));

  /// /Password Show Hide//////
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };

  return (
    <div>
      <div className={styles['signin-form']}>
        <h1 className={`text-center ${styles['signin-form-heading']}`}>{recentlyRegisteredUserEmail === '' ? 'Sign In to Skribe' : 'Verify Your Account'}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ 'textAlign': 'center', 'marginBottom': 3 }}>
            <Box sx={{ 'marginBottom': 2 }}>Welcome</Box>
            <Box>{userEmail}</Box>
          </Box>

          <div className={styles['form-group']}>
            <div className={styles['input-group']}>
              <BaseTextField
                type={showPassword ? 'text' : 'password'}
                label={recentlyRegisteredUserEmail === '' ? 'Password' : 'Temporary Password'}
                fullWidth
                // margin="dense"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                // variant="standard"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  'endAdornment': (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .css-93rqj-MuiInputAdornment-root': {
                    'marginTop': '-7px'
                  }
                }}
              />
            </div>
          </div>

          <div className={`${styles['form-group']} ${styles['forgot-pass']}`}>
            <Link href="#" underline="none" variant="body2" onClick={handleOpenModal} className={styles['forgot-pass']}>
              Forgot Password?
            </Link>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              'timeout': 500
            }}
            className={styles['forgot-password-modal']}
          >
            <Fade in={openModal}>
              <Box sx={style}>
                <span className={styles['cross-icon']} onClick={handleCloseModal}>
                  <svg id="Icons_Actions_ic-actions-close-simple" data-name="Icons / Actions / ic-actions-close-simple" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <rect id="Rectangle_138" data-name="Rectangle 138" width="20" height="20" fill="none" />
                    <g id="ic-actions-close-simple" transform="translate(4.7 4.7)">
                      <line id="Line_14" data-name="Line 14" x1="10.6" y1="10.6" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5" />
                      <line id="Line_15" data-name="Line 15" x1="10.6" y2="10.6" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5" />
                    </g>
                  </svg>
                </span>
                <Box sx={{ 'mt': 2 }}>
                  <Typography style={{ 'color': '#02178C' }}>Forgot your password?</Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ 'mt': 4 }}>
                    <div className={styles['form-group']}>
                      <div className={styles['input-group']}>
                        <TextField placeholder="myemail@domain.com" disabled fullWidth name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                        {/* <span style={{'color': '#d32f2f'}}>This email is not associated with any Skribe account.</span> */}
                      </div>
                    </div>
                  </Box>
                  <Box sx={{ 'mt': 3 }}>
                    <Button
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                      variant="contained"
                      // size="small"
                      type="submit"
                      color="primary"
                      sx={{
                        'mr': 2,
                        'background': '#02178c'
                      }}
                    // onClick={handleResetPassword}
                    >
                      Reset Password
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              </Box>
            </Fade>
          </Modal>

          {isLoading && (
            <Box sx={{ 'textAlign': 'center' }}>
              <LinearProgress />
            </Box>
          )}
          <div className={`${styles['btn-holder']}`} style={{ 'textAlign': 'center' }}>
            <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ 'height': '50px', 'background': '#02178c' }}>
              {recentlyRegisteredUserEmail === '' ? 'Sign in' : 'Activate'}
            </Button>

            <a
              onClick={backToStep1}
              style={{
                'margin': '20px 0 0',
                'cursor': 'pointer',
                'display': 'block',
                'fontSize': '0.8125rem'
              }}
            >
              Not <span style={{ 'color': '#3954e3' }}>{userEmail}?</span>
            </a>
          </div>
        </form>

        {/* {providers && providers.length > 1 && <div className={`${styles["or-seperator"]} ${styles["signin-with-email-txt"]}`}></div>}

            <SocialLogin providers={providers} /> */}
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ 'width': '100%' }}>
          {snackbarMessage}!
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalCommon}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          'timeout': 500
        }}
        className={styles['forgot-password-modal']}
      >
        <Fade in={openModalCommon}>
          <Box sx={style}>
            <span className={styles['cross-icon']} onClick={handleModalClose}>
              <svg id="Icons_Actions_ic-actions-close-simple" data-name="Icons / Actions / ic-actions-close-simple" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <rect id="Rectangle_138" data-name="Rectangle 138" width="20" height="20" fill="none" />
                <g id="ic-actions-close-simple" transform="translate(4.7 4.7)">
                  <line id="Line_14" data-name="Line 14" x1="10.6" y1="10.6" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5" />
                  <line id="Line_15" data-name="Line 15" x1="10.6" y2="10.6" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5" />
                </g>
              </svg>
            </span>
            <Box sx={{ 'mt': 2 }}>
              <Typography variant="subtitle1" style={{ 'color': '#02178C' }}>
                Password Reset Link Sent
              </Typography>
            </Box>
            <Box sx={{ 'mt': 4 }}>
              <div className={styles['form-group']}>
                <div className={styles['input-group']}>
                  <Typography variant="subtitle2"> The password reset link has been sent. Please check your inbox to reset password</Typography>
                </div>
              </div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SigninStep2;
