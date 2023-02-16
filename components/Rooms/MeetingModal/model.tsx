import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography, TypographyVariant } from '@mui/material';
import CrossIcon from '../../svg-components/CrossIcon';

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
  modalDescription?: any
  handleModalOpen: () => void
  handleModalClose: () => void
  children?: React.ReactNode
}

const ModalComponent = ({
  openModal,
  modalTitle,
  modalDescription,
  handleModalOpen,
  handleModalClose,
  children
}: ModalComponenetProps) => (
    <div>
      <Modal
        open={openModal}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              'cursor': 'pointer',
              'position': 'absolute',
              'top': '16px',
              'right': '16px'
            }}
            onClick={() => handleModalClose()}
          >
            <CrossIcon />
          </Box>
          <Box
            p={3}
            pt={4}
            sx={{
              'typography': 'subtitle1',
              'borderBottom': 1,
              'borderColor': 'divider',
              'width': '100%',
              'padding': '2rem 1.5rem 0.625rem'
            }}
            display="flex"
          >
            <Typography variant={'h2' as TypographyVariant}>
              {modalTitle}
            </Typography>
          </Box>
          <Box
            sx={{ 'typography': 'body1', 'width': '100%', 'overflow': 'hidden' }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            textAlign="left"
          >
            {modalDescription}
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
);

export default ModalComponent;
