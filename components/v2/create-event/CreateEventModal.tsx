import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import ArchiveCreateEventWithName from './ArchiveCreateEventWithName';
import CreateEventWithName from './CreateEventWithName';

const CreateEventModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const dispatch = useDispatch();
  const [modalTitle, setModalTitle] = useState('Create new event');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'event') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} pt={0} sx={{ 'width': '100%' }}>
        <CreateEventWithName />
        {/* <ArchiveCreateEventWithName /> */}
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
