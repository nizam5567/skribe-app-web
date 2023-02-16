import type { NextPage } from 'next';
import Head from 'next/head';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Box } from '@mui/material';
import { useState } from 'react';
import ChangePasswordForm from '../components/v2/ChangePasswordForm';

const ChangePassword: NextPage = () => (
    <Box width="100%" minHeight="100vh" sx={{ 'background': '#E8EBF2' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
      <Head>
        <title>Change password</title>
        <meta name="description" content="Change password page" />
        <link rel="icon" href="/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      <ChangePasswordForm />
    </Box>
);

export default ChangePassword;
