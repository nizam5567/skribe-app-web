import { Box, Typography } from '@mui/material';
import ErrorIllustration from './svg-components/ErrorIllustration';

const ErrorPage = () => (
    <Box mt="10%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={5} sx={{ 'borderRadius': '5px' }}>
        <Typography mb={1} sx={{ 'fontSize': '32px', 'lineHeight': '40px', 'fontWeight': '300' }}>
          Oops
        </Typography>
        <Typography sx={{ 'fontSize': '22px', 'lineHeight': '30px', 'fontWeight': '100' }}>Something Went Wrong</Typography>
      </Box>
      <ErrorIllustration />
    </Box>
);

export default ErrorPage;
