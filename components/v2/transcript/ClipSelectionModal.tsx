import Modal from '../../Modal';
import FormContainer from './FormContainer';

interface IClipSelectionModal {
  toggleModal: any
  handleVideoPosition: any
  tmpStartTime: any
  tmpEndTime: any
}

const ClipSelectionModal = ({ toggleModal, tmpStartTime, tmpEndTime, handleVideoPosition }: IClipSelectionModal) => (
        <Modal openModal={true} handleModalOpen={toggleModal} handleModalClose={toggleModal} modalTitle={'Create a video clip'}>
            <FormContainer
                startTimeValue={tmpStartTime}
                endTimeValue={tmpEndTime}
                toggleModal={toggleModal}
                handleVideoPosition={handleVideoPosition}
            />
        </Modal>
);
export default ClipSelectionModal;
