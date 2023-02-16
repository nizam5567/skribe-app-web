import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CrossIcon from './svg-components/CrossIcon';
import { closeModal } from '../../redux/reducers/modalReducer/modalAction';
import { saveUser } from '../../redux/reducers/userReducer/userAction';

const style = {
  'position': 'absolute' as 'absolute',
  'top': '15%',
  'left': '50%',
  'transform': 'translate(-50%, -10%)',
  'width': '100%',
  'maxWidth': '600px',
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

const ModalComponent = ({ openModal, modalTitle, modalSubTitle, modalDescription, handleModalOpen, handleModalClose, children }: ModalComponenetProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.userReducer?.user);
  const handleModalCloseFn = () => {
    if (user?.updateUser) {
      dispatch(saveUser({ 'userId': null, 'firstName': '', 'lastName': '', 'newUser': false, 'updateUser': false }));
    }
    dispatch(closeModal());
    handleModalClose();
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleModalCloseFn}>
        <Box sx={style}>
          <Box sx={{ 'cursor': 'pointer', 'position': 'absolute', 'top': '16px', 'right': '16px' }} onClick={handleModalCloseFn}>
            <CrossIcon />
          </Box>
          <Box p={3} pt={4} sx={{ 'borderBottom': 1, 'borderColor': 'divider', 'width': '100%' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography sx={{ 'fontSize': '18px', 'fontWeight': 500, 'lineHeight': '22px' }}>{modalTitle}</Typography>
            {modalSubTitle && <Typography sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'marginTop': '6px', 'color': '#1E1E1E', 'textAlign': 'left' }}>{modalSubTitle}</Typography>}
          </Box>
          <Box sx={{ 'typography': 'body1', 'width': '100%', 'overflow': 'auto', 'fontSize': '14px', 'fontWeight': 200, 'lineHeight': '14px' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            {modalDescription}
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
