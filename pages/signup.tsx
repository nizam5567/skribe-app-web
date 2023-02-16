import type { NextPage } from 'next';
import Head from 'next/head';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import Script from 'next/script';
import { Box } from '@mui/material';
import MultiStepForm from '../components/Signup/MultiStepForm';
import { useAuthContext } from '../contexts/AuthContext';

config.autoAddCss = false;

const Signup: NextPage = () => {
  // const { authUser } = useAuthContext();
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_LOGIN_KEY;

  // if (authUser) {
  //   return null;
  // }

  return (
    <Box width="100%" minHeight="100vh" sx={{ 'background': '#E8EBF2' }} display="flex" justifyContent="center" alignItems="center" p={2} py={4}>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup page" />
        <link rel="icon" href="/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>

      <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaKey}`} />
      <MultiStepForm />
    </Box>
  );
};

export default Signup;
