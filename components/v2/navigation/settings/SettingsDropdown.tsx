import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import BillingIcon from '../../svg-components/BillingIcon';
import CustomerSupportIcon from '../../svg-components/CustomerSupportIcon';
import HomeIcon from '../../svg-components/HomeIcon';
import InvitePeopleIcon from '../../svg-components/InvitePeopleIcon';
import SecurityIcon from '../../svg-components/SecurityIcon';
import TeamIcon from '../../svg-components/TeamIcon';
import UpgradeMemebershipIcon from '../../svg-components/UpgradeMembershipIcon';

const SettingsDropdown = () => {
  const router = useRouter();

  const handleTeam = () => {
    router.push('/team');
  };

  const handleSecurity = () => {
    router.push('/security');
  };

  return (
    <Box bgcolor={'#fff'} color={'#000'} py={2} px={4} boxShadow={2} display="flex" justifyContent="space-between" flexDirection={{ 'xs': 'column', 'sm': 'row' }} alignItems="flex-start" sx={{ 'border': '1px solid #E6E8F4' }}>
      <Box mt={{ 'xs': 2, 'md': 0 }}>
        <Typography ml={5} sx={{ 'fontSize': '12px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#9c9c9c' }}>
          Personal
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <HomeIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>My Account</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
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
          <Box mr={1} mt={0.5}>
            <SecurityIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Security</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <BillingIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Billing</Typography>
        </Box>
      </Box>
      <Box mt={{ 'xs': 2, 'md': 0 }}>
        <Typography ml={5} sx={{ 'fontSize': '12px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#9c9c9c' }}>
          Organization
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <SecurityIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>General</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
          onClick={handleTeam}
        >
          <Box mr={1} mt={0.5}>
            <TeamIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Team</Typography>
        </Box>
      </Box>
      <Box mt={{ 'xs': 2, 'md': 0 }}>
        <Typography ml={5} sx={{ 'fontSize': '12px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#9c9c9c' }}>
          Misc.
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <CustomerSupportIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Customer Support</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <InvitePeopleIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Invite people</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          px={1}
          borderRadius={1}
          sx={{
            '&:hover': {
              'cursor': 'pointer',
              'color': '#02178c',
              'background': '#e9ecfa'
            }
          }}
        >
          <Box mr={1} mt={0.5}>
            <UpgradeMemebershipIcon />
          </Box>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '20px' }}>Upgrade Membership</Typography>
        </Box>
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};

export default SettingsDropdown;
