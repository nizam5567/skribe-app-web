import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import SkribeLogo from '../../../svg-components/SkribeLogo';

const Logo = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/home');
  };
  return (
    <Box sx={{ 'cursor': 'pointer' }} onClick={handleLogoClick} mr={4}>
      <SkribeLogo />
    </Box>
  );
};

export default Logo;
