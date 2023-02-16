import { Box } from '@mui/material';

interface IIconWrapper {
  icon: React.ReactNode
}
const IconWrapper = ({ icon }: IIconWrapper) => (
    <Box display="flex" alignItems="center">
      <Box borderRadius={1} border={1} borderColor="#EFEFEF" width="40px" height="40px" display="flex" justifyContent="center" alignItems="center" mr={1.5}>
        {icon}
      </Box>
    </Box>
);

export default IconWrapper;
