import { Typography, Box } from '@mui/material';

interface IMatterBadge {
  count: number
  title: string
}
const MatterBadge = ({ count, title }: IMatterBadge) => (
    <Box sx={{ 'marginTop': { 'xs': '4px', 'md': '0' } }}>
      <Typography ml={1} sx={{ 'whiteSpace': 'nowrap', 'fontSize': '12px', 'fontWeight': '300', 'lineHeight': '16px', 'color': '#656565', 'background': '#F5F5F5', 'padding': '10px 16px' }} display="flex" justifyContent="center" alignItems="center" boxShadow={1} borderRadius={1}>
        {count} {title}
      </Typography>
    </Box>
);

export default MatterBadge;
