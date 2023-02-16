import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import { NextPage } from 'next';
import { useMeetingRouter } from '../../../src/hooks/useMeetingRouter';

const EventPage: NextPage = () => {
  const { joining } = useMeetingRouter();

  const handleClose = () => {};

  return (
    <>
      {/* <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaKey}`}
      /> */}
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent={'center'}
        alignItems="center"
      >
        <CircularProgress color="primary" />
        <Snackbar open={joining} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ 'width': '100%' }}
          >
            Event is about to begin
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default EventPage;
