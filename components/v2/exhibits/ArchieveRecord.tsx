import { Box } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import ExhibitModalBody from './ExhibitModalBody';
import ArchiveModalBody from './ArchiveModalBody';

const ArchieveRecord = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;
  const [modalTitle, setModalTitle] = useState('Upload Event Videos');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'archiveRecord') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box width={'100%'}>
        <ArchiveModalBody />
      </Box>
    </Modal>
  );
};

export default ArchieveRecord;
