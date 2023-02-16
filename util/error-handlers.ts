import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';
import { getAuthUserDetails, AuthUserDetails } from './common';

const handleApiError = async (error: Error | AxiosError) => {
  let errorToReport: Error | undefined;
  let errorInfo: any; // Extras | u:ndefined;
  if (axios.isAxiosError(error)) {
    const axiosError = (error);
    // we might be not add disconnected error.
    if (axiosError.message === 'Network Error') {
      return;
    }
    errorToReport = new Error(`${axiosError.response?.status}, ${error.response?.statusText}, ${error.response?.config.url}`);
    errorToReport.name = 'API Error';
  } else if (error instanceof Error) {
    if ('noAuth' in error) {
      window.location.href = `${process.env.PUBLIC_URL}/signin`;
      return;
    }
    errorToReport = error;
  }
  if (errorToReport) {
    // we will report to support team using Sentry or other Sysetm.
    console.log('Api error:', errorToReport);

    Sentry.withScope(async (scope) => {
      try {
        const data: AuthUserDetails = getAuthUserDetails();
        console.log('This console log is for sentry error', data);
        console.log('This console log is for email error', data.email);
        scope.setUser({
          'email': data.email,
          'id': data.userId,
          'username': data.name
        });
      } catch (err) {
        if (errorInfo) {
          errorInfo.authError = `Auth.currentAuthenticatedUser failed ${err}`;
        }
      }
      if (errorInfo) {
        scope.setExtras(errorInfo);
      }
      Sentry.captureException(errorToReport);
    });
  }
};
export {
  handleApiError
};
