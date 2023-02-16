import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../../redux/reducers/userReducer/userAction';
import Modal from '../Modal';
import AddTeamMemberModalBody from './AddTeamMemberModalBody';

const AddNewUserModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const user = useSelector((state: any) => state?.userReducer?.user);
  const dispatch = useDispatch();
  const [modalTitle, setModalTitle] = useState('Add new user');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (user?.updateUser) {
      setModalTitle('Update User');
    } else {
      setModalTitle('Add new user');
    }
  }, [user]);

  useEffect(() => {
    if (modalStatus && modalName === 'user') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);
  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} pt={0} sx={{ 'width': '100%' }}>
        <AddTeamMemberModalBody />
      </Box>
    </Modal>
  );
};

export default AddNewUserModal;
