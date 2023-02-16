import { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { PrimaryCheckbox } from '@skribe/theme';
import Modal from './model';

interface RejoinModalProps {
  onRejoin: () => void
  open: boolean
  onClose: () => void
}

export const RejoinModal = ({ onRejoin, open, onClose }: RejoinModalProps) => {
  const handleRejoin = () => {
    onRejoin();
    onClose();
  };

  return (
    <Modal
      openModal={open}
      handleModalOpen={() => {
        null;
      }}
      handleModalClose={handleRejoin}
      modalTitle={'Rejoin'}
    >
      <Box m={3}>
        <Typography variant="body1" sx={{ 'mb': 0.5 }}>
          Do you want to join?
        </Typography>
        <Typography mb={3} variant="subtitle2">
          You are about to rejoin the event.
        </Typography>
        <Box sx={{ 'bgcolor': 'grey.50', 'p': 2, 'pl': 4, 'mb': 3 }}>
          <FormControlLabel
            control={<PrimaryCheckbox />}
            label="Join with mic muted"
            sx={{ 'mb': 0 }}
          />
        </Box>
        <Stack sx={{ 'flexDirection': 'row', 'columnGap': 1.5 }}>
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={handleRejoin}
          >
            Join Now
          </Button>
          <Button
            variant="outlined"
            disableElevation
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
