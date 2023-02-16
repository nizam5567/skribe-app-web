import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  'position': 'absolute' as 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)',
  'width': 500,
  'bgcolor': 'background.paper',
  'boxShadow': 24,
  'borderRadius': '10px',
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'center',
  'alignItems': 'center',
  'textAlign': 'center',
  'p': 4,
  'color': '#02178c'
};

interface TempModalProps {
  openModal: any
  modalTitle: any
  modalDescription: any
  handleModalOpen: () => void
  handleModalClose: () => void
}

const TempModal = ({ openModal, modalTitle, modalDescription, handleModalOpen, handleModalClose }: TempModalProps) => (
    <div>
      <Modal open={openModal} onClose={() => handleModalClose()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ 'mt': 2, 'color': '#586071' }}>
            {modalDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
);

export default TempModal;
