import type { NextPage } from 'next';
import Head from 'next/head';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Box } from '@mui/material';
import { useState } from 'react';

import ForgotPasswordStep1 from '../components/v2/forgot-password/ForgotPasswodStep1';
import ForgotPasswordStep2 from '../components/v2/forgot-password/ForgotPasswodStep2';

config.autoAddCss = false;

const ForgotPassword: NextPage = () => {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  return (
    <Box width="100%" minHeight="100vh" sx={{ 'background': '#E8EBF2' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
      <Head>
        <title>Fogot password</title>
        <meta name="description" content="Forgot password page" />
        <link rel="icon" href="/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      {!isEmailSubmitted ? <ForgotPasswordStep1 setIsEmailSubmitted={setIsEmailSubmitted} /> : <ForgotPasswordStep2 />}
    </Box>
  );
};

export default ForgotPassword;
