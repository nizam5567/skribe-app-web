import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import Modal from '../Modal';

const MobileInfoModal = () => {
  const [modalTitle, setModalTitle] = useState('Oops!');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    setTimeout(() => {
      if (isMobile) {
        handleModalOpen();
        const element = document.getElementById('mobileInfoModal');
        if (typeof element !== 'undefined' && element !== null) {
          const parentElm = element.closest('.MuiModal-root')?.querySelector('div[class^=MuiBox-root]');

          if (typeof parentElm !== 'undefined' && parentElm !== null) {
            (parentElm as HTMLElement).style.maxWidth = '90%';
          }
        }
      }
    }, 1000);
  }, []);

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} pt={0} sx={{ 'width': '100%' }} id="mobileInfoModal">
        <Box mt={3} sx={{ 'width': '100%' }}>
          <Typography sx={{ 'fontSize': '18px', 'fontWeight': 300, 'lineHeight': '30px', 'textAlign': 'left', 'mb': 2 }}>
            We are not currently supporting mobile devices. But if you want our full experience, you can use it from the desktop.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default MobileInfoModal;
