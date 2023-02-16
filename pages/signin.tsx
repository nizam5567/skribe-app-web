import type { NextPage } from 'next';
import Head from 'next/head';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Box } from '@mui/material';
import Login from '../components/v2/Login';

config.autoAddCss = false;

export enum SigninSteps {
  STEP1,
  STEP2,
}

export interface Tenant {
  id: string
  name: string
  providers: []
}

export interface Tenants {
  tenants: Tenant[]
}

const Signin: NextPage = () => (
    <Box width="100%" minHeight="100vh" sx={{ 'background': '#E8EBF2' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Signin page" />
        <link rel="icon" href="/favicon.ico" />
        {/* <Script src ="https://www.google.com/recaptcha/enterprise.js?render=+process.env.RECAPTCHA_LOGIN_KEY"></Script> */}
        <style>{dom.css()}</style>
      </Head>

      {/* <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaKey}`} /> */}

      <Login />
    </Box>
);

export default Signin;
