import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useAuthContext } from '../../../../contexts/AuthContext';
import LogoutIcon from '../../svg-components/LogoutIcon';

const UserDropdown = () => {
  const { authUser, signOut } = useAuthContext();
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserPhoto, setCurrentUserPhoto] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    setCurrentUserName(`${authUser['custom:firstname'] as string} ${authUser['custom:lastname'] as string}`);
    setCurrentUserEmail(authUser?.email);
    setCurrentUserPhoto(authUser?.photoURL);
  }, [authUser]);

  const handleSignOut = async () => {
    try {
      signOut();
    } catch (error: any) {}

    return false;
  };

  const handleSecurity = () => {
    router.push('/security');
  };

  const handleLogout = async () => {
    await handleSignOut();
  };

  return (
    <Box p={2} boxShadow={2} borderRadius={1} sx={{ 'background': '#fff', 'minWidth': '200px', 'border': '1px solid #E6E8F4' }}>
      <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px' }}>{currentUserName}</Typography>
      <Typography sx={{ 'fontSize': '12px', 'fontWeight': '300', 'lineHeight': '16px', 'color': '#B5B9BD' }}>{currentUserEmail}</Typography>
      <Box
        display="flex"
        alignItems="center"
        mt={1}
        p={1}
        borderRadius={1}
        sx={{
          '&:hover': {
            'cursor': 'pointer',
            'color': '#02178c',
            'background': '#e9ecfa'
          }
        }}
        onClick={handleSecurity}
      >
        <PasswordOutlinedIcon />
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '16px', 'marginLeft': '8px' }}>Password</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        mt={1}
        p={1}
        borderRadius={1}
        sx={{
          '&:hover': {
            'cursor': 'pointer',
            'color': '#02178c',
            'background': '#e9ecfa'
          }
        }}
        onClick={handleLogout}
      >
        <LogoutIcon />
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '16px', 'marginLeft': '8px' }}>Logout</Typography>
      </Box>
    </Box>
  );
};

export default UserDropdown;
