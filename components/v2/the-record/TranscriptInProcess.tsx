import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import TranscriptInProcessImage from '../../svg-components/TranscriptInProcessImage';

const TranscriptInProcess = () => (
    <Box borderRadius={2} boxShadow={1} p={3} mb={4} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff', 'display': 'flex', 'justifyContent': 'center' }}>
      <Box>
        <TranscriptInProcessImage />
      </Box>
      <Box sx={{ 'display': 'flex', 'textAlign': 'center', 'alignItems': 'center' }} pl={20}>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" sx={{}}>
          <Typography
            display={'inline-flex'}
            sx={{
              'fontSize': '30px',
              'fontWeight': '600',
              'lineHeight': '32px',
              'paddingBottom': '10px',
              'color': '#000000',
              'textAlign': 'left'
            }}
            mb={1}
          >
            AI is processing the record
          </Typography>
          <Typography
            display={'inline-flex'}
            sx={{
              'fontSize': '16px',
              'fontWeight': '400',
              'lineHeight': '26px',
              'paddingBottom': '10px',
              'color': '#000000',
              'maxWidth': '500px',
              'textAlign': 'left'
            }}
          >
            This usually takes 3 hours depending on the length of your testimony. You can keep this screen open, or leave and we’ll email you when it’s ready!
          </Typography>
        </Box>
      </Box>
    </Box>
);
export default TranscriptInProcess;
