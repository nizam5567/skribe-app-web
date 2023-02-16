import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getUserService } from '../../../helpers/api-helper';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { boundTeamMemberActions } from '../../../redux/reducers/teamReducer/teamAction';
import { handleApiError } from '../../../util/error-handlers';
import { capitalizeFirstLetter } from '../common';
import EditIcon from '../svg-components/EditIcon';

interface IUserListItemProps {
  user: any
}
const UserListItem = ({ user }: IUserListItemProps) => {
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);

  const alert = boundSnackbarActions;

  const handleUserUpdate = (user: any) => {
    boundTeamMemberActions.storeTeamMember(user);
    dispatch(openModal('update_team_member'));
  };

  const handleUserDisable = async (userId: number, status: boolean) => {
    setLoading(true);

    const disableUser: any = {
      'userid': userId,
      'disableStatus': status
    };
    if (accessToken) {
      try {
        const service = await getUserService(accessToken);
        const userResult: any = await service.disableUser(disableUser);
        if (userResult.status === 201) {
          boundTeamMemberActions.doEnableDisableTeamMember(userId, status);
        } else {
          alert.console.error('Something error occurred!');
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
    setLoading(false);
  };

  return (
    <Box display="flex" alignItems="center" sx={{ 'borderBottom': '1px solid #E6E8F4' }}>
      <Box pl={2} my={2} display="flex" justifyContent="flex-start" alignItems="center" sx={{ 'width': '50%' }}>
        <Box ml={1} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
          <Box display="flex" justifyContent={'flex-start'} alignItems="center">
            <Typography mr={0.5} sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': '300' }}>
              {user?.firstname ? user?.firstname : ''} {user?.lastname ? user?.lastname : ''}
            </Typography>
          </Box>
          <Typography sx={{ 'fontSize': '12px', 'lineHeight': '18px', 'fontWeight': '100', 'color': 'gray' }}>{user?.email ? user?.email : 'No Email'}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '25%' }}>
        <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': '300', 'color': 'gray' }}>{user?.role ? capitalizeFirstLetter(user.role) : 'User'}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '25%' }} onClick={async () => await handleUserDisable(user.id, !user.disablestatus)}>
        {user?.role !== 'admin'
          ? (
              loading
                ? (
            <CircularProgress size="1rem" />
                  )
                : (
            <Typography
              sx={{
                'fontSize': '14px',
                'lineHeight': '18px',
                'fontWeight': '300',
                'cursor': 'pointer',
                'border': '1px solid #7C8286',
                'borderRadius': 1,
                'padding': '5px 10px',
                'color': user.disablestatus ? '#00B831' : '#FF1414'
              }}
            >
              {user.disablestatus ? 'Enable' : 'Disable'}
            </Typography>
                  )
            )
          : null}
      </Box>
      <Box pr={2} display="flex" justifyContent="flex-end" alignItems="center" sx={{ 'width': '25%' }}>
        <Box
          p={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'background': '#e6e6e6',
              'cursor': 'pointer'
            }
          }}
          onClick={() => {
            handleUserUpdate(user);
          }}
        >
          <EditIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default UserListItem;
