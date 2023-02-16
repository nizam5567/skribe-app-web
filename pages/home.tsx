import { Box } from '@mui/system';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import CreateEventModal from '../components/v2/create-event/CreateEventModal';
import UpdateMatter from '../components/v2/create-matter/UpdateMatter';
import MainContainer from '../components/v2/homepage/MainContainer';
import TopNavigation from '../components/v2/navigation/TopNavigation';

const Home: NextPage = () => (
    <Fragment>
      <CreateEventModal />
      <Box minHeight="100vh" sx={{ 'background': '#f8f9f9' }}>
        <UpdateMatter />
        <TopNavigation />
        <Box sx={{ 'margin': { 'md': '0 24px', 'xl': '0 128px' } }}>
          <MainContainer />
        </Box>
      </Box>
    </Fragment>
);

export default Home;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
