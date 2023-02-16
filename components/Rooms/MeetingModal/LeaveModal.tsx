import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { PrimaryCheckbox } from '@skribe/theme';
import Modal from './model';
import { PARTY_TYPE } from '../../../consts';

interface LeaveModalProps {
  onLeave: () => void
  open: boolean
  onClose: () => void
  onEnd?: () => void
  isEndingEvent: boolean
  currentParty: any
}

export const LeaveModal = ({
  onLeave,
  open,
  onClose,
  onEnd,
  isEndingEvent,
  currentParty
}: LeaveModalProps) => {
  const handleLeave = () => {
    onLeave();
    onClose();
  };

  return (
    <Modal
      openModal={open}
      handleModalOpen={() => {
        null;
      }}
      handleModalClose={() => onClose()}
      modalTitle={'Leave'}
    >
      <Box m={3}>
        <Typography variant="h3" sx={{ 'mb': 0.5 }}>
          Want to end this event?
        </Typography>
        <Typography mb={3} variant="body2">
          You are about to leave the current event.
        </Typography>
        {/* <Box sx={{ bgcolor: "grey.50", p: 2, pl: 4, mb: 3 }}>
          <FormControlLabel
            control={<PrimaryCheckbox />}
            label="Send me a link to purchase event materials"
            sx={{ mb: 0 }}
          />
        </Box> */}
        <Stack sx={{ 'flexDirection': 'row', 'columnGap': 1.5 }}>
          {/* <Button
            variant="outlined"
            disableElevation
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button> */}

          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={handleLeave}
            sx={{ 'bgcolor': '#3D3D3D' }}
          >
            Leave Event
          </Button>
          {currentParty === PARTY_TYPE.SCHEDULING && <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={onEnd}
            disabled={isEndingEvent}
            startIcon={isEndingEvent && <CircularProgress size="1rem" color="inherit" />}
          >
            End
          </Button>}
        </Stack>
      </Box>
    </Modal>
  );
};
