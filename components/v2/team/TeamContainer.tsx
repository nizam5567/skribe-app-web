import { Avatar, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { access } from 'fs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getUserService } from '../../../helpers/api-helper';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundTeamMemberActions } from '../../../redux/reducers/teamReducer/teamAction';
import { saveUser } from '../../../redux/reducers/userReducer/userAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import { capitalizeFirstLetter } from '../common';
import EditIcon from '../svg-components/EditIcon';
import CreateTeamMemberModal from './CreateTeamMemberModal';
import UpdateTeamMemberModal from './UpdateTeamMemberModal';
import UserListItem from './UserListItem';

const TeamContainer: NextPage = () => {
  const { accessToken } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredUsersList, setFilteredUsersList] = useState<any>(undefined);

  const { teamMembers, teamMember } = useAppSelector((state: RootState) => state.teamMembersReducer);

  const getAllUsers = async () => {
    if (accessToken) {
      try {
        const service = await getUserService(accessToken);
        const userResult: any = await service.getUsers();
        const users = userResult.data.tenantusers;
        if (users && users.length) {
          boundTeamMemberActions.storeTeamMembers(users);
          setFilteredUsersList(users);
          setIsLoading(false);
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (teamMembers) {
      setFilteredUsersList(teamMembers);
    }
  }, [teamMembers]);

  const handleTeamMemberSearch = () => {};

  const createTeamMember = () => {
    dispatch(openModal('add_team_member'));
  };
  const handleBack = () => {
    router.push('/home');
  };
  return (
    <Fragment>
      <CreateTeamMemberModal />
      <UpdateTeamMemberModal />
      <Box mt={2} sx={{ 'width': { 'xs': '100%', 'md': '100%' } }} mb={3}>
        <Box>
          <Box display="inline-flex" justifyContent={'center'} alignItems="center" onClick={handleBack} my={1} sx={{ 'cursor': 'pointer', 'border': '1px solid black', 'borderRadius': '5px', 'px': 1, 'py': 0.5 }}>
            <Typography sx={{ 'ml': 0.5, 'fontSize': '16px', 'fontWeight': 300, 'lineHeight': '20px' }}>&#x276E; Back to Matters</Typography>
          </Box>
          <Typography mb={2} sx={{ 'fontSize': '22px', 'lineHeight': '28px', 'fontWeight': '500' }}>
            Team
          </Typography>
          <Box pt={3} pb={4} sx={{ 'background': '#fff', 'border': '2px solid #E6E8F4' }} borderRadius={2}>
            <Box mx={2} mb={2} display="flex" justifyContent="space-between" alignItems="center" sx={{}}>
              {/* <TextField
                size="small"
                name={"search"}
                inputProps={{ style: { fontSize: "14px" } }}
                sx={{
                  border: "1px solid #FFF",
                  borderRadius: 1,
                  width: "50%",
                  height: "40px",
                }}
                type="text"
                autoComplete="off"
                placeholder="Search team members"
                onChange={handleTeamMemberSearch}
              /> */}
              <Typography sx={{ 'ml': 1, 'fontSize': '16px', 'fontWeight': 300, 'lineHeight': '20px' }}>Add members of your firm to grant access to all events.</Typography>
              <Button variant="contained" size="small" sx={{ 'background': '#02178c', 'height': '40px' }} onClick={createTeamMember}>
                Add new
              </Button>
            </Box>
            <Box sx={{ 'borderTop': '1px solid #E6E8F4' }}>
              {isLoading
                ? (
                <Stack display="flex" direction="column" alignItems="center" justifyContent="center" mt={3} style={{ 'minHeight': '5vh' }}>
                  <CircularProgress size="2rem" />
                </Stack>
                  )
                : filteredUsersList.length === 0
                  ? (
                <Box display="flex" alignItems="center" sx={{ 'borderBottom': '1px solid #E6E8F4' }}>
                  <Box my={2} pl={2.5} display="flex" justifyContent="flex-start" alignItems="center" sx={{ 'width': '100%' }}>
                    <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': '300', 'color': 'gray', 'textAlign': 'left' }}>No user found</Typography>
                  </Box>
                </Box>
                    )
                  : (
                <Fragment>
                  {filteredUsersList.map((user: any, index: number) => {
                    if (user?.role === 'admin') {
                      return <UserListItem key={user.id} user={user} />;
                    }
                  })}
                  {filteredUsersList.map((user: any, index: number) => {
                    if (user?.role !== 'admin') {
                      return <UserListItem key={user.id} user={user} />;
                    }
                  })}
                </Fragment>
                    )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default TeamContainer;
