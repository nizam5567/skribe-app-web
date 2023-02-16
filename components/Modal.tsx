import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import CrossIcon from './svg-components/CrossIcon';

const style = {
  'position': 'absolute' as 'absolute',
  'top': '15%',
  'left': '50%',
  'transform': 'translate(-50%, -10%)',
  'width': 600,
  'bgcolor': 'background.paper',
  'boxShadow': 24,
  'borderRadius': '4px',
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'center',
  'alignItems': 'center',
  'textAlign': 'center',
  'color': '#01090F',
  'maxHeight': '80vh'
};

interface ModalComponenetProps {
  openModal: any
  modalTitle: any
  modalSubTitle?: string
  modalDescription?: any
  handleModalOpen: () => void
  handleModalClose: () => void
  children?: React.ReactNode
}

const ModalComponent = ({ openModal, modalTitle, modalSubTitle, modalDescription, handleModalOpen, handleModalClose, children }: ModalComponenetProps) => (
    <div>
      <Modal open={openModal} onClose={() => handleModalClose()} className="modal-container" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ 'cursor': 'pointer', 'position': 'absolute', 'top': '16px', 'right': '16px', 'p': 1 }} onClick={() => handleModalClose()}>
            <CrossIcon />
          </Box>
          <Box p={3} pt={4} sx={{ 'borderBottom': 1, 'borderColor': 'divider', 'width': '100%' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography sx={{ 'fontSize': '18px', 'fontWeight': 100, 'lineHeight': '20px' }} className="modal-header">
              {modalTitle}
            </Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 100, 'lineHeight': '18px', 'marginTop': '12px', 'color': '#1E1E1E', 'textAlign': 'left' }} className="modal-sub-header">
              {modalSubTitle}
            </Typography>
          </Box>
          <Box className="modal-body" sx={{ 'typography': 'body1', 'width': '100%', 'overflow': 'hidden', 'fontSize': '14px', 'fontWeight': 200, 'lineHeight': '14px' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            {modalDescription}
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
);

export default ModalComponent;
