import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import Modal from '../Modal';
import AudioPlayer from '../preview-exhibits/AudioPlayer';
import DocViewerComponent from '../preview-exhibits/DocViewerComponent';
import ReactPlayerComponent from '../preview-exhibits/ReactPlayerComponent';

const PreviewExhibitModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const { exhibit }: any = useAppSelector((state: RootState) => state?.exhibitReducer);
  const [modalTitle, setModalTitle] = useState('Preview Exhibit');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);

  useEffect(() => {
    if (modalStatus && modalName === 'previewExhibit') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const maxFileSize = 20000000;
  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box p={3} pt={0} sx={{ 'width': '100%' }}>
        {exhibit?.mimetype === 'application/pdf' || exhibit?.mimetype === 'application/msword' || exhibit?.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ? (
              exhibit?.filesize > maxFileSize
                ? (
            <Box>
              <Box p={5} display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '100%' }}>
                <Typography sx={{ 'fontSize': '16px', 'lineHeight': '20px', 'fontWeight': 400, 'width': '50%' }}>This file is too large to preview. Please download it instead!</Typography>
              </Box>
            </Box>
                  )
                : (
            <Box height={'300px'} my={2}>
              <DocViewerComponent document={exhibit} url={exhibit?.previewlink} />
            </Box>
                  )
            )
          : exhibit?.mimetype === 'video/mp4'
            ? (
          <Box height={'300px'} my={2}>
            <ReactPlayerComponent exhibit={exhibit} />
          </Box>
              )
            : exhibit?.mimetype === 'audio/mpeg' || (exhibit?.previewlink && exhibit?.previewlink.includes('.mp3'))
              ? (
          <Box px={3} py={3}>
            <AudioPlayer exhibit={exhibit} />
          </Box>
                )
          : exhibit?.mimetype === "image/jpeg" || exhibit?.mimetype === "image/png"
            ? (
          <Box height={'300px'} my={2}>
            <img src={exhibit?.previewlink} alt={exhibit?.title} height="100%"/> 
          </Box>
              )
              : (
          <Box height={'100%'} p={5}>
            <Typography sx={{ 'fontSize': '16px', 'lineHeight': '20px', 'fontWeight': 400 }}>Please download the file to preview the exhibit.</Typography>
          </Box>
                )}
        <Box display="flex" justifyContent="space-between" sx={{ 'borderTop': '1px solid #e6e6e6', 'background': '#fff', 'pt': 2 }}>
          <Box component={'a'} sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '11px 21px', 'background': '#02178c', 'color': '#fff', 'borderRadius': 1, 'cursor': 'pointer' }} href={exhibit?.previewlink} download={'exhibit'}>
            Download
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewExhibitModal;
