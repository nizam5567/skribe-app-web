import { Box, Typography } from '@mui/material';

const PartyCardHeader = () => (
    <Box mt={3} display="flex" justifyContent="space-between" alignItems="center" mb={0} py={2} sx={{ 'borderTop': '1px solid #E8E9EB', 'borderBottom': '1px solid #E8E9EB' }}>
      <Typography width="25%" whiteSpace="nowrap" sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px' }} color="#8A9099">
        PARTY NAME
      </Typography>
      <Typography width="25%" whiteSpace="nowrap" sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px' }} variant="subtitle2" color="#8A9099">
        EMAIL
      </Typography>
      <Typography width="50%" whiteSpace="nowrap" sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px' }} variant="subtitle2" color="#8A9099">
        STATUS
      </Typography>
    </Box>
);

export default PartyCardHeader;
