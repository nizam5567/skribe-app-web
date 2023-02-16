import { Alert, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';

export interface IToast {
  onOpen: boolean
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
}

const Toastr = ({
  onOpen,
  onClose,
  type,
  message
}: {
  onOpen: boolean
  onClose: () => void
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
}) => {
  const [open, setOpen] = React.useState(onOpen);
  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right' }}
      sx={{ 'zIndex': 1000 }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ 'width': '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toastr;
