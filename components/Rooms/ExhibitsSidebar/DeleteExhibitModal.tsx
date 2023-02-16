import { useState } from 'react';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import Modal from '../MeetingModal/model';
import { RecordItem } from '../../types/exhibit';

interface DeleteExhibitModalProps {
  handleRemove: (record: RecordItem) => void
  record: RecordItem
  open: boolean
  handleClose: () => void
}

const DeleteExhibitModal = ({
  handleRemove,
  record,
  open,
  handleClose
}: DeleteExhibitModalProps) => {
  const [modalTitle, setModalTitle] = useState('Attention!');

  const handleRemoveExhibit = () => {
    handleRemove(record);
  };

  return (
    <Modal
      openModal={open}
      handleModalOpen={() => {
        null;
      }}
      handleModalClose={() => handleClose()}
      modalTitle={modalTitle}
    >
      <Box m={3}>
        <Typography mb={3} variant="body1">
          Remove exhibit {record?.exhibitName}?
        </Typography>
        <Stack sx={{ 'flexDirection': 'row', 'columnGap': 1.5 }}>
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={() => handleRemoveExhibit()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            disableElevation
            color="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteExhibitModal;
