import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import SearchContainer from './search/SearchContainer';
import Logo from './logo/Logo';
import User from './user/User';

const TopNavigation = () => {
  const router = useRouter();
  const { pathname } = router;
  const handleTeam = () => {
    router.push('/team');
  };
  const handleMatter = () => {
    router.push('/home');
  };
  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        right={0}
        boxShadow={2}
        sx={{ 'backgroundColor': '#fff', 'minHeight': '80px' }}
        flexDirection={{ 'xs': 'column', 'md': 'row' }}
        zIndex={10}
      >
        <Box px={4} py={2} flex={1} display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ 'xs': 'column', 'md': 'row' }} sx={{ 'width': '100%' }}>
          <Box display="flex" flex={1} justifyContent="flex-start" alignItems="center" sx={{ 'width': '100%' }}>
            <Logo />
          </Box>
          <Box display="flex" justifyContent={{ 'xs': 'space-between', 'md': 'space-between' }} alignItems="center" mt={{ 'xs': 2, 'md': 0 }} sx={{ 'width': { 'xs': '100%', 'md': 'auto' } }}>
            <Box pr="20px" sx={{ 'cursor': 'pointer' }}><Typography sx={{ 'fontSize': '18px', 'lineHeight': '21px' }} onClick={handleMatter}>Matters</Typography></Box>
            <Box pr="20px" sx={{ 'cursor': 'pointer' }}><Typography sx={{ 'fontSize': '18px', 'lineHeight': '21px' }} onClick={handleTeam}>Team</Typography></Box>
            <User />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default TopNavigation;
