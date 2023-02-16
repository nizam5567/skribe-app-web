import { useState } from 'react';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import Modal from '../MeetingModal/model';
import { RecordItem } from '../../types/exhibit';

interface AddExhibitToOnRecordModalProps {
  handleRemove: (record: RecordItem) => void
  record: RecordItem
  open: boolean
  handleClose: () => void
}

const AddExhibitToOnRecordModal = ({
  handleRemove,
  record,
  open,
  handleClose
}: AddExhibitToOnRecordModalProps) => {
  const [modalTitle, setModalTitle] = useState('Share to Public');

  const handleRemoveExhibit = () => {
    handleRemove(record);
    handleClose();
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
          Are you sure you want to make exhibit {record?.exhibitName} go on
          record? This action is irreversible.
        </Typography>
        <Stack sx={{ 'flexDirection': 'row', 'columnGap': 1.5 }}>
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={handleRemoveExhibit}
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

export default AddExhibitToOnRecordModal;
