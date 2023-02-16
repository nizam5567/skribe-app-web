import { Box } from '@mui/material';
import { Fragment } from 'react';
import TopNavigation from '../components/v2/navigation/TopNavigation';
import AddNewUserModal from '../components/v2/team/AddNewUserModal';
import TeamContainer from '../components/v2/team/TeamContainer';

const TeamPage = () => (
    <Fragment>
      <AddNewUserModal />
      <TopNavigation />
      <Box minHeight="100vh" sx={{ 'backgroundColor': '#FAFCFE' }}>
        <TopNavigation />
        <Box minHeight="90vh" sx={{ 'margin': { 'xs': '0 24px 24px', 'md': '0 128px 0' }, 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3} mb={3} pb={15}>
          <TeamContainer />
        </Box>
      </Box>
    </Fragment>
);

export default TeamPage;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
