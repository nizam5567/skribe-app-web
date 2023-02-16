import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import DocViewerComponent from '../preview-exhibits/DocViewerComponent';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';

const PreviewStipulation = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const dispatch = useDispatch();
  const { event } = useAppSelector((state: RootState) => state?.eventReducer);

  const [modalTitle, setModalTitle] = useState('Stipulation');
  const [modalSubTitle, setModalSubTitle] = useState('');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'previewStipulation') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const handleCancel = () => {
    dispatch(closeModal());
  };
  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle} modalSubTitle={modalSubTitle}>
      <Box position="relative" sx={{ 'borderBottom': '1px solid #BABABA', 'width': '100%', 'height': '400px' }}>
        <Box sx={{ 'height': '100%' }}>{event?.previewlink && event?.stipulation === 'custom' ? <DocViewerComponent document={event} /> : null}</Box>
      </Box>
      <Box my={3} mx={3} display="flex" alignItems="center">
        <Box component={'a'} sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '11px 21px', 'background': '#02178c', 'color': '#fff', 'borderRadius': 1, 'cursor': 'pointer' }} href={event?.previewlink} download={'stipulation'}>
          {/* <a href={event?.previewlink} download={"stipulation"}> */}
          Download
          {/* </a> */}
        </Box>
        <Button variant="outlined" color="secondary" sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '10px 20px', 'marginLeft': '12px' }} onClick={handleCancel}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PreviewStipulation;
