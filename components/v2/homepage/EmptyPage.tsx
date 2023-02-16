import { Box, Typography } from '@mui/material';
import CreateNewMatterButton from '../CreateNewMatterButton';
import EmptyPageIcon from '../svg-components/EmptyPageIcon';

const EmptyPage = () => (
    <Box mt={'10%'} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={5} sx={{ 'background': '#fff' }}>
        <EmptyPageIcon />
        <Typography my={2} sx={{ 'fontSize': '16px', 'fontWeight': '600', 'lineHeight': '20px', 'marginTop': '16px' }}>
          No Matters Created Yet
        </Typography>
        <Typography my={2} sx={{ 'fontSize': '15px', 'fontWeight': '400', 'lineHeight': '12px', 'marginTop': '8px' }}>
          No matters have been created yet. But you can create one.
        </Typography>
        <CreateNewMatterButton />
      </Box>
    </Box>
);

export default EmptyPage;
