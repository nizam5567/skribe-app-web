import { Box } from '@mui/system';
import ReactPlayer from 'react-player';
import Modal from '../../Modal';

interface IPreviewClip {
  clipUrl: string
  toggleModal: any
  title: string
  subTitle: string
}

const PreviewClip = ({ clipUrl, toggleModal, title, subTitle }: IPreviewClip) => (
    <Modal openModal={true} handleModalOpen={toggleModal} handleModalClose={toggleModal} modalTitle={'Preview Clip'} modalSubTitle={title}>
      <Box p={3} sx={{ 'width': '100%' }}>
        <ReactPlayer height="100%" url={clipUrl} controls={true} width={'100%'} style={{ 'backgroundColor': '#000' }} />
      </Box>
    </Modal>
);

export default PreviewClip;
