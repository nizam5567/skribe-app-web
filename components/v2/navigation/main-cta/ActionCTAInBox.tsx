import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/reducers/modalReducer/modalAction';
import CalendarIcon from '../../svg-components/CalendarIcon';

const ActionCTAInBox = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { eventId } = router.query;

  const handleCreateMatter = () => {
    dispatch(openModal('matter'));
  };

  const handleWaitRoom = () => {};

  return (
    <Fragment>
      {!eventId && (
        <Box boxShadow={2} px={4} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#02178c', 'color': '#fff', 'cursor': 'pointer', 'minHeight': { 'xs': '50px', 'md': '80px' }, 'width': { 'xs': '100%', 'md': 'auto' } }} onClick={handleCreateMatter}>
          <Typography ml={1} sx={{ 'fontSize': '16px', 'lineHeight': '16px', 'fontWeight': '300', 'textAlign': 'center' }}>
            Create New Matter
          </Typography>
        </Box>
      )}

      {eventId && (
        <Box boxShadow={2} px={4} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#F5AD22', 'color': '#000', 'cursor': 'pointer', 'minHeight': { 'xs': '50px', 'md': '80px' }, 'width': { 'xs': '100%', 'md': 'auto' } }} onClick={handleWaitRoom}>
          <CalendarIcon />{' '}
          <Typography ml={1} sx={{ 'fontSize': '16px', 'lineHeight': '16px', 'fontWeight': '300', 'textAlign': 'center' }}>
            Waiting Room
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default ActionCTAInBox;
