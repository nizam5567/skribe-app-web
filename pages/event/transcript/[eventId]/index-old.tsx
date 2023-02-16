import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import TopNavigation from '../../../../components/v2/navigation/TopNavigation';
import TranscriptContainer from '../../../../components/v2/transcript/TranscriptContainer';

const Transcript: NextPage = () => (
    <Box sx={{ 'background': '#f8f9f9' }}>
      <Fragment>
        <Box minHeight="100vh">
          <TopNavigation />
          <Box minHeight="90vh" sx={{ 'margin': { 'xs': '0 24px 24px', 'md': '0 128px 24px' }, 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3} mb={3}>
            <TranscriptContainer />
          </Box>
        </Box>
      </Fragment>
    </Box>
);

export default Transcript;
