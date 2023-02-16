import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DocumentViewer } from 'react-documents';
import ReactPlayer from 'react-player';
import Modal from '../Modal';
import AudioPlayer from '../preview-exhibits/AudioPlayer';
import DocViewerComponent from '../preview-exhibits/DocViewerComponent';
import ReactPlayerComponent from '../preview-exhibits/ReactPlayerComponent';

interface LiveRoomPreviewExhibit {
  previewlink: string
  mimetype: string
  toggleModal: any
}

const LiveRoomPreviewExhibitModal = ({ previewlink, mimetype, toggleModal }: LiveRoomPreviewExhibit) => (
    <Modal openModal={previewlink !== null} handleModalOpen={toggleModal} handleModalClose={toggleModal} modalTitle={'Exhibit'}>
      <Box p={3} pt={0} sx={{ 'width': '100%' }}>
        {mimetype === 'video/mp4' || mimetype === 'application/pdf' || mimetype === 'application/msword' || (previewlink && previewlink.includes('.mp4')) || (previewlink && previewlink.includes('.pdf')) || (previewlink && previewlink.includes('.doc'))
          ? (
          <Box height={'300px'} mx={2} my={2} display="flex" justifyContent={'center'} alignItems="center"
            sx={{
              'width': 'auto',
              'height': mimetype === 'application/msword' || (previewlink && previewlink.includes('.pdf')) || (previewlink && previewlink.includes('.doc')) ? '50vh' : 'auto'
            }}>
            {mimetype === 'video/mp4' || (previewlink && previewlink.includes('.mp4')) ? <ReactPlayer url={previewlink} playing={true} controls={true} width="600px" /> : mimetype === 'application/pdf' || (previewlink && previewlink.includes('.pdf')) ? <DocumentViewer url={previewlink} /> : mimetype === 'application/msword' || (previewlink && previewlink.includes('.doc')) ? <DocViewerComponent document={previewlink} url={previewlink} /> : null}
          </Box>
            )
          : mimetype === 'audio/mpeg' || (previewlink && previewlink.includes('.mp3'))
            ? (
          <Box px={3} py={3}>
            <AudioPlayer exhibit={previewlink} />
          </Box>
              )
            : (
          <Box height={'100%'} px={3} py={3}>
            <Typography>Please download the file to preview the exhibit.</Typography>
          </Box>
              )}
        <Box display="flex" justifyContent="space-between" sx={{ 'borderTop': '1px solid #e6e6e6', 'background': '#fff', 'pt': 2 }}>
          <Box component={'a'} sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '11px 21px', 'background': '#02178c', 'color': '#fff', 'borderRadius': 1, 'cursor': 'pointer' }} href={previewlink} download={'exhibit'}>
            Download
          </Box>
        </Box>
      </Box>
    </Modal>
);

export default LiveRoomPreviewExhibitModal;
