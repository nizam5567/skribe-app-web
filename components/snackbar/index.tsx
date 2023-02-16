import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../redux/store/hooks';
// import { SnackBarType } from '../../redux/reducers/snackbarReducer/snackbarReducer';

const Alert = React.forwardRef((props: any, ref: React.ForwardedRef<HTMLElement>) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
Alert.displayName = 'Alert';

const CustomizedSnackbars: React.FC<{}> = () => {
  // const { type, text, option } = useAppSelector((state) => state.snackbarReducer);
  const { type, text } = useAppSelector((state) => state.snackbarReducer);
  const timeout = 6000; // option && 'timeout' in option ? option.timeout : 3000;
  const handleClose = () => {
    boundSnackbarActions.clear();
  };
  if (!type) {
    return <></>;
  }
  return (
    <Stack spacing={2} sx={{ 'width': '100%' }}>
      <Snackbar
        open={!!type}
        autoHideDuration={timeout}
        anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right' }}
        onClose={() => {
          handleClose();
        }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ 'width': '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
