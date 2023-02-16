import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getExhibitService } from '../../../helpers/api-helper';
import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import Modal from '../Modal';

const DeleteExhibitModal = () => {
  const { accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const [modalTitle, setModalTitle] = useState('Delete Exhibit');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const { exhibit } = useAppSelector((state: RootState) => state.exhibitReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modalStatus && modalName === 'deleteExhibit') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [modalStatus]);

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleExhibitDelete = async () => {
    if (exhibit && accessToken) {
      try {
        setIsLoading(true);
        const exhibitService = await getExhibitService(accessToken);
        const response = await exhibitService.deleteExhibit(exhibit.id);
        if (response?.status === 200 || response?.status === 201) {
          boundExhibitsActions.deleteExhibit(exhibit?.id);
          boundMattersActions.decreaseExhibitCount({ 'matterId': Number(matterId), 'eventId': Number(eventId) });
          setIsLoading(false);
          dispatch(closeModal());
        }
      } catch (error: any) {
        handleApiError(error);
        dispatch(closeModal());
      }
    }
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      <Box sx={{ 'width': '100%' }} display="flex" flexDirection={'column'} justifyContent="center" alignItems="flex-start">
        <Typography p={3} textAlign={'left'} sx={{ 'width': '100%' }}>
          Are you sure you want delete <Typography sx={{ 'fontWeight': 500, 'width': '100%', 'display': 'inline' }}>{exhibit?.title}</Typography> exhibit?
        </Typography>
        <Box p={3} sx={{ 'borderTop': '1px solid #e6e6e6', 'width': '100%' }} display="flex" flexDirection={'row'}>
          <Button variant="contained" size="small" type="button" sx={{ 'marginRight': '16px', 'background': 'red', '&:hover': { 'background': 'red' } }} onClick={handleExhibitDelete} startIcon={isLoading && <CircularProgress size="1rem" color="inherit" />} disabled={isLoading}>
            Delete
          </Button>
          <Button variant="outlined" size="small" type="button" color="secondary" sx={{}} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteExhibitModal;
