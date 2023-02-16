import { Box } from '@mui/material';
import InvitePartyEventList from './InvitePartyEventList';
import MattersContainer from './MattersContainer';

const MainContainer = () => (
    <Box minHeight="90vh" sx={{ 'paddingTop': { 'xs': '200px', 'md': '105px' } }} mx={3} pb={10}>
      <Box display="flex" flexDirection={'column'}>
        <InvitePartyEventList />
        <MattersContainer />
      </Box>
    </Box>
);

export default MainContainer;
