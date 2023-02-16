import { Box, Typography } from '@mui/material';

const ExhibitCardHeader = () => (
    <Box mt={1} display="flex" justifyContent="space-between" alignItems="center" mb={0} py={2} sx={{ 'borderTop': '1px solid #E8E9EB', 'borderBottom': '1px solid #E8E9EB' }}>
      <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '17px', 'whiteSpace': 'nowrap', 'width': '40%' }} color="#8A9099">
        FILE NAME
      </Typography>      
      <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '17px', 'whiteSpace': 'nowrap', 'width': '20%' }} color="#8A9099">
        FILE TYPE
      </Typography>
      {/* <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "17px", whiteSpace: "nowrap", width: "20%" }} color="#8A9099">
        UPLOADED TIME
      </Typography> */}
      <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '17px', 'whiteSpace': 'nowrap', 'width': '20%' }} variant="subtitle2" color="#8A9099">
        ACTION
      </Typography>
    </Box>
);

export default ExhibitCardHeader;
