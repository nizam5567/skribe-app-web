import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import toUpper from 'lodash/toUpper';
import { useAuthContext } from '../../../../contexts/AuthContext';
import SmallDownArrowIcon from '../../../svg-components/SmallDownArrowIcon';
import OutsideAlerter from '../../OutsideAlerter';
import UserDropdown from './UserDropdown';

const User = () => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const { authUser } = useAuthContext();

  const handleAvatarClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowLogoutDropdown(false);
    }
  };

  const handleAvatar = () => {
    setShowLogoutDropdown(true);
  };

  return (
    <Box ml={4} position="relative" display="flex" justifyContent="center" alignItems="center">
      <OutsideAlerter handleClose={handleAvatarClick}>
        <Box
          sx={{ 'borderRadius': '50%' }}
          display="flex"
          flexDirection={'row'}
          onClick={handleAvatar}
        >
          <Avatar alt="user" src="#" style={{ 'backgroundColor': '#02178C', 'color': '#fff', 'cursor': 'pointer' }}>
            {authUser ? toUpper(authUser['custom:firstname']).substring(0, 1) : 'U'}
          </Avatar>
          <Typography sx={{
            'fontSize': '15px',
            'fontWeight': '400',
            'lineHeight': '18px',
            'marginTop': '10px',
            'marginLeft': '10px',
            'cursor': 'pointer'
          }}>{authUser ? `${authUser['custom:firstname'] as string} ${authUser['custom:lastname'] as string}` : null}</Typography>
          <Box pt={1} pl={1} sx={{ 'cursor': 'pointer' }}>
            <SmallDownArrowIcon />
          </Box>
          {showLogoutDropdown && (
            <Box position="absolute" top={{ 'xs': '55px', 'md': '60px' }} right={0}>
              <UserDropdown />
            </Box>
          )}
        </Box>
      </OutsideAlerter>
    </Box>
  );
};

export default User;
