import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import SecondaryButton from '../SecondaryButton';
import PartyCardHeader from '../invite-party/PartyCardHeader';
import PartyList from '../invite-party/PartyList';
import InvitePartyIcon from '../svg-components/InvitePartyIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { getTenantIdFromLocalStorage } from '../common';

interface IPartySection {
  partyDataFound: boolean
}
const PostPartySection = ({ partyDataFound }: IPartySection) => {
  const alert = boundSnackbarActions;
  const dispatch = useDispatch();
  const { parties } = useAppSelector((state: RootState) => state.partiesReducer);
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const userTenantId: number | undefined = getTenantIdFromLocalStorage();
  const handleInviteParty = () => {
    dispatch(openModal('party'));
  };

  const showDateTimezoneRequiredMessage = () => {
    alert.error('To invite party, please set up event start date, time and timezone');
  };

  return (
    <Fragment>
      <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
        <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
          <Box>
            <Typography sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>Parties</Typography>
          </Box>
        </Box>
        {partyDataFound
          ? (
          <Box>
            {parties && parties.length >= 2 ? <PartyCardHeader /> : null}
            {parties && parties.length <= 1 ? <Box display="flex" alignItems="center" mt={2}></Box> : <PartyList />}
          </Box>
            )
          : (
          <Box p={2} pt={4} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'borderTop': '1px solid #fff' }}>
            <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Box>
            )}
      </Box>
    </Fragment>
  );
};

export default PostPartySection;
