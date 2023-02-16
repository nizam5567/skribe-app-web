import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import ReactPlayerComponent from '../preview-exhibits/ReactPlayerComponent';

const PostRecordSection = () => {
  const [isRecordDataFound, setIsRecordDataFound] = useState<boolean>(true);
  return (
    <Fragment>
      <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
        <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' } }}>
          <Box>
            <Typography sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>The Record</Typography>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '21px', 'color': '#3F434A' }} mt={1.5}>
              Everything produced from your event
            </Typography>
          </Box>
        </Box>
        {isRecordDataFound
          ? (
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ 'width': '100%' }} height={'300px'} mt={2}>
            <Box flex={1} sx={{ 'width': '50%' }}></Box>
            <Box flex={1} sx={{ 'width': '50%' }} height={'300px'}>
              <ReactPlayerComponent />
            </Box>
          </Box>
            )
          : (
          <Box p={2} pt={4} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'borderTop': '1px solid #fff' }}>
            <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Box>
            )}
      </Box>
    </Fragment>
  );
};

export default PostRecordSection;
