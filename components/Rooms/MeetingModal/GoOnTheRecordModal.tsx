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
import Modal from '@mui/material/Modal';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CrossIcon from '../../v2/svg-components/CrossIcon';

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

interface GoOnTheRecordModalProps {
  onClickGoOnTheRecord: () => void
  open: boolean
  onClose: () => void
}

export const GoOnTheRecordModal = ({
  onClickGoOnTheRecord,
  open,
  onClose
}: GoOnTheRecordModalProps) => {
  const handleGoOnTheRecord = () => {
    onClickGoOnTheRecord();
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
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
            onClick={() => onClose()}
          >
            <CrossIcon />
          </Box>
          <Box
            p={3}

            sx={{
              'borderBottom': 1,
              'borderColor': 'divider',
              'width': '100%',
              'padding': '2rem 1.5rem 0.625rem',
              'paddingTop': '25px'
            }}
            display="flex"
            justifyContent={'center'}
          >
            <Typography sx={{
              'fontSize': '1.625rem',
              'fontWeight': '600'
            }}>
              Warning!
            </Typography>
          </Box>
          <Box
            sx={{
              'width': '100%',
              'overflow': 'hidden'
            }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            textAlign="left"
          >

            <Box m={3}>
              <Typography mb={3} sx={{
                'fontSize': '1rem',
                'fontWeight': '500',
                'textAlign': 'center',
                'padding': '0 50px'
              }}>
                {'You\'re currently off-the-record. Nothing said or shared will be recorded. Go back on-the-record?'}
              </Typography>

              <Box sx={{ 'flexDirection': 'row', 'columnGap': 1.5, 'textAlign': 'center' }}>
                <Button
                  variant="outlined"
                  disableElevation
                  color="secondary"
                  onClick={handleGoOnTheRecord}
                  startIcon={<Box sx={{
                    'fontSize': '21px',
                    'lineHeight': 0.9,
                    'position': 'relative',
                    'marginTop': '-1px'
                  }}><RadioButtonCheckedOutlinedIcon fontSize="inherit" /></Box>}
                  sx={{ 'color': '#000', 'px': '1rem' }}
                >
                  Go On The Record
                </Button>

              </Box>
            </Box>

          </Box>
        </Box>
      </Modal>
    </div>
    // <Modal
    //   openModal={open}
    //   handleModalOpen={() => {
    //     null;
    //   }}
    //   handleModalClose={() => onClose()}
    //   modalTitle={"Warning!"}
    // >
    //   <Box m={3}>
    //     <Typography mb={3} variant="body2">
    //       {`You're currently off-the-record. Nothing said or shared will be recorded. Go back on-the-record?`}
    //     </Typography>

  //     <Stack sx={{ flexDirection: "row", columnGap: 1.5 }}>
  //       <Button
  //         variant="outlined"
  //         disableElevation
  //         color="info"
  //         onClick={handleLeave}
  //       >
  //         Go On The Record
  //       </Button>

  //     </Stack>
  //   </Box>
  // </Modal>
  );
};
