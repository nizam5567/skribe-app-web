import { config, dom } from '@fortawesome/fontawesome-svg-core';
import React, { useState, MouseEvent } from 'react';
import {
  AlertColor,
  Backdrop,
  Box,
  Button,
  Fade,
  LinearProgress,
  Modal,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import styles from './ResetPasswordLayout.module.scss';
// import { UserAuthService } from '../../services/userAuth.service';
import { userService } from '../../services';
import { SigninSteps, Tenants } from '../../pages/signin';

config.autoAddCss = false;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const ResetPasswordLayout = () => (
    <div>
      <div className={styles['signin-form']}>
        <h1 className={`text-center ${styles['signin-form-heading']}`}>
          Reset Password
        </h1>
        <form>
          <div className={styles['form-group']}>
            <div className={styles['input-group']}>
              <TextField
                type="password"
                label="Password"
                fullWidth
              />
            </div>
            </div>
            <div className={styles['form-group']}>
            <div className={styles['input-group']}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
              />
            </div>
          </div>

          <div className={`${styles['btn-holder']}`}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ 'height': '50px', 'width': '300px' }}
            >
              Confirm
              <span
                className={styles['long-arrow-right']}
                style={{ 'backgroundImage': 'url(./images/arrow-right.png)' }}
              ></span>
            </Button>
          </div>
        </form>
      </div>
    </div>
);

export default ResetPasswordLayout;
