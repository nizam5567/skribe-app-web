import { Box } from '@mui/material';
import Head from 'next/head';
import { Fragment } from 'react';
import Logo from '../components/v2/navigation/logo/Logo';
import ResetPasswordPageContainer from '../components/v2/security/ResetPasswordPageContainer';

const ResetPasswordPage = () => (
    <Fragment>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minHeight="100vh" sx={{ 'backgroundColor': '#FAFCFE' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" position="fixed" top={0} left={0} right={0} boxShadow={2} sx={{ 'backgroundColor': '#fff', 'minHeight': '80px' }} flexDirection={{ 'xs': 'column', 'md': 'row' }} zIndex={10}>
          <Box px={4} py={2} flex={1} display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ 'xs': 'column', 'md': 'row' }} sx={{ 'width': '100%' }}>
            <Box display="flex" flex={1} justifyContent="flex-start" alignItems="center" sx={{ 'width': '100%' }}>
              <Logo />
            </Box>
          </Box>
        </Box>
        <ResetPasswordPageContainer />
      </Box>
    </Fragment>
);

export default ResetPasswordPage;
