import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import SecondaryButton from '../SecondaryButton';
import PartyCardHeader from '../invite-party/PartyCardHeader';
import PartyList from '../invite-party/PartyList';
import InvitePartyIcon from '../svg-components/InvitePartyIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { getTenantIdFromLocalStorage } from '../common';
import { useAuthContext } from '../../../contexts/AuthContext';
import { handleApiError } from '../../../util/error-handlers';
import { CreateExhibitRequest } from '../../../openapi';
import { IExhibit } from '../../../interface/IExhibit';

const RecordSection = () => {
  const { authUser, accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const eventId: string = router.query.eventId as string;
  const matterId: string = router.query.matterId as string;
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const [percentageList, setPercentageList] = useState<any[]>([]);
  const [currentUserName, setCurrentUserName] = useState('');
  useEffect(() => {
    setCurrentUserName(authUser?.displayName);
  }, [authUser]);

  const { exhibits, tempExhibits, readyToUploadTempExhibit, publicExhibits } = useAppSelector((state: RootState) => state?.exhibitReducer);
  const { schedulingPartyId } = useAppSelector((state: RootState) => state.partiesReducer);
  const [showTableHeader, setShowTableHeader] = useState(false);

  const handleRecordUpload = () => {
    dispatch(openModal('archiveRecord'));
  };

  return (
    <Fragment>
      <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
        <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' }, 'borderBottom': '2px solid #e6e6e6' }}>
          <Box pb={3} sx={{}}>
            <Typography sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>The Record</Typography>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '21px', 'color': '#3F434A' }} mt={1.5}>
              Everything produced from your event
            </Typography>
          </Box>
        </Box>
        <Box sx={{ 'padding': '28px 0 0' }}>
          <Box sx={{ 'borderRadius': '5px', 'background': '#F8F8F8', 'border': '1px solid #E8EBF2', 'padding': '20px', 'flex': 1 }}>
            <Typography sx={{ 'fontSize': '20px', 'fontWeight': 500, 'lineHeight': '30px', 'mb': 1 }}>Upload Event Videos</Typography>
            <Box display="flex" justifyContent="flex-start">
              <Button sx={{ 'padding': '3px 10px', 'border': '1px solid #878787', 'borderRadius': '5px', 'color': '#01090F', 'fontSize': '14px', 'lineHeight': '21px', 'fontWeight': 400 }} onClick={handleRecordUpload}>
                Choose File
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default RecordSection;
