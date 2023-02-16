import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import TopNavigation from '../../../../components/v2/navigation/TopNavigation';
import TranscriptContainer from '../../../../components/v2/transcript/TranscriptContainer';

const Transcript = () => (
    <Box sx={{ 'background': '#f8f9f9' }}>
      <Fragment>
        <Box sx={{}} height="100vh">
          <TopNavigation />
          <Box sx={{ 'margin': { 'xs': '0 24px', 'md': '0 128px' }, 'paddingTop': { 'xs': '10vh' } }}>
            <TranscriptContainer />
          </Box>
        </Box>
      </Fragment>
    </Box>
);

export default Transcript;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
