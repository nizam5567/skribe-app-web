import { Box, Typography } from '@mui/material';

const EventCardHeader = () => (
    <Box sx={{ 'padding': '12px 0px', 'background': '#f5f7ff' }} borderRadius={1} display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ 'xs': 'column', 'md': 'row' }} mb={0} borderBottom={'1px solid #e6e6e6'}>
      <Box display="flex" flexDirection={{ 'xs': 'row', 'md': 'column' }} justifyContent="center" alignItems="center" sx={{ 'width': '15%' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '20px', 'whiteSpace': 'nowrap' }}>
          Date
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '15%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': { 'xs': 'nowrap', 'md': 'normal' } }}>
          Time
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '30%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px' }}>
          Event Name
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          Invited
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          Exhibits
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': '10%', 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          Stipulation
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'width': { 'xs': '100%', 'md': '10%' }, 'padding': '0 10px' }} my={{ 'xs': '4px', 'md': '0' }}>
        <Typography textAlign="center" sx={{ 'fontSize': '14px', 'fontWeight': 300, 'lineHeight': '18px', 'whiteSpace': 'nowrap' }}>
          Action
        </Typography>
      </Box>
    </Box>
);

export default EventCardHeader;
