import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal';
import StipulationModalBody from './StipulationModalBody';

const StipulationModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);

  const [modalTitle, setModalTitle] = useState('Stipulation');
  const [modalSubTitle, setModalSubTitle] = useState('');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'stipulation') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle} modalSubTitle={modalSubTitle}>
      <StipulationModalBody />
    </Modal>
  );
};

export default StipulationModal;
