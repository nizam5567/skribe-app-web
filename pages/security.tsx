import { Box } from '@mui/material';
import Head from 'next/head';
import { Fragment } from 'react';
import TopNavigation from '../components/v2/navigation/TopNavigation';
import SecurityPageContainer from '../components/v2/security/SecurityPageContainer';

const SecurityPage = () => (
    <Fragment>
      <Head>
        <title>Security</title>
        <meta name="description" content="Security" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation />
      <Box minHeight="100vh" sx={{ 'backgroundColor': '#FAFCFE' }}>
        <TopNavigation />
        <SecurityPageContainer />
      </Box>
    </Fragment>
);

export default SecurityPage;

export async function getStaticProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
